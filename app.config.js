const config = {
  apis: {
    mapbox_gl: {
      api_key: process.env.MAPBOX_GL_API_KEY,
      css_url: 'https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.css',
      map_styles: {
        streets: 'mapbox://styles/mapbox/streets-v12',
        outdoors: 'mapbox://styles/mapbox/outdoors-v12',
        light: 'mapbox://styles/mapbox/light-v11',
        dark: 'mapbox://styles/mapbox/dark-v11',
        satellite: 'mapbox://styles/mapbox/satellite-v9',
        'satellite-streets': 'mapbox://styles/mapbox/satellite-streets-v12',
        navigation_day: 'mapbox://styles/mapbox/navigation-day-v1',
        navigation_night: 'mapbox://styles/mapbox/navigation-night-v1',
      },
    },
    weather: {
      api_key: 'mon clé ici',
      url_base: 'url de base',
    },
  },
};

export default config;
