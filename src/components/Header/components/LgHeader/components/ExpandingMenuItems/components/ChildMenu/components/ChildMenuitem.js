import React from 'react';
import PropTypes from 'prop-types';

import { ChildMenuWrapper } from '../../../../../LgHeaderStyled';
import MaybeExternalGatsbyLink from '../../../../../../../../MaybeExternalGatsbyLink';

const ChildMenuItem = React.forwardRef(({
  childItem, visible, onFocus, onBlur,
}, ref) => {
  const offsetRef = React.useRef();

  return (
    <li
      ref={ref}
      className="whitespace-no-wrap"
      onMouseEnter={onFocus}
      onFocus={onFocus}
      onMouseLeave={onBlur}
    >
      <MaybeExternalGatsbyLink
        href={childItem.link || '/'}
        ref={offsetRef}
        className={`
        block px-5 py-3
        ${visible ? 'text-contrast-600 font-bold' : 'text-contrast-500'}
      `}
        data-ga-cat="Navigation_Interaction"
        data-ga-act="Header_Clicks"
        data-ga-lab={childItem.trackingLabel ?? childItem.title}
        target={childItem.target}
      >{childItem.title}
      </MaybeExternalGatsbyLink>
      {childItem.children && (
      <ChildMenuWrapper visible={visible}>
        <ul className="relative inline-block" style={{ left: offsetRef?.current?.offsetLeft }}>
          {childItem.children?.map((grandchildItem) => (
            <li className="px-5 pb-3" key={grandchildItem.title}>
              <MaybeExternalGatsbyLink
                className="flex items-center text-contrast-600"
                href={grandchildItem.link || '/'}
                data-ga-cat="Navigation_Interaction"
                data-ga-act="Header_Clicks"
                data-ga-lab={grandchildItem.trackingLabel ?? grandchildItem.title}
              >
                {grandchildItem.iconSrc && (
                  <img src={grandchildItem.iconSrc} alt="" className="mr-2" />
                )}
                {grandchildItem.title}
              </MaybeExternalGatsbyLink>
            </li>
          ))}
        </ul>
      </ChildMenuWrapper>
      )}
    </li>
  );
});

ChildMenuItem.defaultProps = {
  childItem: {
    title: '',
    link: '',
    target: '',
    children: null,
  },
  visible: false,
  onFocus: () => {},
  onBlur: () => {},
};

ChildMenuItem.propTypes = {
  childItem: PropTypes.shape({
    title: PropTypes.string,
    link: PropTypes.string,
    target: PropTypes.string,
    trackingLabel: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      link: PropTypes.string,
      trackingLabel: PropTypes.string,
    })),
  }),
  visible: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default ChildMenuItem;
