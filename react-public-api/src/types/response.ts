export interface Affinity {
  urban?: string;
  urbanEmotion?: string;
  outdoors?: string;
  outdoorsEmotion?: string;
  indoors?: string;
  indoorsEmotion?: string;
}

export interface Names {
  firstName: string;
  lastName: string;
  japanName: string;
  _id: string;
}

export interface Character {
  _id: string;
  name: string;
  names: Names;
  age: string;
  school: string;
  birthday: string;
  background: string;
  height: string;
  photoUrl: string;
  image: string;
  imageSpecial: string[];
  imageSchool: string;
  hobbies: string[];
  voice: string;
  voices: string;
  role: string[];
  damageType: string;
  armorType: string;
  affinity: Affinity[];
  weapon: string;
  weaponUnique: string;
  weaponImage: string;
  realeaseDate: string;
}

export interface responseAPI {
  message: string,
  data: Character[];
}
