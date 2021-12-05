import React from 'react';
import PropTypes from 'prop-types';

const ServiceAreaLine = (props) => {
  const { areaServed } = props;
  const { region, city, suburb } = areaServed || {};

  return (
    <address>
      {Array.isArray(region) && (
        <>
          {region.length === 1 && (
            <>
              {region[0].name}
            </>
          )}
          {region.length > 1 && (
            <>
              Servicing in {region.length} regions, including {region[0].name}
            </>
          )}
        </>
      )}
      {Array.isArray(city) && (
        <>
          {city.length === 1 && (
            <>
              {city[0].name}
            </>
          )}
          {city.length > 1 && (
            <>
              Servicing in {city.length} cities in {region.name}
            </>
          )}
        </>
      )}
      {Array.isArray(suburb) && (
        <>
          {suburb.length === 1 && (
            <>
              {suburb[0].name}
            </>
          )}
          {suburb.length > 1 && (
            <>
              Servicing in {suburb.length} suburbs in {city.name}
            </>
          )}
        </>
      )}
    </address>
  );
};

ServiceAreaLine.defaultProps = {
  areaServed: {
    region: {},
    city: {},
    suburb: {},
  },
};

ServiceAreaLine.propTypes = {
  areaServed: PropTypes.shape({
    region: PropTypes.oneOfType([
      PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.number,
      }),
      PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          id: PropTypes.number,
        }),
      ),
    ]),
    city: PropTypes.oneOfType([
      PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.number,
      }),
      PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          id: PropTypes.number,
        }),
      ),
    ]),
    suburb: PropTypes.oneOfType([
      PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.number,
      }),
      PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          id: PropTypes.number,
        }),
      ),
    ]),
  }),
};

export default ServiceAreaLine;
