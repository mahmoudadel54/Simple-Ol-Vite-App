import './style.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { Circle, Fill, Stroke, Style } from 'ol/style.js';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from "ol/format/GeoJSON";

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

//custom style function to apply on vector layer
const styleFunc = (feat) => {
  const styles = {};
  let color = 'red'
  const width = 3;
  switch (feat.get('name_1')) {
    case 'As Suways':
      color = 'green';
      break;
    case 'Ash Sharqiyah':
      color = 'red';
      break;
    case "Al Qahirah":
      color = 'black'
      break;
    case 'Aswan':
      color = 'orange'
      break;
    case 'Asyut':
      color = 'yellow'
      break;
    case 'Bani Suwayf':
      color = 'blue'
      break;
    case 'Bur Sa`id':
      color = 'white'
      break;
    default:
      break;
  }
  styles['Polygon'] = [
    new Style({
      fill: new Fill({
        color: color,
      }),
    }),
  ];
  styles['MultiPolygon'] =
    styles['Polygon'];
  styles['LineString'] = [
    new Style({
      stroke: new Stroke({
        color: color,
        width: width + 2,
      }),
    }),
    new Style({
      stroke: new Stroke({
        color: color,
        width: width,
      }),
    }),
  ];
  styles['MultiLineString'] = styles['LineString'];

  styles['Circle'] = styles['Polygon'].concat(
    styles['LineString']
  );

  styles['Point'] = [
    new Style({
      image: new Circle({
        radius: width * 2,
        fill: new Fill({
          color: color,
        }),
        stroke: new Stroke({
          color: color,
          width: width / 2,
        }),
      }),
      zIndex: Infinity,
    }),
  ];
  styles['MultiPoint'] =
    styles['Point'];
  styles['GeometryCollection'] =
    styles['Polygon'].concat(
      styles['LineString'],
      styles['Point']
    );
  return styles[feat.getGeometry().getType()];
}
//adding layer from geoserver 
let vecLayer = new VectorLayer({
  source: new VectorSource({
    url: "https://geowebservices.stanford.edu/geoserver/wfs?request=getFeature&outputformat=application/json&typeName=druid:vn895fq9113",
    format: new GeoJSON(),
  }),
  style: styleFunc
})

map.addLayer(vecLayer)