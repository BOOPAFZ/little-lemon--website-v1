import { useState, useEffect } from "react";
import api from "../api";
import Header from "../components/Header"; 
import Footer from "../components/Footer"; 
import "../styles/MenuPage.css"; 
import { useNavigate } from 'react-router-dom';

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const itemsPerPage = 6;


  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const menuResponse = await api.get("/api/menu/");
        setMenuItems(menuResponse.data);
        setFilteredItems(menuResponse.data); 

        const categoriesResponse = await api.get("/api/categories/");
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchMenuData();
  }, []);


  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    setCurrentPage(1); 

    if (categoryId === "") {
      setFilteredItems(menuItems);
    } else {
      const filtered = menuItems.filter(item => item.category.id.toString() === categoryId);
      setFilteredItems(filtered);
    }
  };

  const paginate = (items, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };


  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);


  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    setFilteredItems(menuItems);
  }, [menuItems]);

  const displayedItems = paginate(filteredItems, currentPage, itemsPerPage);

  return (
    <div>
      <Header />
      <div className="menu-page">
        <h1>Menu Items</h1>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="category-filter"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id.toString()}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Menu Items List */}
        <div className="menu-items-list">
          {displayedItems.map((item) => (
            <div key={item.id} className="menu-item-card">
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <span>${item.price}</span>
              <button className="login-button" aria-label={`Add ${item.name} to cart`} onClick={() => navigate('/cart')}>
              Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="pagination-controls">
          <button
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange("next")}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Menu;
