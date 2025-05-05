//Archivo para guardar y leer de localStorage automáticamente al abrir la app.
export function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  export function loadFromLocalStorage(key, defaultValue) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  }