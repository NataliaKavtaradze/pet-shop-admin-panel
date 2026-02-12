import axios from "axios";
import type { Animal } from "./types";

const BASE_URL = "http://localhost:3001/animals";

export const fetchAnimalsAPI = async (): Promise<Animal[]> => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const createAnimalAPI = async (
  animal: Omit<Animal, "id">
): Promise<Animal> => {
  const response = await axios.post(BASE_URL, animal);
  return response.data;
};

export const updateAnimalAPI = async (
  animal: Animal
): Promise<Animal> => {
  const response = await axios.put(`${BASE_URL}/${animal.id}`, animal);
  return response.data;
};

export const deleteAnimalAPI = async (
  id: number
): Promise<number> => {
  await axios.delete(`${BASE_URL}/${id}`);
  return id;
};
