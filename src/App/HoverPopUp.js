import mapboxgl from 'mapbox-gl';

class HoverPopUp {
  title;
  lng;
  lat;
  dateStart;
  dateFinish;
  map;

  constructor(newEventLiteral, map) {
    this.title = newEventLiteral.title;
    this.lng = newEventLiteral.lng;
    this.lat = newEventLiteral.lat;
    this.dateStart = newEventLiteral.dateStart;
    this.dateFinish = newEventLiteral.dateFinish;
    this.map = map;
  }

  mouseHoverPopupAdd() {
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
      closeButton: false,
      closeOnClick: false,
      offset: popupOffsets,
    });

    this.map.getCanvas().style.cursor = 'pointer';

    popup
      .setLngLat([this.lng, this.lat])
      .setHTML(
        `
        <h1>${this.title}</h1>
        <div>${this.dateStart}</div>
        <div>${this.dateFinish}</div>
        `
      )
      .addTo(this.map);

    return popup;
  }

  mouseHoverPopupRemove(popup) {
    this.map.getCanvas().style.cursor = '';
    popup.remove();
  }
}

export default HoverPopUp;
