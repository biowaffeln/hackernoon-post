import { GetStaticProps } from "next";
import { Children, FC } from "react";
import { readFile } from "fs/promises";
import { Post } from "../types/post";
import renderHTML from "react-render-html";
import styles from "./index.module.css";
import Gist from "react-gist";

const Navbar = () => (
  <header className="bg-hn-primary">
    Hackernoon
    <span>start writing</span>
    <span>log in</span>
  </header>
);

const Reaction = () => <div className={styles.reaction}>(reaction)</div>;

type HomeProps = {
  data: Post;
};

const parseDate = (publishedAt: number) =>
  new Date(publishedAt * 1000).toUTCString();

const parse = (markup: string) => {
  const children = renderHTML(markup);
  const result = [];
  Children.forEach(children, (child) => {
    if (child.props.className === "gist-container") {
      const id = child.props.children[0].props.id.split("-").pop();
      const gist = <Gist id={id} key={id} />;
      result.push(gist);
    } else if (child.props.className === "paragraph") {
      const reaction = <Reaction />;
      result.push(child, reaction);
    } else {
      result.push(child);
    }
  });

  return result;
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
        {parse(data.markup)}
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
