import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'rebass/styled-components';
import * as R from 'ramda';

import locationIcon from '../../../../../../assets/icons/light/location-dark.svg';
import warningIcon from '../../../../../../assets/icons/warning.svg';
import Button from '../../../../../../components/Button';

import ServicingAreas from '../../../ManageProfile/components/modals/ServicingAreas';

import {
  getFirstPricingPlan, formatPricingPlanAmount, // getTotalFromSubscription,
} from '../../../../../../services/getPricingPlans';
import {
  FormControlSelect, CategoryBoostSection, Region, CategoryBoosts, Warning, FullWidthWrapper, StyledSection,
} from '../../Styled';
import CategoryBoost from '../modals/CategoryBoosts/CategoryBoost';

const shortenName = (name, section) => name.split(' ')?.[section || 0];

const ManageCategoryBoosts = (props) => {
  const {
    renderModalContent,
    dismissModal,
    handleBoostChange,
    mergedOptionPairings,
    selectableOptions,
    planChangesPending,
    disableInputs,
  } = props;

  const priceSort = R.sortWith([
    R.ascend((o) => getFirstPricingPlan(o)?.amount),
  ]);
  const sortedOptions = priceSort(selectableOptions);

  return (
    <>
      <StyledSection justifyContent="space-between">
        <div>
          <h3>
            CATEGORY BOOSTS
          </h3>
        </div>
        <Button
          variant="link"
          size="sm"
          onClick={() => renderModalContent({
            title: 'Category Boosts let your business appear higher in searches on Yellow',
            component: () => <CategoryBoost />,
          })}
        >
          Learn More
        </Button>
      </StyledSection>
      <CategoryBoosts>
        {mergedOptionPairings.length === 0 && (
          <FullWidthWrapper>
            <Warning onClick={() => renderModalContent({
              title: 'Service areas',
              component: () => (
                <ServicingAreas
                  onDismiss={dismissModal}
                />
              ),
            })}
            >
              <img src={warningIcon} alt="Warning" />
              <p>
                You don&apos;t have any service areas selected.
                Please click here to add service areas to your listing.
              </p>
            </Warning>
          </FullWidthWrapper>
        )}
        {mergedOptionPairings?.map((pairing) => {
          const configuration = pairing?.configuration?.productAttributes?.boosts?.[0];
          return (
            <CategoryBoostSection
              key={`${configuration?.category?.name}-${configuration?.region?.name}-${configuration?.boost}`}
              active={!!pairing.sku && !planChangesPending}
            >
              <Flex paddingRight={1}>
                <img src={locationIcon} alt="" />
                <p>{configuration?.category?.name}</p>
              </Flex>
              <Region>{configuration?.region?.name}</Region>
              <FormControlSelect
                id="boost"
                aria-label="Category Boost"
                disabled={disableInputs}
                value={pairing.sku || ''}
                onChange={(e) => handleBoostChange(e, pairing?.id, configuration?.replaceId, pairing.sku, configuration)}
                required
              >
                <option value="">$0.00 - No Boost</option>
                {sortedOptions?.map((boostOption) => {
                  const pricingPlan = getFirstPricingPlan(boostOption);
                  return (
                    <option
                      key={boostOption.sku}
                      value={boostOption.sku}
                    >{formatPricingPlanAmount(pricingPlan)} - {shortenName(boostOption.name)}
                    </option>
                  );
                })}
              </FormControlSelect>
            </CategoryBoostSection>
          );
        }
        )}
      </CategoryBoosts>
    </>
  );
};

ManageCategoryBoosts.defaultProps = {
  renderModalContent: () => { },
  dismissModal: () => { },
  handleBoostChange: () => { },
  mergedOptionPairings: [],
  selectableOptions: [],
  planChangesPending: true,
  disableInputs: true,
};

ManageCategoryBoosts.propTypes = {
  renderModalContent: PropTypes.func,
  dismissModal: PropTypes.func,
  handleBoostChange: PropTypes.func,
  mergedOptionPairings: PropTypes.arrayOf(PropTypes.shape({})),
  selectableOptions: PropTypes.arrayOf(PropTypes.shape({})),
  planChangesPending: PropTypes.bool,
  disableInputs: PropTypes.bool,
};

export default ManageCategoryBoosts;
