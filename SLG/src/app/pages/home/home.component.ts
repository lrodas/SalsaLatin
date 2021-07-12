import { AfterViewInit, Component, OnInit } from '@angular/core';

declare var mapboxgl: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  public currentYear: number = 0;

  lat = 51.678418;
  lng = 7.809007;

  constructor() { }


  ngAfterViewInit(): void {
    mapboxgl.accessToken = 'pk.eyJ1IjoibGVyYyIsImEiOiJja2p1bHJkdGkyNmJoMnlrM3ZzYWo1eXZzIn0.MwEB3l28e_6ZBo3wNURkOA';
    const map = new mapboxgl.Map({
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-90.5315, 14.6229],
      zoom: 12,
      pitch: 45,
      bearing: -17.6,
      container: 'map',
      antialias: true
    });

    map.on('load', () => {

      map.resize();

      new mapboxgl.Marker()
        .setLngLat([-90.51871576112055, 14.651304019220758])
        .addTo(map);

      new mapboxgl.Marker()
        .setLngLat([-90.51381830486277, 14.622391443016031])
        .addTo(map);

      new mapboxgl.Marker()
        .setLngLat([-90.51569538197374, 14.582860745831612])
        .addTo(map);

      // Insert the layer beneath any symbol layer.
      var layers = map.getStyle().layers;
      var labelLayerId;
      for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
          labelLayerId = layers[i].id;
          break;
        }
      }

      // The 'building' layer in the Mapbox Streets
      // vector tileset contains building height data
      // from OpenStreetMap.
      map.addLayer(
        {
          'id': 'add-3d-buildings',
          'source': 'composite',
          'source-layer': 'building',
          'filter': ['==', 'extrude', 'true'],
          'type': 'fill-extrusion',
          'minzoom': 15,
          'paint': {
            'fill-extrusion-color': '#aaa',

            // Use an 'interpolate' expression to
            // add a smooth transition effect to
            // the buildings as the user zooms in.
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height']
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.6
          }
        },

        labelLayerId
      );
    });
  }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
  }



}
