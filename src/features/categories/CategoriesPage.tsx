import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { 
  createCategory, 
  updateCategory, 
  deleteCategory 
} from './categoriesSlice';
import { toast } from 'react-toastify';

const CategoriesPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.items);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategory(id));
      toast.info("Category removed");
    }
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1 className="header">🐾 Pet Shop Admin Panel</h1>
        <p>Manage your pets and categories with elegance</p>
      </header>

      {/* Navigation Tabs */}
      <nav className="admin-nav">
        <a href="#" className="nav-tab active" onClick="showPage('pets')">Pets</a>
        <a href="#" className="nav-tab" onclick="showPage('categories')">Categories</a>
        <a href="#" className="nav-tab" onclick="showPage('add-pet')">Add Pet</a>
        <a href="#" className="nav-tab" onclick="showPage('add-category')">Add Category</a>
      </nav>

      <main className="admin-main">
        <div className="list-header">
          <h2>Existing Categories</h2>
          <button className="add-btn" onClick={() => toast.warning("Use Add Category form")}>
             + New Category
          </button>
        </div>

        <div className="categories-grid">
          {categories?.map((cat) => (
            <div key={cat.id} className="category-item-card">
              <div>
                <h3>{cat.title}</h3>
                <p>{cat.description}</p>
              </div>
              <button className="delete-icon-btn" onClick={() => handleDelete(cat.id)}>
                🗑️
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CategoriesPage;