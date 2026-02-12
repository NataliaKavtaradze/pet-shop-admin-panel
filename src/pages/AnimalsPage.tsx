import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import {
  fetchAnimals,
  createAnimal,
  deleteAnimal,
  updateAnimal,
} from "../features/animals/animalsSlice";
import { deleteRelation } from "../features/animalCategories/animalCategoriesSlice";
import type { Animal } from "../features/animals/types";

const Container = styled.div`
  padding: 40px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  margin-bottom: 30px;
`;

const Input = styled.input`
  padding: 8px;
`;

const Button = styled.button`
  padding: 8px;
  cursor: pointer;
`;

const AnimalCard = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
`;

const AnimalsPage = () => {
const dispatch = useAppDispatch();
const { animals, loading } = useAppSelector((state) => state.animals);
const relations = useAppSelector((state) => state.relations);
const categories = useAppSelector((state) => state.categories);

const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);

const [formData, setFormData] = useState<Omit<Animal, "id">>({
  name: "",
  priceUSD: 0,
  priceGEL: 0,
  description: "",
  isPopular: false,
  stock: 0,
});

useEffect(() => {
  dispatch(fetchAnimals());
}, [dispatch]);

// 🔥 როცა edit-ზე ვაჭერთ ფორმა შეივსოს
useEffect(() => {
  if (editingAnimal) {
    const { id, ...rest } = editingAnimal;
    setFormData(rest);
  }
}, [editingAnimal]);

const getAnimalCategories = (animal: Animal) => {
  return Array.isArray(relations) ? relations.filter((r: any) => r.animal_id === animal.id) : [];
};
{editingAnimal && getAnimalCategories(editingAnimal).map((rel) => {
  const category = Array.isArray(categories) ? categories.find(
    (c) => c.id === rel.category_id
  ) : null;

  return (
    <div key={rel.id}>
      {category?.title}
      <button
        onClick={() =>
          dispatch(deleteRelation(rel.id))
        }
      >
        Remove
      </button>
    </div>
  );
})}


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingAnimal) {
      dispatch(
        updateAnimal({
          id: editingAnimal.id,
          ...formData,
        })
      );
      setEditingAnimal(null);
    } else {
      dispatch(createAnimal(formData));
    }

    // ფორმის გასუფთავება
    setFormData({
      name: "",
      priceUSD: 0,
      priceGEL: 0,
      description: "",
      isPopular: false,
      stock: 0,
    });
  };
  

  return (
    <Container>
      <Title>Animals Admin</Title>

      <Form onSubmit={handleSubmit}>
        <Input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="priceUSD"
          placeholder="Price USD"
          value={formData.priceUSD}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="priceGEL"
          placeholder="Price GEL"
          value={formData.priceGEL}
          onChange={handleChange}
        />
        <Input
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
        />
<select defaultValue="">
  <option value="">Select Category</option>
  {Array.isArray(categories) && categories.map((cat) => (
    <option key={cat.id} value={cat.id}>
      {cat.title}
    </option>
  ))}
</select>


        <label>
          Popular:
          <input
            type="checkbox"
            name="isPopular"
            checked={formData.isPopular}
            onChange={handleChange}
          />
        </label>

        <Button type="submit">
          {editingAnimal ? "Update Animal" : "Add Animal"}
        </Button>
      </Form>

      {loading && <p>Loading...</p>}

      {animals.map((animal) => (
        <AnimalCard key={animal.id}>
          <h3>{animal.name}</h3>
          <p>{animal.description}</p>
          <p>USD: {animal.priceUSD}</p>
          <p>Stock: {animal.stock}</p>

          <Button onClick={() => setEditingAnimal(animal)}>
            Edit
          </Button>

          <Button
            onClick={() =>
              dispatch(deleteAnimal(animal.id))
            }
          >
            Delete
          </Button>
        </AnimalCard>
      ))}
    </Container>
  );
};

export default AnimalsPage;

