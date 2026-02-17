import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { deleteAnimal } from './animalsSlice';
import { toast } from 'react-toastify';

const AnimalsList: React.FC = () => {
  const dispatch = useAppDispatch();
  
  const animals = useAppSelector((state) => state.animals.items);

  const handleDelete = (id: string) => {
    if (window.confirm('დარწმუნებული ხართ, რომ გსურთ წაშლა?')) {
      dispatch(deleteAnimal(id));
      toast.info("ჩანაწერი წაიშალა");
    }
  };

  return (
    <div className="admin-list-container">
      <h3>არსებული ცხოველები</h3>
      <table className="admin-table">
        <thead>
          <tr>
            <th>სახელი</th>
            <th>ფასი (GEL)</th>
            <th>ფასი (USD)</th>
            <th>მარაგი</th>
            <th>სტატუსი</th>
            <th>მოქმედება</th>
          </tr>
        </thead>
        <tbody>
          {animals.length > 0 ? (
            animals.map((animal) => (
              <tr key={animal.id}>
                <td>{animal.name}</td>
                <td>{animal.priceGEL} ₾</td>
                <td>$ {animal.priceUSD}</td>
                <td>{animal.stock}</td>
                <td>
                  {animal.isPopular ? (
                    <span className="badge popular">პოპულარული</span>
                  ) : (
                    <span className="badge">ჩვეულებრივი</span>
                  )}
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="edit-btn" 
                      onClick={() => toast.warning("")}
                    >
                      🖋️
                    </button>
                    <button 
                      className="delete-btn" 
                      onClick={() => handleDelete(animal.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center' }}>მონაცემები არ არის</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AnimalsList;
