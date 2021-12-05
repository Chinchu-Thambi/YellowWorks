const getProrationCoupon = () => {
  const dt = new Date();

  const day = dt.getDate().toString().padStart(2, '0');
  const month = (dt.getMonth() + 1).toString().padStart(2, '0');
  const year = dt.getFullYear();

  return `${year}${month}${day}_1`;
};


export default getProrationCoupon;
