import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'rebass/styled-components';
import styled from 'styled-components';

// Icons
import VisaIcon from '../../../../../../assets/icons/visa.svg';
import MastercardIcon from '../../../../../../assets/icons/mastercard.svg';

import Button from '../../../../../../components/Button';
import Modal from '../../../../../../components/Modal';
import Spinner from '../../../../../../components/Spinner';

import Card from '../../../../components/Card';

import CreditCardDetailsForm from '../modals/CreditCardDetailsForm';

const ImageLogo = styled.img`
  width: ${({ theme }) => theme.space[6]};
`;

const ButtonStyled = styled(Button)`
  padding-left: 0;
  padding-right: 0;
`;

const PaymentBrandLogo = ({ brand }) => {
  const cardSrc = {
    VISA: VisaIcon,
    MASTERCARD: MastercardIcon,
  };


  if (brand) {
    const src = cardSrc[brand.toUpperCase()];

    return (
      <div>
        <ImageLogo src={src} alt={brand} />
      </div>
    );
  }
  return null;
};

PaymentBrandLogo.propTypes = {
  brand: PropTypes.string.isRequired,
};

const PaymentDetails = ({
  cardData, errors, isLoading, reloadDetails, billingData,
}) => {
  const [isVisible, setModalVisibility] = React.useState(false);

  return (
    <>
      <Card>
        <h2>Payment details</h2>
        {isLoading && <Spinner />}

        {!isLoading && !errors && (
          <>
            {billingData && (
              <>
                <h4>Account number</h4>
                <p>{billingData.id}</p>
              </>
            )}

            {cardData && cardData.brand && (
              <>
                <Flex alignItems="center">
                  <h4>Payment method</h4>
                  <Button
                    size="sm"
                    variant="link"
                    onClick={() => setModalVisibility(true)}
                  >Edit
                  </Button>
                </Flex>
                <PaymentBrandLogo brand={cardData.brand} />
                <p>XXXX-XXXX-XXXX-{cardData.lastDigits}</p>
                <p>Exp {cardData.expirationMonth}-{cardData.expirationYear}</p>
              </>
            )}

            {cardData && !cardData.brand && (
              <>
                <h4>Pay by Credit Card?</h4>
                <p>Would you like to register a Credit Card as your payment method with Yellow?</p>
                <ButtonStyled
                  size="sm"
                  variant="link"
                  onClick={() => setModalVisibility(true)}
                >Add new
                </ButtonStyled>
              </>
            )}
          </>
        )}

        {!isLoading && errors && (
          <>
            <p>An error occurred while trying to fetch payment details.</p>
            <p>If the problem persists, contact support.</p>
          </>
        )}
      </Card>

      <Modal
        title="Your credit card details"
        isVisible={isVisible}
        onDismiss={setModalVisibility}
      >
        <CreditCardDetailsForm onSave={() => {
          reloadDetails();
          setModalVisibility(false);
        }}
        />
      </Modal>
    </>
  );
};

PaymentDetails.defaultProps = {
  cardData: {},
  errors: null,
  isLoading: true,
  reloadDetails: () => {},
  billingData: null,
};

PaymentDetails.propTypes = {
  billingData: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
  }),
  cardData: PropTypes.shape({
    brand: PropTypes.string,
    expirationMonth: PropTypes.number,
    expirationYear: PropTypes.number,
    lastDigits: PropTypes.string,
  }),
  errors: PropTypes.arrayOf(
    PropTypes.shape({}),
  ),
  isLoading: PropTypes.bool,
  reloadDetails: PropTypes.func,
};

export default PaymentDetails;
