import PropTypes from 'prop-types';

export const ReviewStatusType = PropTypes.oneOf(['ACCEPT', 'DECLINE', 'MOD', 'MOD_REQ', 'PENDING', 'DELETE']);

export const ResponseStatusType = PropTypes.oneOf([
  'ACCEPT',
  'DECLINED',
  'DECLINE_CR',
  'DECLINE_SL',
  'DECLINE_SP',
  'DECLINE_LA',
  'DECLINE_PR',
  'DECLINE_MR',
  'ARCHIVE',
  'MOD',
  'DELETE',
]);

export const UserType = PropTypes.shape({
  displayName: PropTypes.string,
  avatar: PropTypes.string,
});

export const ImageType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  icon_image: PropTypes.string,
  phone_image: PropTypes.string,
  thumbnail_image: PropTypes.string,
  caption: PropTypes.string,
  created: PropTypes.number,
  dateModerated: PropTypes.number,
});

export const ResponseType = PropTypes.shape({
  id: PropTypes.string,
  user: UserType,
  text: PropTypes.string,
  status: ResponseStatusType,
  created: PropTypes.number,
  dateModerated: PropTypes.number,
});

export const ReviewType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  user: UserType,
  rating: PropTypes.number.isRequired,
  created: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  status: ReviewStatusType.isRequired,
  dateModerated: PropTypes.number,
  images: PropTypes.arrayOf(ImageType),
  response: ResponseType,
});
