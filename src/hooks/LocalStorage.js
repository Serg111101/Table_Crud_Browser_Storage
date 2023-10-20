export function AddStore(key, value, storage) {
  try {
    const hashedKey = btoa(key); // Encode key to base64
    const hashedValue = btoa(JSON.stringify(value)); // Encode value to base64
    storage.setItem(hashedKey, hashedValue);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export function getFetchDataStorage(key, storage) {
  try {
    const hashedKey = btoa(key); // Encode key to base64
    const hashedValue = storage.getItem(hashedKey);
    if (hashedValue) {
      const originalValue = JSON.parse(atob(hashedValue)); // Decode value from base64
      return originalValue;
    } else {
      console.warn("Key not found");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function dataRemoveStorage(key, storage) {
  try {
    const hashedKey = btoa(key); // Encode key to base64
    const hashedValue = storage.getItem(hashedKey);
    if (hashedValue) {
      storage.removeItem(hashedKey);
      return true;
    } else {
      console.warn("Key not found");
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
