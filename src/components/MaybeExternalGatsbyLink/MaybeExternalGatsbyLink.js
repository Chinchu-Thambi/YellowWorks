import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

const MaybeExternalGatsbyLink = React.forwardRef(({ href, children, ...rest }, ref) => {
  if (href.startsWith('http')) {
    return <a href={href} ref={ref} {...rest}>{children}</a>;
  }

  if (href === '') {
    return <a ref={ref} {...rest}>{children}</a>;
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Link to={href} ref={ref} {...rest}>{children}</Link>;
});

MaybeExternalGatsbyLink.defaultProps = {
  href: '',
  children: null,
};

MaybeExternalGatsbyLink.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node,
};

export default MaybeExternalGatsbyLink;
