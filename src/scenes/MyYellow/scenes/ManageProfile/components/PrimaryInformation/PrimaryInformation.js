import React from 'react';
import * as R from 'ramda';

import { PrimaryInfoCompany, PrimaryInfoCompanyLogo, ShowLocation } from './Styled';

import Placeholder from '../../../../../../assets/icons/placeholderLogo.jpg';
import webIcon from '../../../../../../assets/icons/light/web.svg';
import plusIcon from '../../../../../../assets/icons/light/plus.svg';
import callIcon from '../../../../../../assets/icons/light/call.svg';
import emailIcon from '../../../../../../assets/icons/light/email.svg';
import areasIcon from '../../../../../../assets/icons/light/areas.svg';
import locationIcon from '../../../../../../assets/icons/light/location.svg';
// import documentIcon from '../../../../../../assets/icons/light/document.svg'; // TODO: AFTER MVP

import formatUrl from '../../../../services/urlFormatter';

import Modal from '../../../../../../components/Modal';
import Switch from '../../../../../../components/Switch';
import BucketImage from '../../../../../../components/BucketImage';
import formatAddress from '../../../../../../services/formatAddress';

import {
  ListGroup,
  ListItem,
  OptionItem,
  OptionDetails,
  LabelItem,
  ActionButton,
} from '../../../../components/ListGroup';
import Card from '../../../../components/Card';
import ProductContext from '../../../../services/ProductContext';

// Modals
// @TODO: remove commented imports when the functionality is ready.
import Logo from '../modals/Logo';
import PhysicalLocation from '../modals/PhysicalLocation';
import EmailAddress from '../modals/EmailAddress';
import WebsiteURL from '../modals/WebsiteURL';
import TradingName from '../modals/TradingName';
import ServicingAreas from '../modals/ServicingAreas';
import AllNumbers from '../modals/AllNumbers';

import LegalBusinessName from './components/LegalBusinessName';
import FaxNumber from './components/FaxNumber';

const pathHasMap = ['location', 'hasMap'];

