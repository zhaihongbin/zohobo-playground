import Header from "./header";
import Content from "./content";
import { PlaygroundProvider } from "@/context/playground";

function App() {
  return (
    <PlaygroundProvider>
      <div className="app">
        <Header />
        <Content />
      </div>
    </PlaygroundProvider>
  );
}

export default App;
