const STORAGE_NAME = 'localEvents';

class LocalStorageService {
  readStorage() {
    let arrEvents = [];
    const serializedData = localStorage.getItem(STORAGE_NAME);

    if (!serializedData) return arrEvents;

    try {
      arrEvents = JSON.parse(serializedData);
    } catch (error) {
      localStorage.removeItem(STORAGE_NAME);
      console.log('données corrompues check your readStorage method');
    }

    return arrEvents;
  }

  saveStorage(arrEvents) {
    const serializedData = JSON.stringify(arrEvents);
    try {
      localStorage.setItem(STORAGE_NAME, serializedData);
    } catch (error) {
      console.log(error);

      return false;
    }
  }

  deleteStorage() {
    return localStorage.removeItem(STORAGE_NAME);
  }
}

export default LocalStorageService;
