
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home";
import ListMenu from "./ListMenu";
import AddRecipe from "./AddRecipe";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list-menu" element={<ListMenu />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
      </Routes>
    </Router>
  );
};

export default App;
