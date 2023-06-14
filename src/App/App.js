//our config
import config from '../../app.config.js';
//library of mapbox
import mapboxgl from 'mapbox-gl';
//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
//style de mapbox
import 'mapbox-gl/dist/mapbox-gl.css';
//css
import '../assets/style.css';
import HoverPopUp from './HoverPopUp.js';
import ClickPopUp from './ClickPopUp.js';
import LocalStorageService from './Services/LocalStorageService.js';

class App {
  //propriétés
  //container de la Map
  elDivMap;
  //instance de la map
  map;
  marker;

  //form inputs
  elHeader1;
  elHeader2;
  elInputTitle;
  elInputDesc;
  elInputEventStart;
  elInputEventFinish;
  elInputLat;
  elInputLng;
  elBtnAddNewEvent;
  elBthModifyEvent;
  elBtnCancelEventModification;

  //our array of events
  arrEvents = [];

  //LocalStorage = NoteService
  localStorageService;

  isHovered = false;
  hoverPopUp;
  isPopupOpened = false;

  start() {
    console.log('App démarrée...');
    this.localStorageService = new LocalStorageService();
    this.loadDom();
    this.initMap();

    const arrLocalEventsLiteral = this.localStorageService.readStorage();
    if (arrLocalEventsLiteral.length <= 0) return;
    // for (let localEventLiteral of arrLocalEventsLiteral) {
    //   this.arrEvents.push(localEventLiteral);
    // }

    this.arrEvents = arrLocalEventsLiteral;

    this.renderContent();
  }

