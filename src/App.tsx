import { useCallback } from "react";
import { transform } from "@babel/standalone";
import Editor from "@monaco-editor/react";
import Preview from "./features/preview";

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

function App() {
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
    <div
      style={{
        height: "100%",
      }}
    >
      <Editor
        height="50%"
        defaultLanguage="javascript"
        defaultValue={code}
        onChange={transformCode}
      />
      <Preview />
    </div>
  );
}

export default App;
