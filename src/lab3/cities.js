
export const CITIES = [
  { id: 'sarajevo', name: 'Sarajevo', lat: 43.86, lon: 18.41 },
  { id: 'mostar', name: 'Mostar', lat: 43.34, lon: 17.81 },
  { id: 'banja-luka', name: 'Banja Luka', lat: 44.77, lon: 17.19 },
  { id: 'tuzla', name: 'Tuzla', lat: 44.54, lon: 18.67 },
  { id: 'zenica', name: 'Zenica', lat: 44.20, lon: 17.91 },
  { id: 'bihac', name: 'Bihać', lat: 44.82, lon: 15.87 },
];

const API = 'https://api.open-meteo.com/v1/forecast';

export function currentUrl(city) {
  return `${API}?latitude=${city.lat}&longitude=${city.lon}`
    + '&current=temperature_2m,wind_speed_10m';
}

export function forecastUrl(city) {
  return `${API}?latitude=${city.lat}&longitude=${city.lon}`
    + '&daily=temperature_2m_max,temperature_2m_min'
    + '&timezone=Europe%2FSarajevo&forecast_days=3';
}
