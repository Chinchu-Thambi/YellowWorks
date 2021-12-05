import styled from 'styled-components';

import BucketImage from '../../../../../../components/BucketImage';
import {
  OptionDetails,
} from '../../../../components/ListGroup';

export const BusinessDescriptionParagraph = styled(OptionDetails)`
  white-space: pre-line;
`;

export const BannerImageItem = styled(BucketImage)`
  width: 50%;
  object-fit: cover;
  object-position: center;
  margin-bottom: ${({ theme }) => theme.space[2]};
  border-radius: ${({ theme }) => theme.space[1]};
`;
