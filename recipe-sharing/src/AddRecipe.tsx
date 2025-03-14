import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { Recipe } from "./type";
import { v4 as uuidv4 } from "uuid";
import { db } from "./firebase";
import { Ingredient } from "./type";

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([{ name: "", quantity: "" }]);
  const [instructions, setInstructions] = useState<string[]>([""]);
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newRecipe: Recipe = {
      id: uuidv4(),
      title,
      description,
      ingredients: [],  
      instructions: [], 
      imageUrl,
      reviews: [],
      userId: "guest", 
    };

    await addDoc(collection(db, "recipes"), newRecipe);
    alert("เพิ่มเมนูอาหารเรียบร้อย");
  };

  return (
    <div>
      <h1>Add New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipe;
