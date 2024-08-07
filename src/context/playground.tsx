import { createContext, FC, PropsWithChildren, useState } from "react";
import { fileName2Language } from "../utils";

export type File = { name: string; value: string; language: string };

type PlaygroundContextValue = {
  fileMap?: Record<string, File>;
  setFile?: (file: File) => void;
  deleteFile?: (fileName: string) => void;
  clearFileMap?: () => void;
  activeFileName?: string;
  setActiveFileName?: (value?: string) => void;
};

const defaultPlaygroundContextValue: PlaygroundContextValue = {};
const defaultFileMap = {};

const PlaygroundContext = createContext(defaultPlaygroundContextValue);

export default PlaygroundContext;

export const PlaygroundProvider: FC<PropsWithChildren> = (props) => {
  const [fileMap, setFileMap] =
    useState<PlaygroundContextValue["fileMap"]>(defaultFileMap);
  const [activeFileName, setActiveFileName] = useState<string>();

  const playgroundContextValue: PlaygroundContextValue = {
    fileMap: fileMap,
    setFile: (file: Omit<File, "language">) => {
      setFileMap((pre) => {
        return {
          ...pre,
          [file.name]: {
            ...file,
            language: fileName2Language(file.name),
          },
        };
      });
    },
    deleteFile: (name) => {
      setFileMap((pre) => {
        const obj = { ...pre };
        delete obj[name];
        return obj;
      });
    },
    clearFileMap: () => {
      setFileMap(defaultFileMap);
    },
    activeFileName,
    setActiveFileName,
  };

  return (
    <PlaygroundContext.Provider value={playgroundContextValue}>
      {props.children}
    </PlaygroundContext.Provider>
  );
};
