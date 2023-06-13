import mapboxgl from 'mapbox-gl';
import formatdate from './Services/FormatDate';

class ClickPopUp {
  title;
  description;
  lng;
  lat;
  dateStart;
  dateFinish;
  map;
  popUpElement;

  constructor(newEventLiteral, map) {
    this.title = newEventLiteral.title;
    this.description = newEventLiteral.description;
    this.lng = newEventLiteral.lng;
    this.lat = newEventLiteral.lat;
    this.dateStart = formatdate.formatDate(newEventLiteral.dateStart);
    this.dateFinish = formatdate.formatDate(newEventLiteral.dateFinish);
    this.map = map;
  }

  mouseClickPopupAdd() {
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

    popup
      .setLngLat([this.lng, this.lat])
      .setHTML(
        `<div id="pop-up-container">
          <h1><strong>Title</strong>: ${this.title}</h1>
          <p><strong>Début</strong>: ${this.dateStart}</p>
          <p><strong>Fin</strong>: ${this.dateFinish}</p>
          <p><strong>Description</strong>: ${this.description}</p>
          <p><strong>Latitude</strong>: ${this.lat}</p>
          <p><strong>Longitude</strong>: ${this.lng}</p>
          <button type=button id="modify-button" data-role="edit">Modify</button>
          <button type=button id="delete-button" data-role="delete">Delete</button>
          </div>
          `
      )
      .addTo(this.map);

    this.popUpElement = popup.getElement();
    console.log(popUpElement);

    const deleteBtn = document.getElementById('delete-button').parentElement;
    deleteBtn.addEventListener('click', this.removeElementClick.bind(this));

    // const divPopup = document.getElementById('pop-up-container').parentElement;
    // divPopup.addEventListener('click', this.handleClick.bind(this));
  }

  removeElementClick() {
    this.popUpElement;
  }
}

export default ClickPopUp;
