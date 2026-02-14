import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { addAnimal } from '../features/animals/animalsSlice';
import { toast } from 'react-toastify';
import './AddPetPage.css';

const AddPetPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.items);
      
  const [form, setForm] = useState({
    name: '',
    categoryId: '',
    priceUSD: '',
    priceGEL: '',
    stock: '',
    description: '',
    isPopular: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPet = {
      id: crypto.randomUUID(),
      name: form.name,
      categoryId: form.categoryId, 
      priceUSD: Number(form.priceUSD),
      priceGEL: Number(form.priceGEL),
      stock: Number(form.stock),
      description: form.description,
      isPopular: form.isPopular,
    };

    dispatch(addAnimal(newPet));
    toast.success("Pet added successfully!");
    navigate('/admin/pets');
  }; // <--- აი აქ უნდა იხურებოდეს handleSubmit

  // ახლა return არის AddPetPage ფუნქციის შიგნით
  return (
    <div className="add-pet-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back to Pets</button>
      
      <div className="form-card">
        <h2>Add New Pet</h2>
        <form onSubmit={handleSubmit}>
          {/* ... ფორმის შიგთავსი (ინპუტები) ... */}
          <div className="input-group">
            <label>Pet Name</label>
            <input type="text" required value={form.name} 
              onChange={e => setForm({...form, name: e.target.value})} />
          </div>

          <div className="input-group">
            <label>Category</label>
            <select required value={form.categoryId} 
              onChange={e => setForm({...form, categoryId: e.target.value})}>
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.title}</option>
              ))}
            </select>
          </div>

          <div className="row">
            <div className="input-group">
              <label>Price (USD)</label>
              <input type="number" required value={form.priceUSD} 
                onChange={e => setForm({...form, priceUSD: e.target.value})} />
            </div>
            <div className="input-group">
              <label>Price (GEL)</label>
              <input type="number" required value={form.priceGEL} 
                onChange={e => setForm({...form, priceGEL: e.target.value})} />
            </div>
          </div>

          <div className="input-group">
            <label>Stock</label>
            <input type="number" required value={form.stock} 
              onChange={e => setForm({...form, stock: e.target.value})} />
          </div>

          <div className="input-group">
            <label>Description</label>
            <textarea rows={4} value={form.description} 
              onChange={e => setForm({...form, description: e.target.value})} />
          </div>

          <label className="checkbox-group">
            <input type="checkbox" checked={form.isPopular} 
              onChange={e => setForm({...form, isPopular: e.target.checked})} />
            Popular Pet
          </label>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={() => navigate(-1)}>Cancel</button>
            <button type="submit" className="save-btn">Save Pet</button>
          </div>
        </form>
      </div>
    </div>
  );
}; // <--- ეს არის AddPetPage-ის დასასრული

export default AddPetPage;