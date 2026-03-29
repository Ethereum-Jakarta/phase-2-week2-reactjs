import { JikanCharacter, JikanResponse } from "@/types/jikanResponse";

export const getCharacter = async ({ id }: { id: number; }) => {
  const data: JikanResponse = await fetch(`https://api.jikan.moe/v4/characters/${id}/full`).then((response) => response.json());

  const res: JikanCharacter = data.data;
  return res;
};