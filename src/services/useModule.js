import React from 'react';

// This is needed so that the modules are bundled and accessible.
// Plain import(withAVariable) is not enough for
// the bundler to know that it should go in.
export const importableModules = {
  '@aws-amplify/auth': () => import('@aws-amplify/auth'),
  '@yellownz/pricing-data': () => import('../../static/product-brief-endpoint/searchAdsPricingPlans.json'),
};

const useModule = (module) => {
  const [Module, setModule] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (
      loading
      || Module
    ) {
      return;
    }

    setLoading(true);
    const loadModule = async () => {
      const loadedModule = await importableModules[module]();

      setModule(loadedModule);
    };

    setLoading(false);
    loadModule();
  }, [Module, loading, module]);
  return Module;
};

export default useModule;
