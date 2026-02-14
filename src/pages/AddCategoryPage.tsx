
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/reduxHooks';
import { createCategory } from '../features/categories/categoriesSlice';
import { toast } from 'react-toastify';
import './AddCategoryPage.css'
import { useState } from 'react';

const AddCategoryPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("გთხოვთ შეიყვანოთ სათაური");
      return;
    }

    const newCategory = {
      id: crypto.randomUUID(),
      title,
      description,
    };

    dispatch(createCategory(newCategory));
    toast.success("კატეგორია წარმატებით დაემატა!");
    navigate('/admin/categories'); // წარმატების შემდეგ ვბრუნდებით სიაში
  };

  return (
    <div className="admin-container">
      {/* Header - იგივე რაც სხვა გვერდებზე */}
      <header className="admin-header-card">
        <h1>🐾 Pet Shop Admin Panel</h1>
        <p>Manage your pets and categories with elegance</p>
      </header>

      {/* Navigation - აქ Add Category იქნება active */}
      <nav className="admin-nav-bar">
        <button onClick={() => navigate('/admin/pets')}>Pets</button>
        <button onClick={() => navigate('/admin/categories')}>Categories</button>
        <button onClick={() => navigate('/admin/add-pet')}>Add Pet</button>
        <button className="active">Add Category</button>
      </nav>

      <main className="form-container-centered">
        <button className="back-link" onClick={() => navigate('/admin/categories')}>
          ← Back to Categories
        </button>

        <div className="form-card-white">
          <h2>Add New Category</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <label>Category Title</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title..."
                required
              />
            </div>

            <div className="input-field">
              <label>Description</label>
              <textarea 
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description..."
              />
            </div>

            <div className="form-footer-btns">
              <button type="button" className="btn-cancel" onClick={() => navigate(-1)}>
                Cancel
              </button>
              <button type="submit" className="btn-save">
                Save Category
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddCategoryPage;