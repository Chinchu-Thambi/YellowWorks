const formatUrl = (url) => {
  if (!url) return '';

  const index = url.lastIndexOf('://');
  const result = url.substring(index + 3);

  return result;
};

export default formatUrl;
