import React from 'react';
import * as R from 'ramda';
import slugify from 'slugify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import BrowserFrame from '../../../../../components/BrowserFrame';
import Button from '../../../../../components/Button';

import BusinessContext from '../../../../MyYellow/services/BusinessContext';
import ActionableNotice from '../../../../../components/ActionableNotice';

import { OneColumnContainer, TwoColumnContainer } from '../../../components/Containers';
import { IconButton } from '../../../components/IconButtons';

import WebsiteCover from './components/WebsiteCover';
import WebsiteInformation from './components/WebsiteInformation';
import WebsitePreview from './components/WebsitePreview';
import WebsiteGreeting from './components/WebsiteGreeting';
import WebsiteFAQs from './components/WebsiteFAQs';
import useSubscriptions from '../../../services/useSubscriptions';
import Spinner from '../../../../../components/Spinner';

const flattenSkuList = (flatSub) => R.flatten(
  [{ value: flatSub?.product?.sku }, ...(flatSub?.productOptions?.map(({ sku }) => ({ value: sku })) || [])],
);

const allowedCustomDomain = ['WEBSITES_ECOMMERCE', 'WEBSITES_ENHANCED'];
const allowedEcommFields = ['WEBSITES_ECOMMERCE'];

const sharedFieldsDisclaimer = `Changes you make here will be reflected across your entire Yellow profile,
including in any other Yellow products you have purchased.`;

const ManageWebsite = () => {
  const businessStore = React.useContext(BusinessContext) ?? {};
  const slug = R.path(['providerConfiguration', 'yellowWebsite', 'slug'])(businessStore);

  const { subscriptions, subsLoading } = useSubscriptions();
  const subscription = R.find(R.propEq('provider', 'WEBSITE'))(subscriptions || []);

  const skuList = subscription ? R.compose(
    R.filter(Boolean),
    R.defaultTo([]),
    flattenSkuList,
    R.pathOr([], ['orders', 'edges', 0, 'node']),
  )(subscription) : null;

  const status = subscription?.status;
  const url = slug ? `https://www.${slug}.yellow.nz` : 'https://www.yellow-basic.yellow.nz';

  const shopifyShopName = slugify(businessStore?.currentBusiness?.shopifyConfiguration?.shopName || 'example website');

  const visitSite = () => {
    window.open(url, '_blank');
  };

  const hasNotOnboarded = status === 'NEW' || !status;

  if (subsLoading) {
    return (
      <Spinner />
    );
  }

  if (!subscription) {
    return (
      <ActionableNotice
        action={{
          text: 'Check Yellow Website offer',
          to: '/our-solutions/website/',
        }}
        title="It looks like you don't have a website yet."
      />
    );
  }

  if (hasNotOnboarded) {
    return (
      <ActionableNotice
        action={{
          text: 'Setup website',
          to: `../../onboarding/${subscription.id}/1`,
        }}
        title="It looks like you haven't setup your website yet."
      />
    );
  }

  return (
    <div className="space-y-3">
      <OneColumnContainer
        title="Website Live Preview"
        actionButton={
          <IconButton onClick={visitSite} icon={<FontAwesomeIcon icon={faExternalLinkAlt} />} label="Visit" />
        }
      >
        <div className="w-full">
          <BrowserFrame
            url={url}
            displayURL={url}
            status={status}
            previewContent={businessStore.currentBusiness}
          />
        </div>
      </OneColumnContainer>
      <WebsitePreview />
      <WebsiteCover />
      <WebsiteInformation sharedFieldsDisclaimer={sharedFieldsDisclaimer} allowedCustomDomain={allowedCustomDomain} />
      {skuList?.some(({ value }) => allowedEcommFields.includes(value)) && (
        <>
          <WebsiteGreeting />
          <WebsiteFAQs />
          <TwoColumnContainer
            title="eCommerce"
            subtitle="Manage your eCommerce products, sales and fulfillment from your Shopify admin portal"
          >
            <div className="flex justify-end w-full">
              <Button variant="primary" href={`https://${shopifyShopName}.myshopify.com/admin`}>
                Go to your admin portal
              </Button>
            </div>
          </TwoColumnContainer>
        </>
      )}
    </div>
  );
};

export default ManageWebsite;
