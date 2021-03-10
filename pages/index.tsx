import { GetStaticProps } from "next";
import { FC } from "react";
import { readFile } from "fs/promises";
import { Post } from "../types/post";
import styles from "./index.module.css";
import { parseDate, parseMarkup } from "../components/parser";

const Navbar = () => (
  <header className="bg-hn-primary">
    Hackernoon
    <span>start writing</span>
    <span>log in</span>
  </header>
);

type HomeProps = {
  data: Post;
};

const Home: FC<HomeProps> = ({ data }) => {
  return (
    <>
      <Navbar />
      <article className={styles.articleContainer}>
        <div className={styles.fullBleed}>
          <h1
            className="font-mono font-bold text-3xl text-center my-6
                       md:text-4xl lg:text-5xl"
          >
            {data.title}
          </h1>
          <p>{parseDate(data.publishedAt)}</p>
          <img
            className="hover transform duration-200 hover:scale-105 mt-6"
            src={data.mainImage}
          />
        </div>
        {parseMarkup(data.markup)}
      </article>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const content = await readFile("data.json", "utf-8");

  return {
    props: {
      data: JSON.parse(content),
    },
  };
};
