import React from 'react';
import * as R from 'ramda';
import { useForm } from 'react-hook-form';

import BusinessContext from '../../../../../MyYellow/services/BusinessContext';

const useBusinessForm = ({ businessSubset }) => {
  const formHook = useForm();
  const businessStore = React.useContext(BusinessContext) ?? {};

  const contextData = businessStore.getSubset?.(businessSubset) ?? {};

  const commitFields = (fieldNames, { draft = false } = {}) => {
    const currentValues = formHook.getValues();

    const mergingPathValues = R.compose(
      R.append({
        path: ['draft'],
        value: draft,
      }),
      R.map((name) => ({
        path: businessSubset[name],
        value: currentValues[name],
      })),
    )(fieldNames);

    businessStore.mergeSubset(mergingPathValues);
  };

  // propagate business context updates to form elements
  React.useEffect(() => {
    const currentValues = formHook.getValues();
    Object.entries(contextData).forEach(([name, value]) => {
      if (
        typeof currentValues[name] !== 'undefined'
        && currentValues[name] !== value
      ) {
        formHook.setValue(name, value);
      }
    });
  }, [contextData, formHook]);


  return {
    formHook,
    contextData,
    commitFields,
  };
};

export default useBusinessForm;
