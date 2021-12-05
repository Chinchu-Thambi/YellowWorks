import React from 'react';
import * as R from 'ramda';
import BusinessContext from '../../../MyYellow/services/BusinessContext';
import Modal from '../../../../components/Modal';

import businessDetailsImage from './assets/images/businessDetails.svg';
import expertImage from './assets/images/expert.svg';
import insightsImage from './assets/images/insights.svg';
import knowledgeImage from './assets/images/knowledge.svg';
import productsImage from './assets/images/products.svg';
import reviewsImage from './assets/images/reviews.svg';
import leftHeaderImage from './assets/images/headerLeft.svg';
import rightHeaderImage from './assets/images/headerRight.svg';
import yellowBusinessLight from './assets/images/light/yellow-business-light.svg';
import yellowArrow from '../../../../assets/icons/yellow-arrow.svg';

import DashboardBlock from './components/DashboardBlock';
import ProductsModalContent from './components/ProductsModalContent';
import DigitalPerformanceModalContent from './components/DigitalPerformanceModalContent';

const Dashboard = () => {
  const {
    currentBusiness, businessId,
  } = React.useContext(BusinessContext) || {};
  const [visible, setVisible] = React.useState([]);

  const handleClick = (props) => {
    if (R.includes(props, visible)) {
      setVisible([]);
      return;
    }
    setVisible(R.append(props, visible));
  };
  return (
    <>
      <div className="gap-4">
        <div className="border-l-0 border-r-0 border-b-3 border-t-0 border-solid border-contrast-600 flex justify-center md:justify-between items-end mb-2 lg:mb-5">
          <img src={leftHeaderImage} alt="Cartoon of a woman working" className="hidden md:block w-1/4 lg:w-auto" />
          <h1 className="text-center lg:text-left">Kia ora<div className="md:text-4xl">{currentBusiness?.details?.name ? `${currentBusiness?.details?.name}!` : 'Welcome to your Business Dashboard!'}</div></h1>
          <img src={rightHeaderImage} alt="Cartoon of a office building" className="hidden md:block w-1/4 lg:w-auto" />
        </div>
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {businessId && (
            <DashboardBlock
              image={businessDetailsImage}
              caption="Business Details"
              link="/myyellowv2/business-details"
              disabled={visible.length}
            />
          )}
          <DashboardBlock
            image={productsImage}
            caption="Digital Products"
            handleClick={() => handleClick('products')}
            disabled={visible.length}
            // active={R.includes('products', visible)}
          />
          <DashboardBlock
            image={insightsImage}
            caption="Digital Performance"
            handleClick={() => handleClick('insights')}
            disabled={visible.length}
            // active={R.includes('insights', visible)}
          />
          <DashboardBlock
            image={reviewsImage}
            caption="Ratings & Reviews"
            link="/reviews"
            disabled={visible.length}
          />
          <DashboardBlock
            image={expertImage}
            caption="Digital Expert"
            link="/our-products/digital-expert"
            disabled={visible.length}
          />
          <DashboardBlock
            image={knowledgeImage}
            caption="Knowledge Base"
            link="/resources"
            disabled={visible.length}
          />
        </div>
        <section className="mt-4 cursor-pointer shadow-md rounded-md overflow-hidden bg-base-100 h-auto transition duration-500 ease-in-out">
          <a
            href="https://f.hubspotusercontent10.net/hubfs/5250769/Yellow%20-%20NZ%20Small%20Business%20Nation%20Report%202020.pdf"
            className="cursor-pointer no-underline"
            target="_blank"
            rel="noreferrer"
          >
            <div
              className="flex flex-col md:flex-row h-full space-y-2 p-3 sm:p-4 text-base-100 sm:space-y-0 sm:space-x-2 justify-between"
            >
              <div className="flex flex-col self-center items-start justify-between lg:justify-start">
                <h2 className="text-left no-underline m-0 text-contrast-600">SME Business Report</h2>
                <div className="flex">
                  <p className="self-center text-left no-underline m-0 text-contrast-600">Download our Yellow SME Business Report and meet New Zealand’s
                    small business nation.
                  </p>
                  <img src={yellowArrow} alt="Go to link" className="m-2" />
                </div>
              </div>
              <img src={yellowBusinessLight} alt="Yellow Business Guide" width={175} className="self-center md:mb-3" />
            </div>
          </a>
        </section>
      </div>
      <Modal
        isVisible={visible.length > 0}
        onDismiss={() => setVisible([])}
        expanded
      >
        <>
          {R.includes('insights', visible) && (
            <DigitalPerformanceModalContent businessId={businessId} />
          )}
          {R.includes('products', visible) && (
            <ProductsModalContent businessId={businessId} />
          )}
        </>
      </Modal>
    </>
  );
};

export default Dashboard;
