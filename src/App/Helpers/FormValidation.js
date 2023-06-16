import app from '../App';

class FormValidation {
  errorMessages = [
    'Veuillez remplir ce champ',
    'Le titre contient 50 caractères max',
    'La description contient 150 caractères max',
    'La date de début ne peut pas être postérieure à la date de fin.',
    'Vous ne pouvez pas choisir la date dans le passé',
  ];

  static validateTitle(title) {
    let arrErrors = [];
    if (title === '') {
      arrErrors.unshift('Veuillez remplir ce champ');
      app.elDivErrorTitle.textContent = arrErrors[0].toString();
      app.elDivErrorTitle.classList.remove('hidden');
    }

    if (title.length > 50) {
      arrErrors.unshift('Le titre contient 50 caractères max');
      app.elDivErrorTitle.textContent = arrErrors[0].toString();
      app.elDivErrorTitle.classList.remove('hidden');
    }
  }

  static validateDesc(description) {
    let arrErrors = [];
    if (description === '') {
      arrErrors.unshift('Veuillez remplir ce champ');
      app.elDivErrorDesc.textContent = arrErrors[0].toString();
      app.elDivErrorDesc.classList.remove('hidden');
    }

    if (description.length > 150) {
      arrErrors.unshift('La description contient 150 caractères max');
      app.elDivErrorDesc.textContent = arrErrors[0].toString();
      app.elDivErrorDesc.classList.remove('hidden');
    }
  }

  static validateDateStart(dateStart, dateFinish) {
    let arrErrors = [];
    if (dateStart === '') {
      arrErrors.unshift('Veuillez remplir ce champ');
      app.elDivErrorStart.textContent = arrErrors[0].toString();
      app.elDivErrorStart.classList.remove('hidden');
    }

    if (dateStart > dateFinish) {
      arrErrors.unshift(
        'La date de début ne peut pas être postérieure à la date de fin'
      );
      app.elDivErrorStart.textContent = arrErrors[0].toString();
      app.elDivErrorStart.classList.remove('hidden');
    }

    if (new Date(dateStart) <= new Date()) {
      arrErrors.unshift('Vous ne pouvez pas choisir la date dans le passé');
      app.elDivErrorStart.textContent = arrErrors[0].toString();
      app.elDivErrorStart.classList.remove('hidden');
    }
    arrErrors = [];
  }

  static validateDateFinish(dateFinish) {
    let arrErrors = [];
    if (dateFinish === '') {
      arrErrors.unshift('Veuillez remplir ce champ');
      app.elDivErrorEnd.textContent = arrErrors[0].toString();
      app.elDivErrorEnd.classList.remove('hidden');
    }
  }

  static validateLat(lat) {
    let arrErrors = [];
    if (lat === '') {
      arrErrors.unshift('Veuillez remplir ce champ');
      app.elDivErrorLat.textContent = arrErrors[0].toString();
      app.elDivErrorLat.classList.remove('hidden');
    }
  }

  static validateLng(lng) {
    let arrErrors = [];
    if (lng === '') {
      arrErrors.unshift('Veuillez remplir ce champ');
      app.elDivErrorLng.textContent = arrErrors[0].toString();
      app.elDivErrorLng.classList.remove('hidden');
    }
  }

  static hideTitleErrors() {
    app.elInputTitle.addEventListener('focus', () => {
      app.elDivErrorTitle.classList.add('hidden');
      app.elDivErrorTitle.textContent = '';
      app.elInputTitle.value = '';
    });
  }

  static hideDescErrors() {
    app.elInputDesc.addEventListener('focus', () => {
      app.elDivErrorDesc.classList.add('hidden');
      app.elDivErrorDesc.textContent = '';
      app.elInputDesc.value = '';
    });
  }

  static hideStartDateErrors() {
    app.elInputEventStart.addEventListener('focus', () => {
      app.elDivErrorStart.classList.add('hidden');
      app.elDivErrorStart.textContent = '';
      app.elInputEventStart.value = '';
    });
  }

  static hideFinishDateErrors() {
    app.elInputEventFinish.addEventListener('focus', () => {
      app.elDivErrorEnd.classList.add('hidden');
      app.elDivErrorEnd.textContent = '';
      app.elInputEventFinish.value = '';
    });
  }

  static hideLatErrorsOnFocus() {
    app.elInputLat.addEventListener('focus', () => {
      app.elDivErrorLat.classList.add('hidden');
      app.elDivErrorLat.textContent = '';
      app.elInputLat.value = '';
    });
  }

  static hideLatErrorsOnClick() {
    app.elDivErrorLat.classList.add('hidden');
    app.elDivErrorLat.textContent = '';
    app.elInputLat.value = '';
  }

  static hideLngErrorsOnFocus() {
    app.elInputLng.addEventListener('focus', () => {
      app.elDivErrorLng.classList.add('hidden');
      app.elDivErrorLng.textContent = '';
      app.elInputLng.value = '';
    });
  }

  static hideLngErrorsOnClick() {
    app.elDivErrorLng.classList.add('hidden');
    app.elDivErrorLng.textContent = '';
    app.elInputLng.value = '';
  }
}

export default FormValidation;
