import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import '@/lib/leaflet-icon-fix';
import 'leaflet/dist/leaflet.css';
import styles from './Map.module.scss';

interface MapPropsI {
  lat: number;
  lng: number;
  popupText?: string;
  zoom?: number;
}

export default function Map({ lat, lng, popupText, zoom = 15 }: MapPropsI) {
  return (
    <div className={styles.map}>
      <MapContainer
        center={[lat, lng]}
        zoom={zoom}
        scrollWheelZoom={false}
        className={styles.container}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>{popupText && <Popup>{popupText}</Popup>}</Marker>
      </MapContainer>
    </div>
  );
}
