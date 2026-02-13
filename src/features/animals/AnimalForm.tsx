import React, { useState} from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { addAnimal } from './animalsSlice';
import { toast } from 'react-toastify';

const AnimalForm: React.FC = () => {
  const dispatch = useAppDispatch();
  
  // ვიღებთ კატეგორიებს სთორიდან (დარწმუნდი რომ categoriesSlice გაქვს)
  const categories = useAppSelector((state) => state.categories.items);

  const [formData, setFormData] = useState({
    name: '',
    priceUSD: '',
    priceGEL: '',
    description: '',
    isPopular: false,
    stock: '',
    categoryId: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.categoryId) {
      toast.error("შეავსეთ აუცილებელი ველები!");
      return;
    }

    const newAnimal = {
      id: crypto.randomUUID(), // ბრაუზერის ჩაშენებული მეთოდი ID-სთვის
      name: formData.name,
      priceUSD: Number(formData.priceUSD),
      priceGEL: Number(formData.priceGEL),
      description: formData.description,
      isPopular: formData.isPopular,
      stock: Number(formData.stock),
    };

    dispatch(addAnimal(newAnimal));
    toast.success("ცხოველი დაემატა!");
    
    // ფორმის გასუფთავება
    setFormData({ name: '', priceUSD: '', priceGEL: '', description: '', isPopular: false, stock: '', categoryId: '' });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
      <input 
        placeholder="სახელი" 
        value={formData.name} 
        onChange={e => setFormData({...formData, name: e.target.value})} 
      />
      <input 
        type="number" 
        placeholder="ფასი GEL" 
        value={formData.priceGEL} 
        onChange={e => setFormData({...formData, priceGEL: e.target.value})} 
      />
      <select 
        value={formData.categoryId} 
        onChange={e => setFormData({...formData, categoryId: e.target.value})}
      >
        <option value="">აირჩიეთ კატეგორია</option>
        {categories?.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.title}</option>
        ))}
      </select>
      <label>
        <input 
          type="checkbox" 
          checked={formData.isPopular} 
          onChange={e => setFormData({...formData, isPopular: e.target.checked})} 
        /> პოპულარული
      </label>
      <button type="submit">დამატება</button>
    </form>
  );
};

export default AnimalForm;