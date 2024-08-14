
export type eva = 'eva00' | 'eva01' | 'eva02' | 'eva08' | 'eva06';
export interface characterType {
  id: number;
  animeId: number;
  name: string,
  image: string;
  width?: number;
  scale?: number;
  bottom?: number;
  evaId?: eva;
  evaColor?: string;
}