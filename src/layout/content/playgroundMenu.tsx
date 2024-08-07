import PlaygroundContext from "@/context/playground";
import { FC, memo, useCallback, useContext, useMemo, useState } from "react";
import clsx from "clsx";
import styles from "./playgroundMenu.module.scss";
import { ReloadOutlined } from "@ant-design/icons";
import { debounce } from "lodash-es";
import { DEBOUNCE_WAIT_TIME } from "@/utils";

const PlaygroundMenu: FC = () => {
  const { fileMap, setActiveFileName, activeFileName, resetFileMap } =
    useContext(PlaygroundContext)!;

  const [spin, toggleSpin] = useState(false);

  const fileNames = useMemo(() => {
    if (!fileMap) {
      return [];
    }
    return Object.keys(fileMap);
  }, [fileMap]);

  const handleClick = useCallback(
    (fileName: string) => {
      setActiveFileName(fileName);
    },
    [setActiveFileName]
  );

  const handleReload = useCallback(() => {
    toggleSpin(true);

    resetFileMap();

    const st = setTimeout(() => {
      toggleSpin(false);
      clearTimeout(st);
    }, DEBOUNCE_WAIT_TIME);
  }, [resetFileMap]);

  return (
    <div className={styles.playgroundMenu}>
      {fileNames.map((fileName) => {
        return (
          <div
            key={fileName}
            className={clsx(styles.playgroundMenu__item, {
              [styles["playgroundMenu__item--active"]]:
                activeFileName === fileName,
            })}
            onClick={handleClick.bind(null, fileName)}
          >
            {fileName}
          </div>
        );
      })}

      <div className={styles.playgroundMenu__operatorBar}>
        <ReloadOutlined
          spin={spin}
          onClick={debounce(handleReload, DEBOUNCE_WAIT_TIME, {
            leading: true,
          })}
        />
      </div>
    </div>
  );
};

export default memo(PlaygroundMenu);
