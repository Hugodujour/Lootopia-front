import { useContext, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { TreasureContext } from "../../context/TreasureContext";
import L from "leaflet";

// Fix icône par défaut
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

type Props = {
  onTreasureClick?: (id: string) => void;
};

const Carte = ({ onTreasureClick }: Props) => {
  const { treasures, fetchTreasures } = useContext(TreasureContext);

  useEffect(() => {
    fetchTreasures();
  }, []);

  return (
    <div className="w-full h-full">
      <MapContainer
        center={[48.8566, 2.3522]} // Paris par défaut
        zoom={13}
        scrollWheelZoom
        className="w-full h-[600px] rounded-lg z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <UserLocation />

        {treasures.map((treasure) => (
          <Marker
            key={treasure.id}
            position={[treasure.latitude, treasure.longitude]}
            eventHandlers={{
              click: () => {
                if (onTreasureClick) onTreasureClick(treasure.id);
              },
            }}
          >
            <Popup>
              <p className="font-semibold">{treasure.name}</p>
              <p>{treasure.description}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

const UserLocation = () => {
  const map = useMap();

  useEffect(() => {
    map.locate({ setView: true });

    map.on("locationfound", (e) => {
      L.marker(e.latlng).addTo(map).bindPopup("Vous êtes ici").openPopup();
    });
  }, [map]);

  return null;
};

export default Carte;
