import { FC, memo, useContext, useMemo } from "react";

// 路径后面加个 ?raw 是通过字符串引入（webpack 和 vite 都有这种功能）
import iframeRaw from "./iframe.html?raw";
import PlaygroundContext from "@/context/playground";
import { compile } from "./utils";
import { IMPORT_MAP_FILE_NAME } from "@/utils";

const Preview: FC = () => {
  const { fileMap } = useContext(PlaygroundContext)!;

  const compiledCode = useMemo(() => {
    return compile(fileMap);
  }, [fileMap]);

  const iframeUrl = useMemo(() => {
    const res = iframeRaw
      .replace(
        '<script type="importmap"></script>',
        `<script type="importmap">${fileMap[IMPORT_MAP_FILE_NAME].value}</script>`
      )
      .replace(
        '<script type="module"></script>',
        `<script type="module">${compiledCode}</script>`
      );
    return URL.createObjectURL(new Blob([res], { type: "text/html" }));
  }, [compiledCode, fileMap]);

  return (
    <iframe
      src={iframeUrl}
      style={{
        width: "100%",
        height: "100%",
        padding: 0,
        border: "none",
      }}
    />
  );
};

export default memo(Preview);
