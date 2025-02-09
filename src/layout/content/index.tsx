import { Allotment } from "allotment";
import { FC } from "react";
import Editor from "../../features/editor";
import Preview from "../../features/preview";
import "allotment/dist/style.css";
import styles from "./index.module.scss";
import PlaygroundMenu from "./playgroundMenu";

const Main: FC = () => {
  return (
    <>
      <PlaygroundMenu />
      <main className={styles.content}>
        <Allotment defaultSizes={[100, 100]}>
          <Allotment.Pane minSize={500}>
            <Editor />
          </Allotment.Pane>
          <Allotment.Pane minSize={0}>
            <Preview />
          </Allotment.Pane>
        </Allotment>
      </main>
    </>
  );
};

export default Main;