  loadDom() {
    //****************************************************** MAP *************************************//
    this.elDivMap = document.createElement('div');
    this.elDivMap.id = 'map';

    //****************************************************** FORM *************************************//
    const elDivContainer = document.createElement('div');
    elDivContainer.id = 'add-event-form-container';

    const elDivForm = document.createElement('div');
    elDivForm.className = 'form-container';

    const elDivButton = document.createElement('div');
    elDivButton.className = 'button-container';
    const elBtnDeleteAll = document.createElement('button');
    elBtnDeleteAll.type = 'button';
    elBtnDeleteAll.id = 'delete-all-local-events-button';
    elBtnDeleteAll.textContent = 'Supprimer tous';

    elDivButton.append(elBtnDeleteAll);

    this.elHeader1 = document.createElement('h1');
    this.elHeader1.textContent = 'Ajoutez votre événement';
    this.elHeader1.className = 'add-new-event-header';

    this.elHeader2 = document.createElement('h1');
    this.elHeader2.textContent = 'Modifiez votre événement';
    this.elHeader2.className = 'modify-event-header hidden';

    const elFormAddEvent = document.createElement('form');
    elFormAddEvent.id = 'add-event-form';
    elFormAddEvent.noValidate = true;

    //Event Title
    const elLabelTitle = document.createElement('label');
    elLabelTitle.className = 'add-event-form-label';
    elLabelTitle.setAttribute('for', 'input-title');
    elLabelTitle.textContent = "Titre de l'événement:";

    this.elInputTitle = document.createElement('input');
    this.elInputTitle.className = 'add-event-form-input';
    this.elInputTitle.type = 'text';
    this.elInputTitle.id = 'input-title';

    //Event Description
    const elLabelDesc = document.createElement('label');
    elLabelDesc.className = 'add-event-form-label';
    elLabelDesc.setAttribute('for', 'input-description');
    elLabelDesc.textContent = "Description de l'événement:";

    this.elInputDesc = document.createElement('textarea');
    this.elInputDesc.className = 'add-event-form-input';
    this.elInputDesc.rows = 4;
    this.elInputDesc.id = 'input-description';

    //Event Start
    const elLabelEventStart = document.createElement('label');
    elLabelEventStart.className = 'add-event-form-label';
    elLabelEventStart.setAttribute('for', 'input-datetime-start');
    elLabelEventStart.textContent = 'Date de début:';

    this.elInputEventStart = document.createElement('input');
    this.elInputEventStart.className = 'add-event-form-input';
    this.elInputEventStart.type = 'datetime-local';
    this.elInputEventStart.id = 'input-datetime-start';

    //Event Finish
    const elLabelEventFinish = document.createElement('label');
    elLabelEventFinish.className = 'add-event-form-label';
    elLabelEventFinish.setAttribute('for', 'input-datetime-finish');
    elLabelEventFinish.textContent = 'Date de fin:';

    this.elInputEventFinish = document.createElement('input');
    this.elInputEventFinish.className = 'add-event-form-input';
    this.elInputEventFinish.type = 'datetime-local';
    this.elInputEventFinish.id = 'input-datetime-finish';

    //Latitude
    const elLabelLat = document.createElement('label');
    elLabelLat.className = 'add-event-form-label';
    elLabelLat.setAttribute('for', 'input-latitude');
    elLabelLat.textContent = 'Latitude:';

    this.elInputLat = document.createElement('input');
    this.elInputLat.className = 'add-event-form-input';
    this.elInputLat.type = 'number';
    this.elInputLat.id = 'input-latitude';

    //Latitude
    const elLabelLon = document.createElement('label');
    elLabelLon.className = 'add-event-form-label';
    elLabelLon.setAttribute('for', 'input-longitude');
    elLabelLon.textContent = 'Longitude:';

    this.elInputLng = document.createElement('input');
    this.elInputLng.className = 'add-event-form-input';
    this.elInputLng.type = 'number';
    this.elInputLng.id = 'input-longitude';

    //Submit Button
    this.elBtnAddNewEvent = document.createElement('button');
    this.elBtnAddNewEvent.type = 'button';
    this.elBtnAddNewEvent.textContent = 'Submit';

    //Modify button
    this.elBthModifyEvent = document.createElement('button');
    this.elBthModifyEvent.type = 'button';
    this.elBthModifyEvent.textContent = 'Modify';
    this.elBthModifyEvent.className = 'hidden';

    //Cancel Button
    this.elBtnCancelEventModification = document.createElement('button');
    this.elBtnCancelEventModification.type = 'button';
    this.elBtnCancelEventModification.textContent = 'Cancel';
    this.elBtnCancelEventModification.className = 'hidden';

    //****************************************************** Append *************************************//
    elFormAddEvent.append(
      elLabelTitle,
      this.elInputTitle,
      elLabelDesc,
      this.elInputDesc,
      elLabelEventStart,
      this.elInputEventStart,
      elLabelEventFinish,
      this.elInputEventFinish,
      elLabelLat,
      this.elInputLat,
      elLabelLon,
      this.elInputLng,
      this.elBtnAddNewEvent,
      this.elBthModifyEvent,
      this.elBtnCancelEventModification
    );
    elDivForm.append(this.elHeader1, this.elHeader2, elFormAddEvent);

    elDivContainer.append(elDivButton, elDivForm);

    document.body.append(this.elDivMap, elDivContainer);

    elBtnDeleteAll.addEventListener('click', this.handleDeleteAll.bind(this));

    this.elBtnAddNewEvent.addEventListener(
      'click',
      this.handleAddNewEvent.bind(this)
    );
  }

  initMap() {
    //initialiseer la map

    mapboxgl.accessToken = config.apis.mapbox_gl.api_key;
    this.map = new mapboxgl.Map({
      container: this.elDivMap,
      style: config.apis.mapbox_gl.map_styles.streets,
      center: [2.79, 42.68],
      zoom: 12,
      clickTolerance: 20,
    });

    const nav = new mapboxgl.NavigationControl();
    this.map.addControl(nav, 'top-left');

    //on va ecouter le click sur le map
    this.map.on('click', this.handleClickMap.bind(this));
  }

