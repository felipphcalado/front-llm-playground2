export async function getAllCollections(): Promise<string[]> {
  try {
    const response = await fetch('/api/get_all_collections');
    if (!response.ok) {
      throw new Error('Failed to fetch collections');
    }
    const data = await response.json();
    return data.collections;
  } catch (error) {
    console.error('Error fetching collections:', error);
    return [];
  }
}