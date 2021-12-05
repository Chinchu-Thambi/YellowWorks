import React from 'react';
import PropTypes from 'prop-types';

const ListView = ({ columnHeadings, children }) => (
  <div className="flex flex-col w-full">
    <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columnHeadings.map((colHead) => (
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {colHead}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {children}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

ListView.propTypes = {
  columnHeadings: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ListView;
