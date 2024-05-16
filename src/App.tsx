import { useEffect } from "react";
import "./App.scss";
import Catalog from "./views/rick-and-morty-catalog/Catalog.tsx";
import {
  getByCurrentState,
  loadCatalogs,
} from "@/store/RickAndMorty/services/index.tsx";

function App() {
  useEffect(() => {
    getByCurrentState();
    loadCatalogs();
  }, []);
  return (
    <div className="App">
      <Catalog />
    </div>
  );
}

export default App;
