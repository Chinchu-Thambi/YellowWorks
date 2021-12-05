import React from 'react';
import PropTypes from 'prop-types';
import check from '../../images/checkCircle.svg';

const Switch = (props) => {
  const {
    label, checked, onChange, price, id, description,
  } = props;
  return (
    <div className="flex flex-col w-full bg-transparent">
      <label htmlFor={id} className="mt-3 inline-flex items-center cursor-pointer">
        <span className="relative self-start">
          <span className="block w-5 h-4 bg-base-300 rounded-full shadow-inner" />
          <span className={`absolute block w-3 h-3 ml-1 mt-1 rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out ${checked ? 'bg-brand-600 transform translate-x-full' : 'animate-pulse bg-contrast-400'}`}>
            <input id={id} type="checkbox" className="absolute opacity-0 w-0 h-0" onClick={onChange} />
            <p className={`h-full p-0 m-0 ${checked ? '' : 'px-1 text-base-100'}`}>{checked ? <img src={check} alt="Checked" className="h-full" /> : '+'}</p>
          </span>
        </span>
        <div className="grid grid-cols-3 ml-3 flex flex-row justify-between w-full font-bold text-contrast-600 text-left">
          <div className="col-span-2">
            <p className="text-contrast-600 block m-0">{label}</p>
            <p className="text-contrast-400 font-normal block">{description}</p>
          </div>
          <p className="text-contrast-600 col-span-1 m-0">{price}</p>
        </div>
      </label>
    </div>
  );
};

Switch.defaultProps = {
  label: '',
  description: '',
  price: '',
  id: '',
  checked: false,
};

Switch.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.string,
  id: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default Switch;
