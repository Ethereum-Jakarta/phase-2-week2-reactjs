import { responseAPI } from "@/types/response";

export const getAllStudents = async () => {
  const data = await fetch(
    `https://api-blue-archive.vercel.app/api/characters/students`
  );
  const res: responseAPI = await data.json();

  return res.data;
};