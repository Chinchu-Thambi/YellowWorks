import React from 'react';
import * as R from 'ramda';

import Card from '../../../../components/Card';
import {
  ListGroup, ListItem, OptionItem, OptionDetails, ActionButton, LabelItem,
} from '../../../../components/ListGroup';
import Modal from '../../../../../../components/Modal';
import Switch from '../../../../../../components/Switch';

import calendarIcon from '../../../../../../assets/icons/light/calendar.svg';
import wifiIcon from '../../../../../../assets/icons/light/wi-fi.svg';
import locationIcon from '../../../../../../assets/icons/light/location.svg';
// import paymentIcon from '../../../../../../assets/icons/light/payment.svg';
// import associationIcon from '../../../../../../assets/icons/light/association.svg';

import ProductContext from '../../../../services/ProductContext';

import YearEstablished from '../modals/YearEstablished';
import Parking from '../modals/Parking';
import Associations from './components/Associations';
import TeamMembers from './components/TeamMembers';
import SocialMediaLinks from './components/SocialMediaLinks';

import { PremiumIcon } from '../PremiumOnly';
import { SwitchWrapper } from './AdditionalInfoTab.styled';

const AdditionalInfoTab = () => {
  const productState = React.useContext(ProductContext) || {};
  const [isVisible, setIsVisible] = React.useState(false);
  const [isLocked, setIsLocked] = React.useState(false);
  const [modalContent, setModalContent] = React.useState();
  const [modalTitle, setModalTitle] = React.useState();

  const amenities = productState?.formData?.location?.amenityFeature;
  const orderDetails = productState?.orderDetails;
  const hasWifi = amenities ? R.find(R.propEq('name', 'Free Wi-Fi'))(amenities)?.value : false;
  const parking = amenities ? R.find(R.propEq('name', 'Parking'))(amenities)?.value : [];
  const amenitiesPath = ['location', 'amenityFeature'];

  const sku = orderDetails?.userSchema?.metadata?.sku;
  const isPremium = sku && sku.some((s) => s.value.startsWith('YPPREMIUM'));

  const renderModalContent = ({ title, component }) => {
    setModalTitle(title);
    setModalContent(component);

    // Display modal
    setIsVisible(true);
  };

  const dismissModal = () => {
    setIsVisible(false);
  };

  const yearEstablished = R.path(['formData', 'businessProfile', 'foundingDate'])(productState)?.substr(0, 4);

  const handleHasWifiChange = async (value) => {
    if (isLocked) return;
    setIsLocked(true);
    await productState.saveData({
      path: amenitiesPath,
      data: [
        { name: 'Free Wi-Fi', value },
        { name: 'Parking', value: parking },
      ],
    });
    setIsLocked(false);
  };

  return (
    <Card>
      <h2>Edit your additional info</h2>
      <ListGroup>
        <TeamMembers />
        {/* <ListItem>
          <OptionItem>
            <LabelItem icon={associationIcon}>Associations</LabelItem>
            <div>
              <ActionButton
                onClick={() => renderModalContent({
                  title: 'Trading name',
                  component: () => (
                    <TradingName
                      onDismiss={dismissModal}
                    />
                  ),
                })}
                variant="link"
                size="sm"
              >Edit
              </ActionButton>
            </div>
          </OptionItem>
          <OptionDetails>Associations</OptionDetails>
        </ListItem> */}

        {/* <ListItem>
          <OptionItem>
            <LabelItem icon={locationIcon}>Postal address</LabelItem>
            <div>
              <ActionButton
                onClick={() => renderModalContent({
                  title: 'Postal address',
                  component: () => (
                    <PostalAddress
                      onDismiss={dismissModal}
                    />
                  ),
                })}
                variant="link"
                size="sm"
              >Edit
              </ActionButton>
            </div>
          </OptionItem>
          <OptionDetails>{R.path(['formData', 'businessProfile', 'postalAddress'])(productState)}</OptionDetails>
        </ListItem> */}

        {/* <ListItem>
          <OptionItem>
            <LabelItem icon={paymentIcon}>Payment methods</LabelItem>
            <div>
              <ActionButton onClick={() => { }} variant="link" size="sm">Edit</ActionButton>
            </div>
          </OptionItem>
          <OptionDetails>{R.path(['formData', 'businessProfile', 'postalAddress'])(productState)}</OptionDetails>
        </ListItem> */}

        <ListItem>
          <OptionItem>
            <LabelItem icon={wifiIcon}>Free wifi available
              <PremiumIcon />
            </LabelItem>
            <SwitchWrapper>
              <Switch
                name="hasWifi"
                label="hasWifi"
                defaultValue="hasWifi"
                checked={hasWifi}
                options={['yes', 'no']}
                onToggle={(e) => handleHasWifiChange(e)}
                disabled={!isPremium}
              />
            </SwitchWrapper>
          </OptionItem>
        </ListItem>

        <ListItem>
          <OptionItem>
            <LabelItem icon={locationIcon}>Parking</LabelItem>
            <div>
              <ActionButton
                onClick={() => renderModalContent({
                  title: 'Parking',
                  component: () => (
                    <Parking
                      onDismiss={dismissModal}
                      isPremium={isPremium}
                    />
                  ),
                })}
                variant="link"
                size="sm"
              >Edit
              </ActionButton>
            </div>
          </OptionItem>
          {parking && parking.map((option) => <OptionDetails>{option}</OptionDetails>)}
        </ListItem>

        <ListItem>
          <OptionItem>
            <LabelItem icon={calendarIcon}>Year established</LabelItem>
            <div>
              <ActionButton
                onClick={() => renderModalContent({
                  title: 'Year Established',
                  component: () => (
                    <YearEstablished
                      onDismiss={dismissModal}
                    />
                  ),
                })}
                variant="link"
                size="sm"
              >Edit
              </ActionButton>
            </div>
          </OptionItem>
          <OptionDetails>{yearEstablished}</OptionDetails>
        </ListItem>

        <SocialMediaLinks />

        <Associations />
      </ListGroup>
      <Modal
        title={modalTitle}
        isVisible={isVisible}
        onDismiss={setIsVisible}
      >
        {modalContent}
      </Modal>
    </Card>
  );
};

export default AdditionalInfoTab;
