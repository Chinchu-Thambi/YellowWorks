import React from 'react';
import PropTypes from 'prop-types';

import MaybeExternalGatsbyLink from '../../../../../MaybeExternalGatsbyLink';

import ChevronButton from './components/ChevronButton';
import RoundButton from './components/RoundButton';

const AccordionMenu = ({
  title,
  link,
  level,
  label,
  target,
  children,
}) => {
  const [accordionVisibility, setAccordionVisibility] = React.useState(false);

  const toggleVisibility = () => { setAccordionVisibility(!accordionVisibility); };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      toggleVisibility();
    }
  };

  return (
    <li className="text-base">
      <div className={`
        flex items-center justify-between
        ${level === 1 ? `
          py-2 font-bold
          border-solid border-0 border-b border-contrast-200
        ` : ''}
        ${level === 2 ? `
          py-1 pl-2 font-normal
        ` : ''}
      `}
      >
        <MaybeExternalGatsbyLink
          className="min-w-3/4"
          href={link}
          data-ga-cat="Navigation_Interaction"
          data-ga-act="Header_Clicks"
          data-ga-lab={label}
          target={target}
          onClick={toggleVisibility}
        >{title}
        </MaybeExternalGatsbyLink>
        {children && (
          (level === 1 && (
            <ChevronButton
              label="Expand menu"
              expanded={accordionVisibility}
              onKeyDown={handleKeyDown}
              onClick={toggleVisibility}
            />
          ))
          || (level === 2 && (
            <RoundButton
              label="Expand menu"
              onKeyDown={handleKeyDown}
              onClick={toggleVisibility}
            >
              {accordionVisibility ? '-' : '+'}
            </RoundButton>
          ))
        )}
      </div>
      {children && (
        <ul
          className={`
            overflow-hidden transition-max-height
            ${accordionVisibility
            ? 'duration-500 max-h-16'
            : 'duration-200 max-h-0'}
            ${level === 1 && accordionVisibility ? 'border-solid border-0 border-b border-contrast-200' : ''}
            ${level === 2 ? 'text-sm' : ''}
          `}
          aria-hidden={!accordionVisibility}
        >
          {children}
        </ul>
      )}
    </li>
  );
};

AccordionMenu.defaultProps = {
  title: '',
  link: '',
  label: '',
  level: 1,
  children: undefined,
  target: undefined,
};

AccordionMenu.propTypes = {
  level: PropTypes.number,
  link: PropTypes.string,
  label: PropTypes.string,
  target: PropTypes.string,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default AccordionMenu;
