import renderHTML from "react-render-html";
import Gist from "react-gist";
import { proxy, useSnapshot } from "valtio";
import { Children, FC, Fragment } from "react";
import styles from "./parser.module.css";

const activeParagraph = proxy({ id: -1 });

type IdProps = { id: number };

const InlineReaction: FC<{ active: boolean }> = ({ active }) => {
  return (
    <span className={styles.reaction} data-active={active ? "" : null}>
      <span role="img">💓</span>
      <span role="img">💡</span>
      <span role="img">👎</span>
      <span role="img">💰</span>
    </span>
  );
};

const ReactionArea: FC<IdProps> = (props) => {
  const { id } = useSnapshot(activeParagraph);
  return (
    <div
      className={styles.reactionArea}
      onMouseEnter={() => (activeParagraph.id = props.id)}
    >
      <InlineReaction active={id === props.id} />
    </div>
  );
};

const Paragraph: FC<IdProps> = ({ id, ...rest }) => (
  <div onMouseEnter={() => (activeParagraph.id = id)} {...rest} />
);

export const parseDate = (publishedAt: number) =>
  new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  }).format(new Date(publishedAt * 1000));

export const parseMarkup = (markup: string) => {
  const children = renderHTML(markup);
  return Children.map(children, (child, i) => {
    if (child.props.className === "gist-container") {
      const id = child.props.children[0].props.id.split("-").pop();
      return <Gist id={id} key={id} />;
    } else if (child.props.className === "paragraph") {
      return (
        <Fragment key={i}>
          <Paragraph id={i} {...child.props} />
          <ReactionArea id={i} />
        </Fragment>
      );
    } else {
      return child;
    }
  });
};
