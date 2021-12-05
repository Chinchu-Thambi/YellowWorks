import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '../Grid';
import theme from '../../util/theme';

import StepsBar from '../UI/StepsBarV2';

import {
  Loading,
  NewWizardWrapper,
  CleanDiv,
} from './Styled';

const Wizard = ({
  title,
  text,
  // sku,
  // homeLink,
  stepGroups,
  currentStepGroup,
  completeSteps,
  // totalSteps,
  children,
  disabled,
  basePath,
  // className,
// eslint-disable-next-line arrow-body-style
}) => {
  // const { allContentfulProducts } = usePurchase();
  // const product = allContentfulProducts?.find(R.propEq('sku', sku));
  return (
    <NewWizardWrapper>
      <StepsBar
        currentStepIndex={completeSteps}
        stepGroups={stepGroups}
        currentStepGroup={currentStepGroup}
        basePath={!disabled && basePath}
      />
      <Container
        as="section"
        width={theme.containerWidth}
        mx="auto"
        my={[3, 3, 3, 4]}
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <section className="overflow-hidden bg-base-100">
          <div
            className="flex flex-col space-y-4 p-3 sm:p-4 text-contrast-600 sm:flex-row md:space-y-0 sm:space-x-2"
          >
            <div className="flex-1">
              <div className="flex flex-col space-y-1 sm:space-y-2">
                <h2 className="text-lg font-bold">{title}</h2>
                <CleanDiv className="text-md text-contrast-300">{text}</CleanDiv>
              </div>
            </div>
            <div className="flex flex-3 md:w-3/4 justify-end">
              {!children ? (<Loading />) : children}
            </div>
            {/* {product
            && (
              <Feature
                key={product.sku}
                name={product.name}
                text={product.shortText}
                price={formatRecurringPrice(0, true)}
                featureText={parseMd(product.features && product.features.features)}
                product={product}
              />
            )} */}
          </div>
        </section>
      </Container>
    </NewWizardWrapper>
  );
};

Wizard.defaultProps = {
  title: '',
  text: '',
  // sku: '',
  // homeLink: '/my-yellow/my-products',
  completeSteps: 0,
  stepGroups: [],
  currentStepGroup: '',
  disabled: false,
  basePath: '',
};

Wizard.propTypes = {
  // sku: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]),
  // homeLink: PropTypes.string,
  completeSteps: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  stepGroups: PropTypes.arrayOf(PropTypes.string),
  currentStepGroup: PropTypes.string,
  disabled: PropTypes.bool,
  basePath: PropTypes.string,
};

export default Wizard;
