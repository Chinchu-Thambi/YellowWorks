import styled from 'styled-components';
import Thumbnail from './Thumbnail';

const ThumbnailLink = styled(Thumbnail)`
  :hover {
    filter: ${(props) => props.onClick && 'brightness(0.9)'};
  }
  cursor: ${(props) => props.onClick && 'pointer'};
`;

export default ThumbnailLink;
