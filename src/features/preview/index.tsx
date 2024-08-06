import type { FC } from "react";

// 路径后面加个 ?raw 是通过字符串引入（webpack 和 vite 都有这种功能）
import iframeRaw from "./iframe.html?raw";

const iframeUrl = URL.createObjectURL(
  new Blob([iframeRaw], { type: "text/html" })
);

const Preview: FC = () => {
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

export default Preview;
