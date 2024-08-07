import { createContext, FC, PropsWithChildren, useMemo, useState } from "react";
import { fileName2Language, ENTRY_FILE_NAME, initFiles } from "../utils";

export type File = { name: string; value?: string; language: string };

export type FileMap = Record<string, File>;

export type PlaygroundContextValue = {
  fileMap: FileMap;
  activeFile?: File;
  addFile: (file: File) => void;
  removeFile: (fileName: string) => void;
  resetFileMap: () => void;
  activeFileName?: string;
  setActiveFileName: (value?: string) => void;
};

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
    addFile: (file: Omit<File, "language">) => {
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
    removeFile: (name) => {
      setFileMap((pre) => {
        const obj = { ...pre };
        delete obj[name];
        return obj;
      });
    },
    resetFileMap: () => {
      setFileMap(initFiles);
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
