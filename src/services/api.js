const API_BASE_URL = 'http://api.favorit-parts.ru/hs/hsprice/';

// Для демонстрации используйте ваш реальный ключ
const API_KEY = '00000000-0000-0000-0000-000000000001';

export const searchManufacturers = async (number) => {
  try {
    const url = `${API_BASE_URL}?key=${API_KEY}&number=${encodeURIComponent(number)}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching manufacturers:', error);
    throw error;
  }
};

export const searchAnalogues = async (number, brand) => {
  try {
    const url = `${API_BASE_URL}?key=${API_KEY}&number=${encodeURIComponent(number)}&brand=${encodeURIComponent(brand)}&analogues=on&info=on`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching analogues:', error);
    throw error;
  }
};
