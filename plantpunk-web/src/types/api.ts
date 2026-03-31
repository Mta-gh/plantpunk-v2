export interface EnumField {
  value: string;
  label: string;
  icon: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface Plant {
  id: number;
  name: string;
  scientific_name: string | null;
  slug: string;
  description: string | null;
  tips: string | null;
  image: string | null;
  category: Category | null;
  tags: Tag[];
  light: EnumField | null;
  watering: EnumField | null;
  watering_info: string | null;
  humidity: EnumField | null;
  difficulty: EnumField | null;
  substrate: string | null;
  temperature_min: number | null;
  temperature_max: number | null;
  toxic_to_pets: boolean;
}