  handleClickMap(evt) {
    // do not do that if my mouse is currently over a marker
    if (this.isHovered) {
      return;
    }

    if (this.marker) {
      this.marker.remove();
    }

    let allPopUps = document.querySelectorAll('.mapboxgl-popup');
    if (allPopUps.length > 0) {
      allPopUps[0].remove();
      this.isPopupOpened = false;
    }

    let coords = {
      lng: evt.lngLat.lng,
      lat: evt.lngLat.lat,
    };

    this.marker = new mapboxgl.Marker()
      .setLngLat([coords.lng, coords.lat])
      .addTo(this.map);

    this.elInputLat.value = coords.lat;
    this.elInputLng.value = coords.lng;
  }

  handleAddNewEvent() {
    //creation de objet literal
    let newTitle = this.elInputTitle.value.trim();
    let newDescription = this.elInputDesc.value.trim();
    let newDateStart = new Date(this.elInputEventStart.value);
    let newDateFinish = new Date(this.elInputEventFinish.value);
    let newLat = this.elInputLat.value;
    let newLng = this.elInputLng.value;

    const newEventLiteral = {
      title: newTitle,
      description: newDescription,
      dateStart: newDateStart,
      dateFinish: newDateFinish,
      lat: newLat,
      lng: newLng,
    };

    this.arrEvents.push(newEventLiteral);
    this.localStorageService.saveStorage(this.arrEvents);
    this.renderContent();

    //On vide les champs du formulaire
    this.elInputTitle.value =
      this.elInputDesc.value =
      this.elInputEventStart.value =
      this.elInputEventFinish.value =
        '';
  }
  // }

  renderContent() {
    const allMarkers = document.querySelectorAll('.mapboxgl-marker');
    for (let marker of allMarkers) {
      marker.remove();
    }

    for (let localEvent of this.arrEvents) {
      let newColor = '';
      if (
        Date.parse(localEvent.dateStart) - Date.parse(new Date()) >
        3 * 24 * 60 * 60 * 1000
      ) {
        newColor = '#197530';
      } else if (
        Date.parse(localEvent.dateStart) - Date.parse(new Date()) <=
          3 * 24 * 60 * 60 * 1000 &&
        Date.parse(localEvent.dateStart) - Date.parse(new Date()) > 0
      ) {
        newColor = '#c94b20';
      } else {
        newColor = '#b31810';
      }

      let newMarker = new mapboxgl.Marker({
        color: newColor,
      })
        .setLngLat([localEvent.lng, localEvent.lat])
        .addTo(this.map);

      //Create a DOM element marker
      let newMarkerElement = newMarker.getElement();
      newMarkerElement.style.padding = '20px';

      //Mouseenter
      newMarkerElement.addEventListener('mouseenter', () => {
        this.isHovered = true;
        if (this.isPopupOpened) return;
        this.hoverPopUp = new HoverPopUp(
          localEvent,
          this.map
        ).mouseHoverPopupAdd();
      });

      //Add mouseleave
      newMarkerElement.addEventListener('mouseleave', () => {
        this.isHovered = false;
        new HoverPopUp(localEvent, this.map).mouseHoverPopupRemove(
          this.hoverPopUp
        );
      });

      // Add click
      newMarkerElement.addEventListener('click', () => {
        new ClickPopUp(
          localEvent,
          this.map,
          newMarkerElement
        ).mouseClickPopupAdd();
      });
    }
  }

  handleDeleteAll() {
    this.arrEvents = [];
    this.localStorageService.deleteStorage();

    const allMarkers = document.querySelectorAll('.mapboxgl-marker');
    for (let marker of allMarkers) {
      marker.remove();
    }
    const allPopUps = document.querySelectorAll('.mapboxgl-popup');
    for (let popUp of allPopUps) {
      popUp.remove();
    }
    this.renderContent();
    this.loadDom();
  }
}

const app = new App();

export default app;
