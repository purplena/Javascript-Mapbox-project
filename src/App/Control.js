import app from './App';

export default class Control {
  onAdd(map) {
    this._map = map;
    this._container = document.createElement('div');
    this._container.className = 'mapboxgl-ctrl';
    this._container.innerHTML = '<i class="bi bi-balloon-heart"></i>';
    this._container.addEventListener('click', this.updateMarkers.bind(this));
    return this._container;
  }

  onRemove() {
    this._container.remove();
    this._map = undefined;
  }

  updateMarkers() {
    app.renderContent();
  }
}
