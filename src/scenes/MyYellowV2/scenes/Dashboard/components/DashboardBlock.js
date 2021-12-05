/* eslint-disable react/prop-types */
import React from 'react';
import yellowArrow from '../../../../../assets/icons/yellow-arrow.svg';

/**
 * @type {(children: any, icon: any, caption: string, link?: string, handleClick: Function, visible?: bool, variant?: bool, active?: bool, disabled?: bool) => JSX.Element}
 */
const DashboardBlock = ({
  children, image, caption, link, handleClick, visible = true, disabled = false, active = false, variant = false,
}) => (
  <div>
    <section className={`cursor-pointer shadow-md rounded-md overflow-hidden bg-contrast-600 ${visible ? 'h-full' : 'h-0'} ${disabled && 'opacity-25'} ${active && 'opacity-75'} transition duration-500 ease-in-out hover:shadow-lg`} onClick={handleClick} onKeyDown={handleClick} role="button" tabIndex="0">
      <a href={!disabled && link} className="cursor-pointer no-underline">
        <div
          className={`flex flex-row md:flex-col ${!disabled && 'h-full'} space-y-2 p-3 ${variant ? 'sm:p-3' : 'sm:p-4'} text-base-100 sm:space-y-0 space-x-2 justify-between`}
        >
          <img src={image} alt={caption} width={75} className="md:hidden" />
          <img src={image} alt={caption} width={variant ? 100 : 150} className="hidden md:inline-block md:self-center md:mb-3" />
          <div className="flex self-center items-center justify-between lg:justify-start">
            <h2 className={`text-sm ${variant ? 'md:text-xl' : 'md:text-2xl'} text-right md:text-center no-underline m-0 text-base-100`}>{caption}</h2>
            <img src={yellowArrow} alt="Go to link" className={`${active && 'transform rotate-90 transition duration-500 ease-in-out'} m-2`} />
          </div>
        </div>
      </a>
    </section>
    {children}
  </div>
);

export default DashboardBlock;
