import PropTypes from 'prop-types';
import * as R from 'ramda';
import React from 'react';

import {
  faBuilding, faMapMarked, faDesktop, faCheck, faClipboardList, faAt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { navigate } from '@reach/router';

const iconList = {
  'Business Details': faBuilding,
  'Business Location(s)': faMapMarked,
  'Social Media': faAt,
  'Website Content': faDesktop,
  Confirmation: faCheck,
};

const StepsBar = ({
  stepGroups, currentStepGroup, basePath, currentStepIndex,
}) => {
  const getFirstInstance = (groupLabel) => R.min(currentStepIndex, R.findIndex((v) => v === groupLabel)(stepGroups) + 1);
  const uniqueSteps = R.uniq(stepGroups);
  const completed = R.findIndex((v) => v === currentStepGroup)(uniqueSteps);
  return (
    <div className="w-full pt-6 md:py-6">
      <div className="flex">
        {uniqueSteps?.map(
          (group, i) => {
            const isComplete = i <= completed;
            const isActive = group === currentStepGroup;
            return (
              <div className="w-1/4">
                <div className={`relative mb-2  ${(isComplete || i === 0) ? 'z-30' : ''}`}>
                  {i > 0 && (
                    <div
                      className="absolute flex align-center items-center align-middle content-center z-0 h-px"
                      style={{
                        height: '1px',
                        width: 'calc(100% - 2.5rem)',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        'z-index': 1,
                      }}
                    >
                      <div className={`w-full ${isComplete ? 'bg-brand-600' : 'bg-base-300'} rounded items-center align-middle align-center flex-1 z-0`}>
                        <div className={`w-0 ${isComplete ? 'bg-brand-600' : 'bg-base-300'} py-1 rounded transition duration-100 ease-linear z-0`} style={{ width: '100%' }} />
                      </div>
                    </div>
                  )}
                  <div className={`w-6 h-6 mx-auto ${isComplete ? 'bg-brand-600' : 'bg-base-300'} rounded-full text-lg ${isComplete ? 'test-base-600' : 'text-contrast-600'} flex items-center z-50`}>
                    <span className={`text-center ${isComplete ? 'test-base-600' : 'text-contrast-600'} w-full`}>
                      <button className="w-full fill-current bg-transparent" type="button" onClick={basePath && (() => navigate(`${basePath}${getFirstInstance(group)}`))}>
                        <FontAwesomeIcon icon={iconList[group] || faClipboardList} size="sm" />
                      </button>
                    </span>
                  </div>
                </div>

                <div className={`text-xs text-center md:text-base text-contrast-600 ${isActive && 'font-bold'}`}>{group}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

StepsBar.defaultProps = {
  stepGroups: [],
  currentStepGroup: '',
  basePath: '',
  currentStepIndex: 0,
};

StepsBar.propTypes = {
  currentStepIndex: PropTypes.number,
  stepGroups: PropTypes.arrayOf(),
  currentStepGroup: PropTypes.string,
  basePath: PropTypes.string,
};

export default StepsBar;
