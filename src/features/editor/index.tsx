import { FC, memo, useCallback, useContext } from "react";
import ReactEditor from "@monaco-editor/react";
import type { OnMount, EditorProps, OnChange } from "@monaco-editor/react";
import { createATA } from "./utils";
import PlaygroundContext from "@/context/playground";
import { debounce } from "lodash-es";
import { DEBOUNCE_WAIT_TIME } from "@/utils";

const defaultOptions: EditorProps["options"] = {
  fontSize: 14,
  scrollBeyondLastLine: false,
  minimap: {
    enabled: false,
  },
  scrollbar: {
    verticalScrollbarSize: 6,
    horizontalScrollbarSize: 6,
  },
};

const Editor: FC = () => {
  const { activeFile, addFile } = useContext(PlaygroundContext)!;

  const handleMount: OnMount = useCallback((editor, monaco) => {
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      esModuleInterop: true,
    });

    const ata = createATA((code, path) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        code,
        `file://${path}`
      );
    });

    editor.onDidChangeModelContent(() => {
      console.log("onDidChangeModelContent");
      ata(editor.getValue());
    });

    ata(editor.getValue());
  }, []);

  const onChange: OnChange = useCallback(
    (value?: string) => {
      if (!activeFile) {
        return;
      }

      addFile({
        ...activeFile,
        value,
      });
    },
    [activeFile, addFile]
  );

  return (
    <ReactEditor
      language={activeFile?.language}
      path={activeFile?.name}
      value={activeFile?.value}
      onChange={debounce(onChange, DEBOUNCE_WAIT_TIME)}
      onMount={handleMount}
      options={defaultOptions}
    />
  );
};

export default memo(Editor);
