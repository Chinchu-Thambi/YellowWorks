const formatName = (props) => {
  const {
    honorificSuffix, honorificPrefix, givenName, familyName,
  } = props;

  const nameOrder = [
    honorificPrefix,
    givenName,
    familyName,
    honorificSuffix,
  ].filter(Boolean);
  return nameOrder.join(' ');
};

export default formatName;
