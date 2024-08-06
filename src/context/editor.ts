import { OnChange } from "@monaco-editor/react";
import { createContext } from "react";

type EditorContextValue = {
  value?: string;
  onChange?: OnChange;
};

export const defaultCode = `
import { useEffect, useState } from "react";
 
function App() {
  const [num, setNum] = useState(() => {
    const num1 = 1 + 2;
    const num2 = 2 + 3;
    return num1 + num2
  });

  return (
    <div onClick={() => setNum((prevNum) => prevNum + 1)}>{num}</div>
  );
}

export default App;
`;

export const defaultEditorContextValue: EditorContextValue = {};

const EditorContext = createContext<EditorContextValue>(
  defaultEditorContextValue
);

export default EditorContext;