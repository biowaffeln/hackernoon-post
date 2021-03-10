import { GetStaticProps } from "next";
import { FC } from "react";
import { readFile } from "fs/promises";
import { Post } from "../types/post";

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
    <div>
      <Navbar />
      <div>
        <h1>{data.title}</h1>
        <p>{data.publishedAt}</p>
        <img src={data.mainImage} />
        <div dangerouslySetInnerHTML={{ __html: data.markup }} />
      </div>
    </div>
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
