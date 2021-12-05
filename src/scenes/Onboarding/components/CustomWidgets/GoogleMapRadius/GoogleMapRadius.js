/* eslint-disable no-sequences */
import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import { v4 as uuid } from 'uuid';
import { Box } from 'rebass';
import Slider from '../Slider';
import Spinner from '../../../../../components/Spinner';
import theme from '../../../../../util/theme';

const googleApiKey = process.env.GATSBY_GOOGLE_MAPS_API_KEY || null;
const id = uuid();
const marks = {
  10: <>|<strong>10</strong></>,
  50: <>|<strong>50</strong></>,
};

let circle;

const Map = ({ radius, location }) => {
  React.useEffect(() => {
    if (circle) {
      circle.setRadius((radius * 100));
    }
  }, [radius]);

  return (
    <Box style={{ height: '30vh' }} margin={[2, null, null, 0]}>
      <GoogleMapReact
        apiKey={googleApiKey}
        defaultZoom={12}
        center={{ lat: location?.latitude, lng: location?.longitude }}
        defaultCenter={{ lat: location?.latitude, lng: location?.longitude }}
        options={{
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        }}
        yesIWantToUseGoogleMapApiInternals
        overlayViewDivStyle={{}}
        onGoogleApiLoaded={({ map, maps }) => {
          circle = new maps.Circle({
            id,
            fillColor: theme.palette.contrast[0],
            fillOpacity: 0.2,
            strokeWeight: 1,
            strokeColor: theme.palette.contrast[0],
            strokeOpacity: 0.7,
            map,
            center: { lat: location?.latitude, lng: location?.longitude },
            radius: (radius * 100),
          });
          return new maps.Marker({
            position: { lat: location?.latitude, lng: location?.longitude },
            map,
            title: 'Your business address',
            draggable: false,
          });
        }}
      />
    </Box>
  );
};

Map.defaultProps = {
  formData: {},
};

Map.propTypes = {
  formData: PropTypes.shape({
    contentUrl: PropTypes.string,
  }),
  location: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }).isRequired,
  radius: PropTypes.number.isRequired,
};

const GoogleMapRadius = (props) => {
  const {
    formData,
    location,
    onChange,
  } = props;

  const [radiusValue, setRadiusValue] = React.useState(20);

  const handleSliderChange = (value) => {
    setRadiusValue(value);
    onChange(value);
  };

  return (
    <>
      <div>
        <Slider
          min={10}
          max={50}
          defaultValue={formData?.radius || radiusValue}
          tipFormatter={(value) => (
            <>
              {value} km
              <span>Radius</span>
            </>
          )}
          step={1}
          marks={marks}
          onChange={handleSliderChange}
        />
        {googleApiKey ? <Map formData={formData} radius={formData?.radius || radiusValue} location={location} /> : <Spinner />}
      </div>
    </>
  );
};

GoogleMapRadius.defaultProps = {
  formData: {},
  location: {
    latitude: -36.889600,
    longitude: 174.792890,
  },
};

GoogleMapRadius.propTypes = {
  formData: PropTypes.shape({
    contentUrl: PropTypes.string,
    radius: PropTypes.number,
  }),
  location: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
  onChange: PropTypes.func.isRequired,
};

export default GoogleMapRadius;
