/**
 * Fetch model data from the backend API
 * @param {string} url - The URL to fetch data from
 * @returns {Promise} - A promise that resolves to the fetched data
 */
const fetchModel = async (url) => {
  try {
    const response = await fetch(`http://localhost:8081/api${url}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching model data:', error);
    throw error;
  }
};

export default fetchModel; 