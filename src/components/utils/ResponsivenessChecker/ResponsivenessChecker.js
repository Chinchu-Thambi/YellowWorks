import React from 'react';

/**
 * This component lets you see which breakpoint you're at. Helps with debugging responsiveness issues.
 */
const ResponsiveChecker = () => (
  <>
    {process.env.NODE_ENV === 'development' && (
      <div className="fixed top-1 left-0 right-0 opacity-75 shadow-lg z-50">
        <div className="shadow-md w-full text-2xl hidden xl:inline-block bg-gray-700 text-gray-200 text-center">
          <div>X-LARGE (xl)</div>
        </div>
        <div className="shadow-md w-full text-2xl hidden lg:inline-block xl:hidden bg-teal-700 text-teal-200 text-center">
          <div>LARGE (lg)</div>
        </div>
        <div className="shadow-md w-full text-2xl hidden md:inline-block lg:hidden bg-pink-700 text-pink-200 text-center">
          <div>MEDIUM (md)</div>
        </div>
        <div className="shadow-md w-full text-2xl hidden sm:inline-block md:hidden bg-yellow-700 text-yellow-200 text-center">
          <div>SMALL (sm)</div>
        </div>
        <div className="shadow-md w-full text-2xl sm:hidden bg-indigo-700 text-indigo-200 text-center">
          <div>X-SMALL (xs)</div>
        </div>
      </div>
    )}
  </>
);

export default ResponsiveChecker;
