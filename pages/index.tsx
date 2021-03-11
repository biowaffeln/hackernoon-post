import { GetStaticProps } from "next";
import { FC } from "react";
import { readFile } from "fs/promises";
import { Post, PostProfile } from "../types/post";
import styles from "./index.module.css";
import { parseDate, parseMarkup } from "../components/parser";

const Navbar = () => (
  <header className="bg-hn-primary flex justify-between items-center py-2 px-5">
    <h2 className="text-3xl mt-1">HACKERNOON</h2>
    <div className="space-x-4 hidden sm:block">
      <a
        href="#"
        className="font-mono font-bold border-2 border-green-900 py-1.5 px-3
                   hover:bg-green-200"
      >
        Start Writing
      </a>
      <a
        href="#"
        className="font-mono font-bold border-2 border-transparent py-1.5 px-3
                   hover:border-green-900 hover:bg-green-200"
      >
        Log in
      </a>
    </div>
  </header>
);

const Profile: FC<{ data: PostProfile }> = ({ data }) => {
  return (
    <section className={styles.profile}>
      <img
        src={data.avatar}
        alt={`${data.displayName} avatar picture`}
        className="w-12 box-content border-4 border-gray-300"
      />
      <div>
        <h3 className="font-bold font-mono">
          <a href="#" className="text-lg">
            @{data.handle}
          </a>
          <br />
          {data.displayName}
        </h3>
        <div className="mt-5">{data.bio}</div>
      </div>
    </section>
  );
};

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
                       md:text-4xl lg:text-5xl lg:leading-tight"
          >
            {data.title}
          </h1>
          <p>{parseDate(data.publishedAt)}</p>
          <img
            className="mt-6 duration-200 transform hover:scale-105"
            src={data.mainImage}
          />
        </div>
        <Profile data={data.profile} />
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
