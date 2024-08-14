import { JikanResponse } from "@/types/jikanResponse";

export const getCharacter = async ({ id }: { id: string; }) => {
  const data = await fetch(`https://api.jikan.moe/v4/characters/${id}/full`).then((response) => response.json());

  const res: JikanResponse = await data.json();
  return res;
};