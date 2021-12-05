/* eslint-disable import/no-extraneous-dependencies */
const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

const options = [
  {
    name: 'Facebook',
    url: 'www.facebook.com/demofacebook',
  },
  {
    name: 'Twitter',
    url: 'www.twitter.com/demotwitter',
  },
  {
    name: 'Instagram',
    url: 'www.twitter.com/demotwitter',
  },
];

const SocialMediaProfile = () => (options[getRandomInt(3)]);

module.exports = SocialMediaProfile;
