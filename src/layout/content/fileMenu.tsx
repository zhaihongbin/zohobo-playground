import PlaygroundContext from "@/context/playground";
import { FC, memo, useContext, useMemo } from "react";
import clsx from "clsx";
import styles from "./fileMenu.module.scss";

const FileMenu: FC = () => {
  const { fileMap, setActiveFileName, activeFileName } =
    useContext(PlaygroundContext)!;

  const fileNames = useMemo(() => {
    if (!fileMap) {
      return [];
    }
    return Object.keys(fileMap);
  }, [fileMap]);

  const handleClick = (fileName: string) => {
    setActiveFileName(fileName);
  };

  return (
    <div className={styles.fileNames}>
      {fileNames.map((fileName) => {
        return (
          <div
            key={fileName}
            className={clsx(styles.fileNames__item, {
              [styles["fileNames__item--active"]]: activeFileName === fileName,
            })}
            onClick={handleClick.bind(null, fileName)}
          >
            {fileName}
          </div>
        );
      })}
    </div>
  );
};

export default memo(FileMenu);
