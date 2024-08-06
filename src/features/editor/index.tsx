import { useCallback } from "react";
import { transform } from "@babel/standalone";
import ReactEditor from "@monaco-editor/react";

const code = `import { useEffect, useState } from "react";

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

function Editor() {
  const transformCode = useCallback((value?: string) => {
    if (!value) {
      return;
    }

    const res = transform(value, {
      presets: ["react", "typescript"],
      filename: "demo.tsx",
    });

    console.log(res.code);
  }, []);

  return (
    <ReactEditor
      defaultLanguage="javascript"
      defaultValue={code}
      onChange={transformCode}
    />
  );
}

export default Editor;
