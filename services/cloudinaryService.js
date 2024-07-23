
export const fetchBackgroundImages = async () => {
    const response = await fetch('/api/images/backgrounds');
    if (!response.ok) {
      throw new Error('Eroare la fetch-ul imaginilor de fundal');
    }
    const data = await response.json();
    return data;
  };
  
  export const fetchCategoryImages = async (category) => {
    const response = await fetch(`/api/images/categories/${category}`);
    if (!response.ok) {
      throw new Error('Eroare la fetch-ul imaginilor din categorie');
    }
    const data = await response.json();
    return data;
  };
  