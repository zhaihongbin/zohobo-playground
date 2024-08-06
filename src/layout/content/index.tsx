import { Allotment } from "allotment";
import { FC, useMemo, useState } from "react";
import Editor from "../../features/editor";
import Preview from "../../features/preview";
import "allotment/dist/style.css";
import styles from "./index.module.scss";
import EditorContext, { defaultCode } from "#src/context/editor.js";

const Main: FC = () => {
  const [editorValue, setEditorValue] = useState<string | undefined>(
    defaultCode
  );
  const ctxValue = useMemo(
    () => ({
      value: editorValue,
      onChange: setEditorValue,
    }),
    [editorValue]
  );
  return (
    <EditorContext.Provider value={ctxValue}>
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
    </EditorContext.Provider>
  );
};

export default Main;
