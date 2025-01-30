import axios from 'axios';

// Base URL for the API
const API_BASE_URL = 'https://thronesapi.com/api/v2';

// Fetch all characters
export const fetchCharacters = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Characters`);
    return response.data; // Returns an array of characters
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};

// Fetch a specific character by ID
export const fetchCharacterById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Characters/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching character with ID ${id}:`, error);
    throw error;
  }
};
