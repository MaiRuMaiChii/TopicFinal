import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div 
      className="home-container" 
      style={{ 
        backgroundImage: 'url(/images/home.jpg)', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        height: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        color: 'white',
      }}
    >
      <header className="header" style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1 }}>
        <nav>
          <Link to="/" className="add-recipe-btn">หน้าแรก</Link>
          <Link to="/" className="add-recipe-btn">เมนูอาหาร</Link>
          <Link to="/add-recipe" className="add-recipe-btn">เพิ่มเมนูอาหาร</Link>
        </nav>
      </header>
      <div className="welcome-container">
        <h1 className="welcome-text">ยินดีต้อนรับสู่โลกแห่งความอร่อยของอาหารไทย</h1>
        
      </div>
    </div>
  );
};

export default Home;
