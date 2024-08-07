import { createContext, FC, PropsWithChildren, useMemo, useState } from "react";
import { fileName2Language, ENTRY_FILE_NAME, initFiles } from "../utils";

export type File = { name: string; value?: string; language: string };

export type FileMap = Record<string, File>;

export type PlaygroundContextValue = {
  fileMap: FileMap;
  activeFile?: File;
  setFile: (file: File) => void;
  deleteFile: (fileName: string) => void;
  clearFileMap: () => void;
  activeFileName?: string;
  setActiveFileName: (value?: string) => void;
};

const defaultFileMap = {};

const PlaygroundContext = createContext<PlaygroundContextValue | null>(null);

export default PlaygroundContext;

const defaultFileName = ENTRY_FILE_NAME;
export const PlaygroundProvider: FC<PropsWithChildren> = (props) => {
  const [fileMap, setFileMap] = useState<FileMap>(initFiles);

  const [activeFileName, setActiveFileName] = useState<string | undefined>(
    defaultFileName
  );

  const activeFile = useMemo(
    () => (activeFileName ? fileMap[activeFileName] : undefined),
    [activeFileName, fileMap]
  );

  const playgroundContextValue: PlaygroundContextValue = {
    fileMap: fileMap,
    activeFile,
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
