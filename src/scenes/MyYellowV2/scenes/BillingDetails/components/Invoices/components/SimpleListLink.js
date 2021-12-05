import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileInvoice,
} from '@fortawesome/free-solid-svg-icons';
import { formatPrice } from '../../../../../../../util';

const SimpleListLink = ({ item }) => (
  <>
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-start">
          <div className="text-sm font-medium text-gray-900">
            {item.metadata.date}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-start">
          <a href={item.contentUrl} rel="noreferrer" target="_blank" className="flex space-x-2 text-indigo-600 hover:text-indigo-900">
            <picture><FontAwesomeIcon icon={faFileInvoice} /></picture>
            <div>{item.filename}</div>
          </a>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-start">
          <div className="text-sm font-medium text-gray-900">
            {formatPrice(item.metadata.cents * 0.01)}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-start">
          <div className="text-sm font-medium text-gray-900">
            {item.metadata.status}
          </div>
        </div>
      </td>
    </tr>
  </>
);

SimpleListLink.propTypes = {
  item: PropTypes.shape({
    filename: PropTypes.string,
    contentUrl: PropTypes.string,
    metadata: PropTypes.shape({
      status: PropTypes.string,
      date: PropTypes.string,
      cents: PropTypes.number,
    }),
  }).isRequired,
};

export default SimpleListLink;
