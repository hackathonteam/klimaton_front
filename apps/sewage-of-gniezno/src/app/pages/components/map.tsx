import styled from 'styled-components';
import { LatLngTuple } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const StyledMap = styled(MapContainer)`
  height: 100%;
  width: 50%;
`;

const position: LatLngTuple = [52.53481, 17.58259];

type Props = {
  locations?: any; // TEMP
};

const Map = ({ locations }: Props) => {
  return (
    <StyledMap center={position} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations?.data?.data ? (
        locations.data.data.map(
          ({
            latitude,
            longtitude,
            name,
          }: {
            latitude: number;
            longtitude: number;
            name: string;
          }) => (
            <Marker
              key={`${latitude}-${longtitude}`}
              position={[latitude, longtitude]}
            >
              <Popup>{name}</Popup>
            </Marker>
          )
        )
      ) : (
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      )}
    </StyledMap>
  );
};

export default Map;
