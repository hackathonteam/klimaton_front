import styled from 'styled-components';
import { LatLngTuple } from 'leaflet';
import {
  CircleMarker,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from 'react-leaflet';
import ProgressBar from './progress_bar';

const StyledMap = styled(MapContainer)`
  height: 100%;
  width: calc(50% - 100px);
`;

const StyledMarked = styled(Marker)``;

const Title = styled.h1`
  font-size: 24px;
`;

const position: LatLngTuple = [52.53481, 17.58259];

type Props = {
  setSelectedLocation: (location: any) => void;
  containers?: any; // TEMP
};

const Map = ({ setSelectedLocation, containers }: Props) => {
  console.log(containers);

  return (
    <StyledMap center={position} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {containers && containers.length ? (
        containers.map(
          ({
            latitude,
            longtitude,
            id: name,
            st_oddanej_do_pobranej: ratio,
          }: {
            latitude: number;
            longtitude: number;
            id: string;
            st_oddanej_do_pobranej: number;
          }) => (
            <CircleMarker
              radius={8}
              weight={3}
              color={ratio < 0.5 ? 'red' : 'blue'}
              key={`${latitude}-${longtitude}-${name}`}
              center={[latitude, longtitude]}
              eventHandlers={{
                click: () =>
                  setSelectedLocation({ name, latitude, longtitude }),
              }}
            >
              <Popup>
                <Title>ul. {name}, Gniezno</Title>
                <ProgressBar value={100 * ratio} popup />
              </Popup>
            </CircleMarker>
          )
        )
      ) : (
        <CircleMarker
          radius={8}
          weight={3}
          center={position}
          eventHandlers={{ click: () => console.log('Clicked') }}
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </CircleMarker>
      )}
    </StyledMap>
  );
};

export default Map;
