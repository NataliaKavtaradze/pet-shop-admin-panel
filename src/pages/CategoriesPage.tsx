import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { fetchCategories, deleteCategory } from '../features/categories/categoriesSlice';
import { toast } from 'react-toastify';
import { fetchAnimals } from '../features/animals/animalsSlice';
import './CategoriesPage.css';

const CategoriesPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  // ვიღებთ კატეგორიებს და ცხოველებს (რომ დავითვალოთ რამდენი ცხოველია თითო კატეგორიაში)
  const { items: categories } = useAppSelector((state) => state.categories);
  const { items: animals } = useAppSelector((state) => state.animals);

   useEffect(() => {
  dispatch(fetchCategories());
  dispatch(fetchAnimals()); // <--- ესეც საჭიროა, რომ .filter-მა იმუშაოს
}, [dispatch]);

  const handleDelete = (id: string) => {
    if (window.confirm("ნამდვილად გსურთ კატეგორიის წაშლა?")) {
      dispatch(deleteCategory(id));
      toast.error("კატეგორია წაიშალა");
    }
  };

  return (
    <div className="admin-container">
      {/* Header */}
      <header className="admin-header">
        <h1 className="header">🐾 Pet Shop Admin Panel</h1>
        <p>Manage your pets and categories with elegance</p>
      </header>

      {/* Navigation Tabs */}
      <nav className="admin-nav">
        <a href="#" className="nav-tab active" onClick={() => navigate('/admin/pets')}>Pets</a>
        <a href="#" className="nav-tab active">Categories</a>
        <a href="#" className="nav-tab" onClick={() => navigate('/admin/add-pet')}>Add Pet</a>
        <a href="#" className="nav-tab" onClick={() => navigate('/admin/add-category')}>Add Category</a>
      </nav>

      <main className="admin-main">
        <div className="list-header">
          <h2>All Categories</h2>
          <button className="add-new-btn" onClick={() => navigate('/admin/add-category')}>
            + Add New Category
          </button>
        </div>

        <div className="categories-grid">
          {categories?.map((cat) => {
            // ვითვლით რამდენი ცხოველია ამ კატეგორიაში
            const petCount = animals.filter(a => a.categoryId === cat.id).length;

            return (
              <div key={cat.id} className="category-card">
                <h3>{cat.title}</h3>
                <p className="cat-desc">{cat.description}</p>
                <span className="pet-count">{petCount} {petCount === 1 ? 'pet' : 'pets'}</span>
                
                <div className="card-actions">
                  <button className="edit-btn" onClick={() => toast.warning("Edit coming soon")}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(cat.id)}>Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default CategoriesPage;
