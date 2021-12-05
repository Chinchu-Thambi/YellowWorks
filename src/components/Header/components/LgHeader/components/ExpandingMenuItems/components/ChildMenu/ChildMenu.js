import React from 'react';
import PropTypes from 'prop-types';

import { ChildMenuWrapper } from '../../../../LgHeaderStyled';

import ChildMenuItem from './components/ChildMenuitem';

const ChildMenu = ({
  menuItem, visible, onFocus, onBlur,
}) => {
  const menuRoot = React.useRef();
  const [visibleChildMenu, setVisibleChildMenu] = React.useState(null);

  const handleMouseLeave = (e) => {
    if (
      e.relatedTarget === window // case: pointer towards outside the page
      || !menuRoot.current.contains(e.relatedTarget)
    ) {
      setVisibleChildMenu(null);
      onBlur(e);
    }
  };

  return (
    <ChildMenuWrapper
      aria-hidden={!visible}
      visible={visible}
      onMouseLeave={onBlur}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <ul className="container flex justify-center mx-auto bg-base-100">
        {menuItem.children?.map((childItem) => (
          <ChildMenuItem
            key={childItem.title}
            ref={menuRoot}
            childItem={childItem}
            visible={visibleChildMenu === childItem.title}
            onFocus={() => { setVisibleChildMenu(childItem.title); }}
            onBlur={handleMouseLeave}
          />
        ))}
      </ul>
    </ChildMenuWrapper>
  );
};

ChildMenu.defaultProps = {
  menuItem: {
    title: '',
    link: '',
    children: null,
  },
  visible: false,
  onFocus: () => {},
  onBlur: () => {},
};

ChildMenu.propTypes = {
  menuItem: PropTypes.shape({
    title: PropTypes.string,
    link: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      link: PropTypes.string,
    })),
  }),
  visible: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default ChildMenu;
