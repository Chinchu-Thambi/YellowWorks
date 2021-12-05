import { getFirstPricingPlan } from '../../../../../services/getPricingPlans';

const getTotalPrice = (subscription, selectableOptions) => {
    return getFirstPricingPlan(subscription?.product)?.amount
    + (subscription?.productOptions?.reduce(
        (totalPriceOfOptions, option) => totalPriceOfOptions
        + getFirstPricingPlan(option)?.amount([...selectableOptions, { sku: 'CANCEL' }]), 0) || 0);
    };

export default getTotalPrice;
