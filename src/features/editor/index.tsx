import { FC, memo, useCallback, useContext } from "react";
import ReactEditor from "@monaco-editor/react";
import type { OnMount, EditorProps, OnChange } from "@monaco-editor/react";
import { createATA } from "./utils";
import PlaygroundContext from "@/context/playground";
import { debounce } from "lodash-es";

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
  const { activeFile, setFile } = useContext(PlaygroundContext)!;

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChange: OnChange = useCallback(
    debounce((value?: string) => {
      if (!activeFile) {
        return;
      }
      setFile({
        ...activeFile,
        value,
      });
    }, 1000),
    []
  );

  return (
    <ReactEditor
      language={activeFile?.language}
      path={activeFile?.name}
      value={activeFile?.value}
      onChange={onChange}
      onMount={handleMount}
      options={defaultOptions}
    />
  );
};

export default memo(Editor);
