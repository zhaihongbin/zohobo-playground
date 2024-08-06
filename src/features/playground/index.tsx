import { FC } from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import Editor from "../editor";
import Preview from "../preview";

const Playground: FC = () => {
  return (
    <div style={{ height: "100vh" }}>
      <Allotment defaultSizes={[100, 100]}>
        <Allotment.Pane minSize={500}>
          <Editor />
        </Allotment.Pane>
        <Allotment.Pane minSize={0}>
          <Preview />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
};

export default Playground;
