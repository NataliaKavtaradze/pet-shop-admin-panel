import axios from "axios";
import type { Category } from "./types";

const BASE_URL = "http://localhost:3001/categories";

export const fetchCategoriesAPI = async (): Promise<Category[]> => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const createCategoryAPI = async (
  category: Omit<Category, "id">
): Promise<Category> => {
  const response = await axios.post(BASE_URL, category);
  return response.data;
};

export const updateCategoryAPI = async (
  category: Category
): Promise<Category> => {
  const response = await axios.put(
    `${BASE_URL}/${category.id}`,
    category
  );
  return response.data;
};

export const deleteCategoryAPI = async (
  id: number
): Promise<number> => {
  await axios.delete(`${BASE_URL}/${id}`);
  return id;
};
