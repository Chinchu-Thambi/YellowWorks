import React from 'react';
import { Link } from 'gatsby';

import AuthContext from '../../../../Auth/AuthContext';
import { SignInHeaderButton } from '../../../../Button';

import MyAccountButton from './MyAccountButton';

const SignInButtons = () => {
  const signUp = 'Sign up';
  // Global state
  const {
    showHideModal,
  } = React.useContext(AuthContext) || {};

  return (
    <>
      <li>
        <Link
          to="/"
          className="whitespace-no-wrap uppercase text-contrast-400 font-bold text-sm"
          onClick={(e) => {
            e.preventDefault();
            // document.location = '/user/register/?from=/find-a-business/';
            showHideModal({
              show: true,
              modalType: 'register',
              target: '/my-yellow/',
            });
          }}
        >
          {signUp}
        </Link>
      </li>
      <li>
        <SignInHeaderButton
          onClick={(e) => {
            e.preventDefault();
            // document.location = '/user/login/?from=/find-a-business/';
            showHideModal({
              show: true,
              modalType: 'login',
              target: '/my-yellow/',
            });
          }}
        >
          <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* eslint-disable-next-line max-len */}
            <path d="M25.6059 4.39361C22.7729 1.56001 19.0062 0 14.9994 0C10.9926 0 7.22642 1.56001 4.39352 4.39361C1.55998 7.22658 0 10.9934 0 14.9997C0 19.006 1.55998 22.7728 4.39352 25.6064C7.22642 28.4394 10.9932 30 15 30C19.0068 30 22.773 28.44 25.6065 25.6064C28.4394 22.7734 30 19.0066 30 14.9997C30 10.9928 28.4388 7.22658 25.6059 4.39361ZM22.9328 25.4416C20.7279 27.1207 17.9783 28.1191 14.9994 28.1191C12.0204 28.1191 9.27025 27.1207 7.06598 25.4409C6.70497 25.1658 6.54891 24.6926 6.69369 24.262C7.46522 21.9605 9.3135 20.0971 11.687 19.184C12.0066 19.0611 12.0699 18.6324 11.7929 18.4312C10.4228 17.4365 9.52973 15.822 9.52973 14.0025C9.52973 10.9144 12.1019 8.41617 15.2162 8.53651C18.1375 8.64995 20.469 11.078 20.4696 14.0013C20.4703 15.8207 19.5772 17.4353 18.2065 18.4306C17.9294 18.6318 17.9927 19.0605 18.3124 19.1833C20.6777 20.0934 22.521 21.9467 23.2975 24.2369C23.4461 24.6769 23.3013 25.1608 22.9328 25.4416Z" fill="#A5AAB4" />
          </svg>
          Sign in
        </SignInHeaderButton>
      </li>
    </>
  );
};

const AccountControls = () => {
  const { state } = React.useContext(AuthContext) || {};

  return (
    state?.user
      ? (
        <li>
          <MyAccountButton />
        </li>
      )
      : (
        <SignInButtons />
      )
  );
};

export default AccountControls;
