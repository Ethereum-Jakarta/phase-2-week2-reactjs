import { bloclistMalId } from "./constants";

const baseURL = "https://api.jikan.moe";
export type AnimeDataItem = {
  mal_id: number;
  url: string;
  title: string;
  title_japanese: string;
  images: {
    webp: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    }
  };
  synopsis: string;
  background: string;
  aired: {
    string: string;
  };
  rating: string;
  status: string;
  type: string;
}

export type SearchAnimeResponse = {
  data: AnimeDataItem[],
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    items: {
      count: number;
      total: number;
      per_page: number;
    }
  }
}

export async function searchAnime(query?: string, page = 1) {
  let searchParam = new URLSearchParams({
    order_by: "score",
    sort: "desc",
    type: "tv",
    page: page.toString(),
  });
  if (query) searchParam.append("q", query);
  const url = new URL(`/v4/anime?${searchParam}`, baseURL);
  return fetch(url)
    .then(x => x.json() as Promise<SearchAnimeResponse>)
    .then(x => ({ ...x, data: x.data.filter(y => !bloclistMalId.includes(y.mal_id))}));
}
