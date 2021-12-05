import React from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { Flex, Text, Box } from 'rebass/styled-components';
import { theme, formatRecurringPrice } from '../../../../../util';

// import Spinner from '../../../../../components/Spinner';
import ListingPreview from './ListingSelector/components/ListingPreview';
import getPublishingDate from '../../../../../services/getPublishingDate';
import usePurchase from '../../../../../services/usePurchase';

const YellowPagesConfirm = (props) => {
  const {
    formData,
  } = props;
  const { initiatePurchase } = usePurchase();
  const [submitted, setSubmitted] = React.useState(false);
  const { product: book, classification } = formData.book;
  const publishDate = () => {
    const dateSegments = R.split(' ', getPublishingDate(
      book?.printDeliveryDate,
      book?.printLastBookingDate,
    ));
    return `${dateSegments?.[1]} ${dateSegments?.[2]}`;
  };
  const price = R.find((x) => R.includes(formData?.listingType.id, x.id))(book.pricingPlan);

  React.useEffect(() => {
    if (book && price && !submitted) {
      setSubmitted(true);
      initiatePurchase({
        product: {
          sku: book.sku,
          pricingPlan: price,
        },
      });
    }
  }, [book, initiatePurchase, price, setSubmitted, submitted]);
  return (
    <div className="p-2">
      <Flex alignItems="center" flexDirection="column">
        <ListingPreview
          listingType={formData?.listingType.id}
          address={formData?.location?.address}
          name={formData?.name}
          primaryNumber={formData?.primaryPhoneNumber}
          secondaryNumber={formData?.additionalPhoneNumber}
          email={formData?.email}
          url={formData?.url}
        />
        <Text textAlign="left" fontStyle="italic" alignSelf="flex-end">*Preview is indicative only</Text>
      </Flex>
      <Box
        marginTop={3}
        paddingBottom={3}
      >
        <Text as="h2" fontWeight={theme.fontWeight[1]} fontSize={theme.fontSizes[3]} my={1}>{formatRecurringPrice(price.amount / 100, true, false, true)}</Text>
        <Text as="p" my={1}><strong>Book:</strong> {book?.printProductName}</Text>
        <Text as="p" my={1}><strong>Distribution Date:</strong> {publishDate()}</Text>
        <Text as="p" my={1}><strong>Category:</strong> {classification.name}</Text>
      </Box>
      <Box>
        <Text as="p">Your new <strong>Yellow Print</strong> listing is illustrated above.</Text>
        <Text as="p">The listing would be published in the <strong>{book?.name}</strong>, under the category <strong>{classification.name}</strong>, scheduled for distribution in <strong>{publishDate()}</strong>.</Text>
      </Box>
    </div>
  );
};

YellowPagesConfirm.defaultProps = {
  formData: {
    book: {
      name: 'Auckland Yellow Pages',
      publishDate: 'March 2021',
      classification: 'Cafe',
    },
  },
};

YellowPagesConfirm.propTypes = {
  formData: PropTypes.shape({
    book: PropTypes.shape({
      product: PropTypes.shape({}),
      classification: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
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
};

export default YellowPagesConfirm;
