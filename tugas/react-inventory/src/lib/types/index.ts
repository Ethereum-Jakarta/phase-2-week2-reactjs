export type MangaItem = {
  id: string;
  name: string;
  image: string;
  price: number;
  discount: number;
  isCod: boolean;
  isFreeShip: boolean;
  category: string;
}


export type NotificationItems = {
  message: string;
  type: "danger" | "warn" | "success";
  timestamp: number;
}