const PrimaryInformation = () => {
  const productState = React.useContext(ProductContext) || {};

  const [isVisible, setIsVisible] = React.useState(false);
  const [modalContent, setModalContent] = React.useState();
  const [modalTitle, setModalTitle] = React.useState();
  const [isLocked, setIsLocked] = React.useState(false);
  const showLocation = productState?.formData?.location?.hasMap;

  const renderModalContent = ({ title, component }) => {
    setModalTitle(title);
    setModalContent(component);

    // Display modal
    setIsVisible(true);
  };

  const dismissModal = () => {
    setIsVisible(false);
  };

  const handleHasMapChange = async () => {
    if (isLocked) return;

    setIsLocked(true);
    await productState.saveData({
      path: pathHasMap,
      data: !showLocation,
    });
    setIsLocked(false);
  };

  return (
    <>
      <Card>
        <h2>Edit your profile info</h2>

        <PrimaryInfoCompany>
          <PrimaryInfoCompanyLogo
            onClick={() => renderModalContent({
              title: 'Business Logo',
              component: () => (
                <Logo
                  onDismiss={dismissModal}
                />
              ),
            })}
          >
            {productState?.formData?.businessProfile?.logo?.contentUrl === undefined
              ? <img src={Placeholder} alt="Click here to add a logo" className="placeholder" />
              : <BucketImage contentUrl={productState?.formData?.businessProfile?.logo?.contentUrl} />}
          </PrimaryInfoCompanyLogo>

          <ListGroup>
            <ListItem>
              <OptionItem>
                <LabelItem>Trading name</LabelItem>
                <div>
                  <ActionButton
                    variant="link"
                    size="sm"
                    onClick={() => renderModalContent({
                      title: 'Trading name',
                      component: () => (
                        <TradingName
                          onDismiss={dismissModal}
                        />
                      ),
                    })}
                  >
                    Edit
                  </ActionButton>
                </div>
              </OptionItem>
              <div>{R.path(['formData', 'businessProfile', 'name'])(productState)}</div>
            </ListItem>

            <LegalBusinessName />

            {/* AFTER MVP <ListItem>
              <OptionItem>
                <LabelItem>Other names you are known by</LabelItem>
                <div>
                  <ActionButton onClick={() => {}} variant="link" size="sm">Edit</ActionButton>
                </div>
              </OptionItem>
              <p>The B Cafe</p>
            </ListItem> */}

          </ListGroup>
        </PrimaryInfoCompany>

        <ListGroup>
          <ListItem>
            <OptionItem>
              <LabelItem icon={locationIcon}>Physical location</LabelItem>

              <div>
                <ActionButton
                  variant="link"
                  size="sm"
                  onClick={() => renderModalContent({
                    title: 'Physical location',
                    component: () => (
                      <PhysicalLocation
                        onDismiss={dismissModal}
                      />
                    ),
                  })}
                >
                  Edit
                </ActionButton>
              </div>
            </OptionItem>

            {productState.formData && productState.formData.location
              && productState.formData.location.address && (
                <OptionDetails>
                  {formatAddress(productState.formData.location.address)}
                </OptionDetails>
            )}
          </ListItem>

          <ListItem>
            <OptionItem>
              <LabelItem icon={locationIcon}>Show your physical location?</LabelItem>
              <div>
                <ShowLocation>
                  <Switch
                    name="hasMap"
                    label="hasMap"
                    defaultValue="hasMap"
                    checked={showLocation}
                    options={['yes', 'no']}
                    onToggle={handleHasMapChange}
                  />
                </ShowLocation>
              </div>
            </OptionItem>
          </ListItem>

          <ListItem>
            <OptionItem>
              <LabelItem icon={areasIcon}>Service areas</LabelItem>
              <div>
                {/* TODO: Add save button and handle onChange */}
                <ActionButton
                  variant="link"
                  size="sm"
                  onClick={() => renderModalContent({
                    title: 'Service areas',
                    component: () => (
                      <ServicingAreas
                        onDismiss={dismissModal}
                      />
                    ),
                  })}
                >
                  {productState?.formData?.location?.areaServed
                    ? 'Edit'
                    : (
                      <img src={plusIcon} alt="add" />
                    )}
                </ActionButton>
              </div>
            </OptionItem>
            <OptionDetails>
              {productState?.formData?.location?.areaServed?.region
                && !productState?.formData?.location?.areaServed?.city && (
                  <>
                    {(
                      Array.isArray(productState.formData.location.areaServed.region)
                      && productState.formData.location.areaServed.region.length === 1
                    ) ? 'Region' : 'Regions'}:
                    <ul>
                      {Array.isArray(productState.formData.location.areaServed.region)
                        ? productState?.formData?.location?.areaServed?.region.map((a) => <li key={a.name}>{a.name}</li>)
                        : <li>{productState.formData.location.areaServed.region.name}</li>}
                    </ul>
                  </>
                )}
              {productState?.formData?.location?.areaServed?.city
                && !productState?.formData?.location?.areaServed?.suburb && (
                  <>
                    {(
                      Array.isArray(productState.formData.location.areaServed.city)
                      && productState.formData.location.areaServed.city.length === 1
                    ) ? 'City/Town' : 'Cities/Towns'}:
                    <ul>
                      {Array.isArray(productState.formData.location.areaServed.city)
                        ? productState?.formData?.location?.areaServed?.city.map((a) => <li key={a.name}>{a.name}</li>)
                        : <li>{productState.formData.location.areaServed.city.name}</li>}
                    </ul>
                  </>
                )}
              {productState?.formData?.location?.areaServed?.suburb && (
                <>
                  {(
                    Array.isArray(productState.formData.location.areaServed.city)
                    && productState.formData.location.areaServed.city.length === 1
                  ) ? 'Suburb' : 'Suburbs'}:
                  <ul>
                    {Array.isArray(productState.formData.location.areaServed.suburb)
                      ? productState?.formData?.location?.areaServed?.suburb.map((a) => <li key={a.name}>{a.name}</li>)
                      : <li>{productState.formData.location.areaServed.suburb.name}</li>}
                  </ul>
                </>
              )}
            </OptionDetails>
          </ListItem>
          <ListItem>
            <OptionItem>
              <LabelItem icon={callIcon}>Phone Numbers</LabelItem>
              <div>
                <ActionButton
                  variant="link"
                  size="sm"
                  onClick={() => renderModalContent({
                    title: 'Phone numbers',
                    component: () => (
                      <AllNumbers
                        onDismiss={dismissModal}
                        canClear
                      />
                    ),
                  })}
                >
                  Edit
                </ActionButton>
              </div>
            </OptionItem>
            {/* Primary Telephone */}
            {R.path(['formData', 'location', 'telephone'])(productState) && (
              <OptionDetails>
                {R.path(['formData', 'location', 'telephone', 'areaCode'])(productState) && '0'}
                {R.path(['formData', 'location', 'telephone', 'areaCode'])(productState)}
                {R.path(['formData', 'location', 'telephone', 'number'])(productState)}
              </OptionDetails>
            )}
            {/* Mobile Number */}
            {R.path(['formData', 'location', 'mobileNumber', 'areaCode'])(productState) && (
              <OptionDetails>
                0
                {R.path(['formData', 'location', 'mobileNumber', 'areaCode'])(productState)}
                {R.path(['formData', 'location', 'mobileNumber', 'number'])(productState)}
              </OptionDetails>
            )}
            {/* Toll Free Number */}
            {R.path(['formData', 'location', 'tollFreeNumber', 'areaCode'])(productState) && (
              <OptionDetails>
                0
                {R.path(['formData', 'location', 'tollFreeNumber', 'areaCode'])(productState)}
                {R.path(['formData', 'location', 'tollFreeNumber', 'number'])(productState)}
              </OptionDetails>
            )}
            {/* Alternate Numbers */}
            {R.path(['formData', 'location', 'contactPoint'])(productState)
              && R.path(['formData', 'location', 'contactPoint'])(productState)?.map((contact) => (
                <OptionDetails>
                  0{contact.telephone.areaCode}{contact.telephone.number}
                </OptionDetails>
              ))}
          </ListItem>
          <FaxNumber />
          <ListItem>
            <OptionItem>
              <LabelItem icon={emailIcon}>Email address</LabelItem>
              <div>
                <ActionButton
                  variant="link"
                  size="sm"
                  onClick={() => renderModalContent({
                    title: 'Email address',
                    component: () => (
                      <EmailAddress
                        onDismiss={dismissModal}
                      />
                    ),
                  })}
                >
                  Edit
                </ActionButton>
              </div>
            </OptionItem>
            <OptionDetails>{R.path(['formData', 'location', 'email'])(productState)}</OptionDetails>
          </ListItem>

          <ListItem>
            <OptionItem>
              <LabelItem icon={webIcon}>Website URL</LabelItem>
              <div>
                <ActionButton
                  variant="link"
                  size="sm"
                  onClick={() => renderModalContent({
                    title: 'Website URL',
                    component: () => (
                      <WebsiteURL
                        onDismiss={dismissModal}
                      />
                    ),
                  })}
                >
                  Edit
                </ActionButton>
              </div>
            </OptionItem>
            <OptionDetails>{formatUrl(R.path(['formData', 'businessProfile', 'url'])(productState))}</OptionDetails>
          </ListItem>

        </ListGroup>

        <Modal
          title={modalTitle}
          isVisible={isVisible}
          onDismiss={setIsVisible}
        >
          {modalContent}
        </Modal>
      </Card>
    </>
  );
};

export default PrimaryInformation;
