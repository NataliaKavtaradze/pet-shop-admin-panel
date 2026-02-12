import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../features/categories/categoriesSlice";
import type { Category } from "../features/categories/types";

const Container = styled.div`
  padding: 40px;
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

const Card = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
`;

const CategoriesPage = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector(
    (state) => state.categories
  );

  const [editingCategory, setEditingCategory] =
    useState<Category | null>(null);

  const [formData, setFormData] = useState<
    Omit<Category, "id">
  >({
    title: "",
    description: "",
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (editingCategory) {
      const { id, ...rest } = editingCategory;
      setFormData(rest);
    }
  }, [editingCategory]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingCategory) {
      dispatch(
        updateCategory({
          id: editingCategory.id,
          ...formData,
        })
      );
      setEditingCategory(null);
    } else {
      dispatch(createCategory(formData));
    }

    setFormData({ title: "", description: "" });
  };

  return (
    <Container>
      <h1>Categories Admin</h1>

      <Form onSubmit={handleSubmit}>
        <Input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />
        <Input
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <Button type="submit">
          {editingCategory
            ? "Update Category"
            : "Add Category"}
        </Button>
      </Form>

      {categories.map((category) => (
        <Card key={category.id}>
          <h3>{category.title}</h3>
          <p>{category.description}</p>

          <Button
            onClick={() =>
              setEditingCategory(category)
            }
          >
            Edit
          </Button>

          <Button
            onClick={() =>
              dispatch(deleteCategory(category.id))
            }
          >
            Delete
          </Button>
        </Card>
      ))}
    </Container>
  );
};

export default CategoriesPage;
