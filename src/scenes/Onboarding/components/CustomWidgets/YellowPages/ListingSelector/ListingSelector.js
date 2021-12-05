/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import Select from 'react-select';
import { Box, Text, Flex } from 'rebass/styled-components';
import ListingPreview from './components/ListingPreview';
import { theme, formatRecurringPrice } from '../../../../../../util';
import getAvailableListingOptions from './services/getAvailableListingOptions';
import Spinner from '../../../../../../components/Spinner';
import getPublishingDate from '../../../../../../services/getPublishingDate';

const transformToOption = ({ name, id }) => ({
  value: { name, id },
  label: name,
});

const ListingSelector = (props) => {
  const {
    title, description, formData, onChange, required,
  } = props;
  const localData = formData;
  const listings = getAvailableListingOptions(localData);

  const [listingType, setListingType] = React.useState(transformToOption(localData?.listingType || listings?.[1]).value);
  const currentSelectionIsValid = R.any(R.propEq('id', formData.listingType?.id))(listings);

  const price = R.find((x) => R.includes(listingType?.id || listings?.[1].id, x.id))(localData.book.product.pricingPlan);

  const id = title || description || Math.random();

  const publishDate = () => {
    const dateSegments = R.split(' ', getPublishingDate(
      localData?.book?.product?.printDeliveryDate,
      localData?.book?.product?.printLastBookingDate,
    ));
    return `${dateSegments?.[1]} ${dateSegments?.[2]}`;
  };

  const handleChange = (e) => {
    setListingType(e.value);
    onChange({
      ...formData,
      listingType: e.value,
    });
  };

  React.useEffect(() => {
    if (!currentSelectionIsValid) {
      onChange({
        ...formData,
        listingType: listings?.[1],
      });
      setListingType(listings?.[1]);
    }
  }, [currentSelectionIsValid, formData, listings, onChange]);


  if (!listings) { return <Spinner />; }
  return (
    <>
      <Box>
        {title && <h2>{title}</h2>}
        {description && <p>{description}</p>}
        <Select
          id={id}
          aria-label="Yellow Pages listing type"
          value={currentSelectionIsValid ? localData?.listingType?.value : listings?.[1].value}
          onChange={handleChange}
          required={required}
          options={listings?.map(transformToOption)}
          placeholder={listingType.name}
        />
      </Box>
      <p>{currentSelectionIsValid}</p>
      <h2>Preview</h2>
      <Flex alignItems="center" flexDirection="column" maxWidth="100%">
        <ListingPreview
          listingType={localData?.listingType?.id || listings?.[1].id}
          address={localData?.location?.address}
          name={localData?.name}
          primaryNumber={localData?.primaryPhoneNumber}
          secondaryNumber={localData?.additionalPhoneNumber}
          email={localData?.email}
          url={localData?.url}
        />
        <Text textAlign="left" fontStyle="italic" alignSelf="flex-end">*Preview is indicative only</Text>
        <Box
          p={[1, 2]}
          marginTop={3}
          sx={{
            borderRadius: theme.radii[2],
            border: `1px solid ${theme.palette.contrast[2]}`,
          }}
        >
          <Text as="h2" fontWeight={theme.fontWeight[1]} fontSize={theme.fontSizes[3]} my={1}>{formatRecurringPrice(price.amount / 100, true, false, true)}</Text>
          <Text as="p" my={1}><strong>Book:</strong> {localData?.book?.product?.printProductName}</Text>
          <Text as="p" my={1}><strong>Distribution Date:</strong> {publishDate()}</Text>
          <Text as="p" my={1}><strong>Category:</strong> {localData?.book?.classification.name}</Text>
        </Box>
      </Flex>
    </>
  );
};

ListingSelector.defaultProps = {
  formData: {
    book: {
      name: 'Auckland Yellow Pages',
      publishDate: 'March 2021',
      classification: { name: 'Beauty Therapy', id: 12365 },
    },
  },
  title: '',
  description: '',
  onChange: () => { },
  required: false,
};

ListingSelector.propTypes = {
  listingType: PropTypes.string.isRequired,
  formData: PropTypes.shape({
    book: PropTypes.shape({
      product: PropTypes.shape({
        name: PropTypes.string,
        publishDate: PropTypes.string,
        pricingPlan: PropTypes.arrayOf([]),
      }),
    }),
    name: PropTypes.string,
    email: PropTypes.string,
    url: PropTypes.string,
    primaryPhoneNumber: PropTypes.shape({
      areaCode: PropTypes.number,
      number: PropTypes.number,
    }),
    additionalPhoneNumber: PropTypes.shape({
      areaCode: PropTypes.number,
      number: PropTypes.number,
    }),
    listingType: PropTypes.string,
    location: PropTypes.shape({
      address: PropTypes.shape({
        placeId: PropTypes.string,
        streetNumber: PropTypes.string,
        streetAddress: PropTypes.string,
        floor: PropTypes.string,
        premise: PropTypes.string,
        subpremise: PropTypes.string,
        sublocality: PropTypes.string,
        locality: PropTypes.string,
        administrativeArea: PropTypes.string,
        postalCode: PropTypes.string,
      }),
    }),
    classification: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    ),
  }),
  title: PropTypes.string,
  description: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};

export default ListingSelector;
