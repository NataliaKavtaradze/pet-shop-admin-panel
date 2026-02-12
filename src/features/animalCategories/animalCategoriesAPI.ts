import axios from "axios";
import type{ AnimalCategory } from "./types";

const BASE_URL =
  "http://localhost:3001/animals_with_categories";

export const fetchRelationsAPI = async (): Promise<
  AnimalCategory[]
> => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const addRelationAPI = async (
  relation: Omit<AnimalCategory, "id">
): Promise<AnimalCategory> => {
  const response = await axios.post(BASE_URL, relation);
  return response.data;
};

export const deleteRelationAPI = async (
  id: number
): Promise<number> => {
  await axios.delete(`${BASE_URL}/${id}`);
  return id;
};
