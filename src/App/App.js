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

class App {
  //propriétés
  //container de la Map
  elDivMap;
  //instance de la map
  map;
  marker;

  start() {
    console.log('App démarrée...');
    //Why I did not see my div because I did not call loadDom method in start()
    this.loadDom();
    this.initMap();
  }

  loadDom() {
    //****************************************************** MAP *************************************/
    this.elDivMap = document.createElement('div');
    this.elDivMap.id = 'map';

    document.body.append(this.elDivMap);
  }

  initMap() {
    //initialiseer la map

    mapboxgl.accessToken = config.apis.mapbox_gl.api_key;
    this.map = new mapboxgl.Map({
      container: this.elDivMap,
      style: config.apis.mapbox_gl.map_styles.streets,
      center: [2.79, 42.68],
      zoom: 12,
    });

    const nav = new mapboxgl.NavigationControl();
    this.map.addControl(nav, 'top-left');

    //on va ecouter le click sur le map
    this.map.on('click', this.handleClickMap.bind(this));
  }

  handleClickMap(evt) {
    if (this.marker) {
      this.marker.remove();
    }
    console.log(evt.lngLat.lng);
    console.log(evt.lngLat.lat);
    let coords = {
      lng: evt.lngLat.lng,
      lat: evt.lngLat.lat,
    };
    this.marker = new mapboxgl.Marker()
      .setLngLat([coords.lng, coords.lat])
      .addTo(this.map);

    return coords;
  }
}

const app = new App();

export default app;
