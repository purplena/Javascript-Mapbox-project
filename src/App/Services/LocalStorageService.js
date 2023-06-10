const STORAGE_NAME = 'localEvents';

class NoteService {
  //méthode qui récupère les data de localStorage
  readStorage() {
    //declarer une variable qui va contenir les datas
    let arrEvents = [];
    //récupérer les data du localStorage
    const serializedData = localStorage.getItem(STORAGE_NAME);

    //traitement si la key n'existe pas
    if (!serializedData) return arrEvents;

    //si la key existe on va essayer de parser les datas
    try {
      //on tente de parser les datas
      arrEvents = JSON.parse(serializedData);
    } catch (error) {
      // Si cela ne fonctionne pas (pour cause de données corrompues )
      // On supprime les données
      localStorage.removeItem(STORAGE_NAME);
      console.log('données corrompues check your readStorage method');
    }

    //on retourne les datas
    return arrEvents;
  }

  //méthode qui sauvegarde les data dans localStorage
  saveStorage(arrEvents) {
    //transformer l'objet reçu en paramètre en chaîne de caractères JSON
    const serializedData = JSON.stringify(arrEvents);
    //une fois stringifier il faut l'enregistrer dans le localStorage
    try {
      //on essaye d'enregistrer dans le localStorage
      localStorage.setItem(STORAGE_NAME, serializedData);
    } catch (error) {
      //si on a une erreur on l'affiche
      console.log(error);
      return false;
    }
  }

  deleteStorage() {
    return localStorage.removeItem(STORAGE_NAME);
  }
}

export default NoteService;
