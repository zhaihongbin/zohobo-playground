import { FC, memo, useCallback, useContext } from "react";
import ReactEditor from "@monaco-editor/react";
import type { OnMount, EditorProps } from "@monaco-editor/react";
import { createATA } from "./utils";
import EditorContext from "../../context/editor";

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
  const { value, onChange } = useContext(EditorContext);

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

  return (
    <ReactEditor
      language="typescript"
      path="demo.tsx"
      value={value}
      onChange={onChange}
      onMount={handleMount}
      options={defaultOptions}
    />
  );
};

export default memo(Editor);
