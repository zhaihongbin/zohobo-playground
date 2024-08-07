# React Playground

## 项目依赖
+ "@ant-design/icons": "^5.4.0"
+ "@babel/standalone": "^7.25.3"
+ "@monaco-editor/react": "^4.6.0"
+ "@typescript/ata": "^0.9.7"
+ "allotment": "^1.20.2"
+ "clsx": "^2.1.1"
+ "lodash-es": "^4.17.21"
+ "react": "^18.3.1"
+ "react-dom": "^18.3.1"

## 实现思路
1. 基于`@monaco-editor/react`实现react编辑器
2. 基于`@typescript/ata`动态解析并下载项目依赖类型库，使用`monaco.languages.typescript.typescriptDefaults.addExtraLib`添加类型库
3. 基于`@babel/standalone`编译react代码，使用`blob:`地址替换js模块地址