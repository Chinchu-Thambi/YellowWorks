import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'rebass/styled-components';

import tradesServices from './assets/trades-services.svg';
import automotive from './assets/automotive.svg';
import healthBeauty from './assets/health-beauty.svg';
import medical from './assets/medical.svg';
import foodDrink from './assets/food-drink.svg';
import travel from './assets/travel.svg';
import community from './assets/community.svg';
import retailShopping from './assets/retail-shopping.svg';

import { UpperFooterStyle } from './styledComponents';

export const BusinessCategories = ({ children }) => (
  <UpperFooterStyle state="true">
    <div>
      <h2>
        Popular business categories
        {/* <button
          type="button"
          onClick={toggle}
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab={toggleGALab}
        >
          <img src={arrowDown} alt={toggleArrowAlt} />
        </button> */}
      </h2>
    </div>
    { children }
  </UpperFooterStyle>
);

export const BusinessCategoriesContent = ({ theme }) => (
  <Flex
    justifyContent="center"
    mx="auto"
    width={theme.containerWidth}
    flexWrap="wrap"
  >
    <ul>
      <li>
        <a
          href="/auckland/trades-services?pop_category=true"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Business_Category_Trades_&_Services"
        >
          <img src={tradesServices} alt="trades-services" />
          <h3>Trades & services</h3>
        </a>
      </li>
      <li>
        <a
          href="/auckland/plumbers?pop_category=true"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Business_Category_Trades_&_Services_Plumbers"
        >
          Plumbers
        </a>
      </li>
      <li>
        <a
          href="/auckland/builders?pop_category=true"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Business_Category_Trades_&_Services_Builders"
        >
          Builders
        </a>
      </li>
      <li>
        <a
          href="/auckland/electricians?pop_category=true"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Business_Category_Trades_&_Services_Electricians"
        >
          Electricians
        </a>
      </li>
    </ul>
    <ul>
      <li>
        <a
          href="/auckland/automotive?pop_category=true"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Business_Category_Automotive"
        >
          <img src={automotive} alt="automotive" />
          <h3>Automotive</h3>
        </a>
      </li>
      <li>
        <a
          href="/auckland/automotive?pop_category=true"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Business_Category_Automotive_Repairs"
        >
          Repairs
        </a>
      </li>
      <li>
        <a
          href="/auckland/tyres?pop_category=true"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Business_Category_Automotive_Tyres"
        >
          Tyres
        </a>
      </li>
      <li>
        <a
          href="/auckland/dismantlers?pop_category=true"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Business_Category_Automotive_Dismantlers"
        >
          Dismantlers
        </a>
      </li>
    </ul>
    <ul>
      <li>
        <a
          href="/auckland/health-beauty?pop_category=true"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Business_Category_Health_&_Beauty"
        >
          <img src={healthBeauty} alt="health-beauty" />
          <h3>Health & beauty</h3>
        </a>
      </li>
      <li>
        <a
          href="/auckland/hairdressers?pop_category=true"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Business_Category_Health_&_Beauty_Hairdressers"
        >
          Hairdressers
        </a>
      </li>
      <li>
        <a
          href="/auckland/beauty-therapy?pop_category=true"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Business_Category_Health_&_Beauty_Beauty_Therapy"
        >
          Beauty therapy
        </a>
      </li>
      <li>
        <a
          href="/auckland/health-fitness-centres?pop_category=true"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Business_Category_Health_&_Beauty_Health_&_Fitness_Centres"
        >
          Health & fitness centres
        </a>
      </li>
    </ul>
    <ul>
      <li>
        <a
          href="/auckland/medical?pop_category=true"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Business_Category_Medical"
        >
          <img src={medical} alt="medical" />
          <h3>Medical</h3>
        </a>
      </li>
      <li>
        <a
          href="/auckland/dentists?pop_category=true"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Business_Category_Medical_Dentists"
        >
          Dentists
        </a>
      </li>
      <li>
        <a
          href="/auckland/pharmacies?pop_category=true"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Business_Category_Medical_Pharmacies"
        >
          Pharmacies
        </a>
      </li>
      <li>
        <a
          href="/auckland/medical-clinics?pop_category=true"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Business_Category_Medical_Medical_Clinics"
        >
          Medical clinics
        </a>
      </li>
    </ul>
    <ul>
      <li>
        <a
          href="/auckland/food-drink-dining?pop_category=true"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Business_Category_Food_&_Drink"
        >
          <img src={foodDrink} alt="food-drink" />
          <h3>Food & drink</h3>
        </a>
      </li>
      <li>
        <a
          href="/auckland/restaurants?pop_category=true"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Business_Category_Food_&_Drink_Restaurants"
        >
          Restaurants
        </a>
      </li>
      <li>
        <a
          href="/auckland/takeaway-foods?pop_category=true"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Business_Category_Food_&_Drink_Takeaway_Foods"
        >
          Takeaway foods
        </a>
      </li>
      <li>
        <a
          href="/auckland/cafes?pop_category=true"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Business_Category_Food_&_Drink_Cafes"
        >
          Cafes
        </a>
      </li>
    </ul>
    <ul>
      <li>
        <a
          href="/auckland/travel-accommodation?pop_category=true"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Business_Category_Travel"
        >
          <img src={travel} alt="travel" />
          <h3>Travel</h3>
        </a>
      </li>
      <li>
        <a
          href="/auckland/hotels?pop_category=true"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Business_Category_Travel_Hotel"
        >
          Hotel
        </a>
      </li>
      <li>
        <a
          href="/auckland/rental?pop_category=true"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Business_Category_Travel_Rental"
        >
          Rental
        </a>
      </li>
      <li>
        <a
          href="/auckland/motels-lodges?pop_category=true"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Business_Category_Travel_Motels_&_Lodges"
        >
          Motels & lodges
        </a>
      </li>
    </ul>
    <ul>
      <li>
        <a
          href="/auckland/community?pop_category=true"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Business_Category_Community"
        >
          <img src={community} alt="community" />
          <h3>Community</h3>
        </a>
      </li>
      <li>
        <a
          href="/auckland/justices-of-the-peace?pop_category=true"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Business_Category_Community_Justices_Of_The_Peace"
        >
          Justices of the peace
        </a>
      </li>
      <li>
        <a
          href="/auckland/information-centres?pop_category=true"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Business_Category_Community_Information_Centres"
        >
          Information centres
        </a>
      </li>
      <li>
        <a
          href="/auckland/churches?pop_category=true"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Business_Category_Community_Churches"
        >
          Churches
        </a>
      </li>
    </ul>
    <ul>
      <li>
        <a
          href="/auckland/retail-shopping?pop_category=true"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Business_Category_Retail_&_Shopping"
        >
          <img src={retailShopping} alt="retail-shopping" />
          <h3>Retail & shopping</h3>
        </a>
      </li>
      <li>
        <a
          href="/auckland/florists?pop_category=true"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Business_Category_Retail_&_Shopping_Florists"
        >
          Florists
        </a>
      </li>
      <li>
        <a
          href="/auckland/bookshops?pop_category=true"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Business_Category_Retail_&_Shopping_Bookshops"
        >
          Bookshops
        </a>
      </li>
      <li>
        <a
          href="/auckland/pet-shops?pop_category=true"
          data-ga="track"
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Footer_Clicks"
          data-ga-lab="Business_Category_Retail_&_Shopping_Pet_Shops"
        >
          Pet shops
        </a>
      </li>
    </ul>
  </Flex>
);

const themePropType = PropTypes.shape({
  containerWidth: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  ),
});

BusinessCategoriesContent.propTypes = {
  theme: themePropType.isRequired,
};

BusinessCategories.propTypes = {
  children: PropTypes.node.isRequired,
};
