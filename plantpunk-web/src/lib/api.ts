import { Plant, Category, Tag } from '@/types/api';

export async function fetchAPI(endpoint: string) {
  const res = await fetch(`${process.env.API_URL}/${endpoint}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error('API error');
  return res.json();
}

export async function getPlants(): Promise<Plant[]> {
  const res = await fetchAPI('plants');
  return res.data;
}

export async function getPlant(slug: string): Promise<Plant> {
  const res = await fetchAPI(`plants/${slug}`);
  return res.data;
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetchAPI('categories');
  return res.data;
}

export async function getTags(): Promise<Tag[]> {
  const res = await fetchAPI('tags');
  return res.data;
}