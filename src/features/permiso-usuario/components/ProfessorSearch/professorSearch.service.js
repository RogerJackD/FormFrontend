export const fetchProfessors = async (query) => {
  if (!query || query.length < 2) return [];

  try {
    const response = await fetch(
      `https://formbackend-ndvy.onrender.com/api/instructores/autocompletar?query=${query}`
    );
    return await response.json();
  } catch (error) {
    console.error('Error fetching professors:', error);
    return [];
  }
};