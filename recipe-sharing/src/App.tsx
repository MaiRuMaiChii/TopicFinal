import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home";
import RecipeDetail from "./RecipeDetail";
import AddRecipe from "./AddRecipe";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
      </Routes>
    </Router>
  );
}

export default App;
