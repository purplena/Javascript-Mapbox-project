import mapboxgl from 'mapbox-gl';
import formatdate from './Helpers/FormatDate';
import app from './App';

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

    //doc: config of a popup
    const markerHeight = 50;
    const markerRadius = 10;
    const linearOffset = 25;
    const popupOffsets = {
      top: [0, 0],
      'top-left': [0, 0],
      'top-right': [0, 0],
      bottom: [0, -markerHeight],
      'bottom-left': [
        linearOffset,
        (markerHeight - markerRadius + linearOffset) * -1,
      ],
      'bottom-right': [
        -linearOffset,
        (markerHeight - markerRadius + linearOffset) * -1,
      ],
      left: [markerRadius, (markerHeight - markerRadius) * -1],
      right: [-markerRadius, (markerHeight - markerRadius) * -1],
    };

    const popup = new mapboxgl.Popup({
      closeButton: true,
      closeOnClick: false,
      offset: popupOffsets,
    });

    this.map.getCanvas().style.cursor = 'pointer';

    let htmlInjection = ``;
    let timeDiff = Date.parse(this.dateStart) - Date.parse(new Date());
    const secondsInDay = 24 * 60 * 60 * 1000; // Number of seconds in a day
    const secondsInHour = 60 * 60 * 1000; // Number of seconds in an hour

    // Calculate the number of full days
    const days = Math.floor(timeDiff / secondsInDay);
    const secondsLeft = timeDiff - days * secondsInDay;
    const hours = Math.floor(secondsLeft / secondsInHour);
    if (timeDiff <= 3 * 24 * 60 * 60 * 1000 && timeDiff > 0) {
      htmlInjection = `<p>Attention, commence dans ${days} jours et ${hours} heures</p>`;
    } else if (Date.parse(this.dateStart) <= Date.parse(new Date())) {
      htmlInjection = `<p>Quel dommage! Vous avez raté cet événement!</p>`;
    }

    popup
      .setLngLat([this.lng, this.lat])
      .setHTML(
        `
          <h1><strong>Title</strong>: ${this.title}</h1>
          <p><strong>Début</strong>: ${formatdate.formatDateForPopups(
            this.dateStart
          )}</p>
          <p><strong>Fin</strong>: ${formatdate.formatDateForPopups(
            this.dateFinish
          )}</p>
          <p><strong>Description</strong>: ${this.description}</p>
          <p><strong>Latitude</strong>:</p>
          <p id="current-lat">${this.lat}</p>
          <p><strong>Longitude</strong>:</p>
          <p id="current-lgn">${this.lng}</p>
          ${htmlInjection}
          <button type=button id="modify-button">Modify</button>
          <button type=button id="delete-button">Delete</button>
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
    const allMarkers = Array.from(
      document.querySelectorAll('.mapboxgl-marker')
    );
    const idxMarker = allMarkers.indexOf(this.marker);
    app.arrEvents.splice(idxMarker, 1);
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
    const allMarkers = Array.from(
      document.querySelectorAll('.mapboxgl-marker')
    );
    const idxMarker = allMarkers.indexOf(this.marker);
    app.arrEvents.splice(idxMarker, 1);

    let modifiedTitle = app.elInputTitle.value.trim();
    let modifiedDescription = app.elInputDesc.value.trim();
    let modifiedDateStart = new Date(app.elInputEventStart.value);
    let modifiedDateFinish = new Date(app.elInputEventFinish.value);
    let modifiedLat = app.elInputLat.value;
    let modifiedLng = app.elInputLng.value;

    const modifiedEventLiteral = {
      title: modifiedTitle,
      description: modifiedDescription,
      dateStart: modifiedDateStart,
      dateFinish: modifiedDateFinish,
      lat: modifiedLat,
      lng: modifiedLng,
    };

    app.arrEvents.push(modifiedEventLiteral);
    app.localStorageService.saveStorage(app.arrEvents);
    app.renderContent();

    //On vide les champs du formulaire
    app.elInputTitle.value =
      app.elInputDesc.value =
      app.elInputEventStart.value =
      app.elInputEventFinish.value =
        '';

    app.loadDom();
  }

  cancelModification() {
    app.elInputTitle.value =
      app.elInputDesc.value =
      app.elInputEventStart.value =
      app.elInputEventFinish.value =
        '';

    app.loadDom();
  }
}

export default ClickPopUp;
