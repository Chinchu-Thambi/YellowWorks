import React from 'react';

import {
  Wrapper, Heading, CategoryOption, CategoryPlan, CategoryIcon, CategoryDescription, BannerVideo, Categories,
} from './CategoryBoost.styled';

// Icons
import StarGoldIcon from '../../../../../../../assets/icons/gold-boost-star.svg';
import StarSilverIcon from '../../../../../../../assets/icons/silver-boost-star.svg';
import StarBronzeIcon from '../../../../../../../assets/icons/bronze-boost-star.svg';
import ExampleVideo from '../../../../../../../assets/videos/category-boost-example.mp4';

const CategoryBoost = () => (
  <Wrapper>
    <BannerVideo>
      <video autoPlay>
        <source src={ExampleVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </BannerVideo>
    <Heading>Here are your Category Boost options:</Heading>
    <Categories>
      <CategoryOption>
        <CategoryPlan>
          <h2>Gold</h2>
          <CategoryIcon src={StarGoldIcon} alt="Gold" />
        </CategoryPlan>
        <CategoryDescription>
          Category search results are visible above profiles with Silver & Bronze Category Boosts
        </CategoryDescription>
      </CategoryOption>
      <CategoryOption>
        <CategoryPlan>
          <h2>Silver</h2>
          <CategoryIcon src={StarSilverIcon} alt="Silver" />
        </CategoryPlan>
        <CategoryDescription>
          Category search results are visible above profiles with Bronze Category Boosts
        </CategoryDescription>
      </CategoryOption>
      <CategoryOption>
        <CategoryPlan>
          <h2>Bronze</h2>
          <CategoryIcon src={StarBronzeIcon} alt="Bonrze" />
        </CategoryPlan>
        <CategoryDescription>
          Category search results are visible above profiles with no Category Boosts
        </CategoryDescription>
      </CategoryOption>
      <CategoryOption>
        <CategoryPlan>
          <h2>No Boost</h2>
        </CategoryPlan>
        <CategoryDescription>
          Category search results are visible below profiles with Gold, Silver & Bronze Category Boosts
        </CategoryDescription>
      </CategoryOption>
    </Categories>
  </Wrapper>
);

export default CategoryBoost;
