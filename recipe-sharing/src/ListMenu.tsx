import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { Recipe } from "./type";
import { db } from "./firebase";
import "./styles.css";

const ListMenu = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "recipes"));
      const recipeList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecipes(recipeList as Recipe[]);
      console.log("Fetched recipes:", recipeList);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm("ต้องการลบเมนูอาหารนี้ใช่หรือไม่?");
    if (isConfirmed) {
      try {
        const recipeDoc = doc(db, "recipes", id);
        await deleteDoc(recipeDoc); // 🔥 ลบจาก Firestore
        console.log(`Deleted recipe with id: ${id}`);

        // 🔥 อัปเดต state ลบออกจาก UI ทันที
        setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== id));

        alert("ลบเมนูสำเร็จ");
      } catch (error: any) {
        console.error("Error deleting recipe:", error.message);
        alert(`เกิดข้อผิดพลาดในการลบเมนู: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  if (loading) {
    return <div>กำลังโหลดข้อมูล...</div>;
  }

  return (
    <div className="list-menu-container">
      <header className="header">
        <nav>
          <Link to="/" className="nav-btn home-btn">Home</Link>
          <Link to="/add-recipe" className="add-recipe-btn">เพิ่มเมนูอาหาร</Link>
        </nav>
      </header>

      <div className="recipe-list">
        <h1>เมนูอาหารทั้งหมด</h1>
        {recipes.length === 0 ? (
          <p>ไม่มีเมนูอาหารในตอนนี้</p>
        ) : (
          recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-item">
              <h2>{recipe.title}</h2>
              <img src={recipe.imageUrl} alt={recipe.title} className="recipe-image" />
              <p>{recipe.description}</p>
              <div className="recipe-actions">
                <Link to={`/recipe/${recipe.id}`} className="view-btn">ดูรายละเอียด</Link>
                <button onClick={() => handleDelete(recipe.id)} className="delete-btn">ลบเมนู</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ListMenu;
