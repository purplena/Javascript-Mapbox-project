import mapboxgl from 'mapbox-gl';
import formatdate from './Helpers/FormatDate';
import app from './App';
import FormatDate from './Helpers/FormatDate';
import FormValidation from './Helpers/FormValidation';

class ClickPopUp {
  title;
  description;
  lng;
  lat;
  dateStart;
  dateFinish;
  map;

  popUpElement;

  constructor(element, map, marker) {
    this.title = element.title;
    this.description = element.description;
    this.lng = element.lng;
    this.lat = element.lat;
    this.dateStart = element.dateStart;
    this.dateFinish = element.dateFinish;
    this.map = map;
    this.marker = marker;
  }

  mouseClickPopupAdd() {
    //Here I prevent the creation of a new popup element on every click
    let allPopUps = document.querySelectorAll('.mapboxgl-popup');
    for (let popUp of allPopUps) {
      popUp.remove();
    }

    const popup = new mapboxgl.Popup({
      closeButton: true,
      closeOnClick: false,
      offset: 35,
    });

    this.map.getCanvas().style.cursor = 'pointer';

    popup
      .setLngLat([this.lng, this.lat])
      .setHTML(
        `<div class="click-popup-container">
          <h2><strong>Title</strong>: ${this.title}</h2>
          <p><strong>Début</strong>: ${formatdate.formatDateForPopups(
            this.dateStart
          )}</p>
          <p><strong>Fin</strong>: ${formatdate.formatDateForPopups(
            this.dateFinish
          )}</p>
          <p><strong>Description</strong>: ${this.description}</p>
          <p><strong>Latitude</strong>: ${
            Math.round(parseFloat(this.lat) * 100) / 100
          }</p>
          <p><strong>Longitude</strong>: ${
            Math.round(parseFloat(this.lng) * 100) / 100
          }</p>
          ${FormatDate.calcRemainingTime(this.dateStart)}
          <button type=button id="modify-button">Modify</button>
          <button type=button id="delete-button">Delete</button>
          </div>
          `
      )
      .addTo(this.map);
    app.isPopupOpened = true;

    popup.on('close', () => {
      app.isPopupOpened = false;
    });

    const deleteBtn = document.getElementById('delete-button');
    deleteBtn.addEventListener('click', this.deleteSingleEvent.bind(this));

    const modifyBtn = document.getElementById('modify-button');
    modifyBtn.addEventListener('click', this.modifySingleElement.bind(this));
  }

  deleteSingleEvent(evt) {
    app.isPopupOpened = false;
    this.deleteEventFromArrayByIndex();
    const element = evt.target.parentElement.parentElement;
    element.remove();
    app.localStorageService.saveStorage(app.arrEvents);

    app.renderContent();
  }

  modifySingleElement(evt) {
    app.isPopupOpened = false;
    app.elHeader1.classList.add('hidden');
    app.elHeader2.classList.remove('hidden');
    app.elBtnAddNewEvent.classList.add('hidden');
    app.elBthModifyEvent.classList.remove('hidden');
    app.elBtnCancelEventModification.classList.remove('hidden');

    const element = evt.target.parentElement.parentElement;
    element.remove();

    app.elInputTitle.value = this.title;
    app.elInputDesc.value = this.description;
    app.elInputEventStart.value = formatdate.formatDateToFillInputs(
      this.dateStart
    );
    app.elInputEventFinish.value = formatdate.formatDateToFillInputs(
      this.dateFinish
    );

    app.elInputLat.value = this.lat;
    app.elInputLng.value = this.lng;

    app.elBthModifyEvent.addEventListener(
      'click',
      this.saveModifiedEvent.bind(this)
    );

    app.elBtnCancelEventModification.addEventListener(
      'click',
      this.cancelModification.bind(this)
    );
  }

  saveModifiedEvent() {
    let modifiedTitle = app.elInputTitle.value.trim();
    let modifiedDescription = app.elInputDesc.value.trim();
    let modifiedDateStart = app.elInputEventStart.value;
    let modifiedDateFinish = app.elInputEventFinish.value;
    let modifiedLat = app.elInputLat.value;
    let modifiedLng = app.elInputLng.value;

    FormValidation.validateTitle(modifiedTitle);
    FormValidation.validateDesc(modifiedDescription);
    FormValidation.validateDateStart(modifiedDateStart, modifiedDateFinish);
    FormValidation.validateDateFinish(modifiedDateFinish);
    FormValidation.validateLat(modifiedLat);
    FormValidation.validateLng(modifiedLat);

    const allDivErrors = document.querySelectorAll('.error');
    for (let divError of allDivErrors) {
      if (divError.textContent !== '') {
        return;
      }
    }

    const modifiedEventLiteral = {
      title: modifiedTitle,
      description: modifiedDescription,
      dateStart: modifiedDateStart,
      dateFinish: modifiedDateFinish,
      lat: modifiedLat,
      lng: modifiedLng,
    };
    //we prevent to add a double event in LS
    this.deleteEventFromArrayByIndex();

    app.arrEvents.push(modifiedEventLiteral);
    app.localStorageService.saveStorage(app.arrEvents);
    app.renderContent();

    this.cleanFormInputs();
    app.elBthModifyEvent.classList.add('hidden');
    app.elBtnCancelEventModification.classList.add('hidden');

    app.loadDom();
  }

  cancelModification() {
    this.cleanFormInputs();
    app.elBthModifyEvent.classList.add('hidden');
    app.elBtnCancelEventModification.classList.add('hidden');
    app.loadDom();
  }

  deleteEventFromArrayByIndex() {
    const allMarkers = Array.from(
      document.querySelectorAll('.mapboxgl-marker')
    );
    const idxMarker = allMarkers.indexOf(this.marker);
    app.arrEvents.splice(idxMarker, 1);
  }

  cleanFormInputs() {
    app.elInputTitle.value =
      app.elInputDesc.value =
      app.elInputEventStart.value =
      app.elInputEventFinish.value =
        '';
  }
}

export default ClickPopUp;
