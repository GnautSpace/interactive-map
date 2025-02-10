import { MapContainer, TileLayer } from 'react-leaflet'
import LocationDraggableMarker from './LocationDraggableMarker'
import 'leaflet/dist/leaflet.css';  
import '../Map.css'

function Map(){
    const defaultPos=[34.653,135.511];
    return(
        <div className="map-container">
            <div className="leaflet-container">
                <MapContainer center={defaultPos} zoom={10} scrollWheelZoom={false} style={{ height: "500px", width: "100%" }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                    <LocationDraggableMarker/>
                </MapContainer>
            </div>
        </div>

    );
}


export default Map;
