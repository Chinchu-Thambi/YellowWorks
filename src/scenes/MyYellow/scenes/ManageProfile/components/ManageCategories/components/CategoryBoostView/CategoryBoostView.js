import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'rebass';

import StarPlatinumIcon from '../../../../../../../../assets/icons/platinum-boost-star.svg';
import StarGoldIcon from '../../../../../../../../assets/icons/gold-boost-star.svg';
import StarSilverIcon from '../../../../../../../../assets/icons/silver-boost-star.svg';
import StarBronzeIcon from '../../../../../../../../assets/icons/bronze-boost-star.svg';

import { ActionButton } from '../../../../../../components/ListGroup';

import { BoostWrapper, CategoryTitle } from '../../ManageCategories.styled';

import CategoryBoostEdit from '../CategoryBoostEdit';

const imageMap = {
  PLATINUM: StarPlatinumIcon,
  GOLD: StarGoldIcon,
  SILVER: StarSilverIcon,
  BRONZE: StarBronzeIcon,
};

const CategoryBoost = ({
  categoryLevel,
}) => (imageMap[categoryLevel] ? (
  <Flex alignItems="center" width={1}>
    <img src={imageMap[categoryLevel]} alt="Boost Level" />
    <p><strong>{categoryLevel}</strong>Category Boost</p>
  </Flex>
) : null);

CategoryBoost.defaultProps = {
  categoryLevel: '',
};

CategoryBoost.propTypes = {
  categoryLevel: PropTypes.string,
};


const CategoryBoostView = ({ formData, renderModalContent, dismissModal }) => (
  <>
    <h5>Category Boost</h5>
    <Flex alignItems="center" justifyContent="space-between" width={1}>
      {formData?.productAttributes?.boosts && formData?.productAttributes?.boosts.length > 0 && (
        <BoostWrapper>
          {formData?.productAttributes?.boosts?.map(({ category, boost, region }, index) => (
            <React.Fragment key={`${category?.id}${region?.id}${boost}`}>
              <Flex alignItems="center" justifyContent="space-between">
                <CategoryBoost categoryLevel={boost} categoryName={category.name} />
                <ActionButton
                  onClick={() => renderModalContent({
                    title: 'Category Boost',
                    component: () => (
                      <CategoryBoostEdit
                        index={index}
                        onDismiss={dismissModal}
                      />
                    ),
                  })}
                  variant="link"
                  size="sm"
                >Edit
                </ActionButton>
              </Flex>
              <CategoryTitle>{category.name}, {region?.name}</CategoryTitle>
            </React.Fragment>
          ))}
        </BoostWrapper>
      )}
    </Flex>
  </>
);

CategoryBoostView.defaultProps = {
  formData: {},
};

CategoryBoostView.propTypes = {
  formData: PropTypes.shape({
    productAttributes: PropTypes.shape({
      boosts: PropTypes.arrayOf(
        PropTypes.shape({
          category: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
          }),
          boost: PropTypes.string,
          region: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
          }),
        }),
      ),
    }),
  }),
  renderModalContent: PropTypes.func.isRequired,
  dismissModal: PropTypes.func.isRequired,
};

export default CategoryBoostView;
