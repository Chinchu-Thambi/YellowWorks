
import styled from 'styled-components';
import { Flex } from 'rebass';
import BucketImage from '../../../../../../components/BucketImage';

export const GalleryContainer = styled(Flex)`
  position: relative;
  width: 64%;
  margin: 0 auto !important;
  margin-top: ${({ theme }) => theme.space[2]};

  & > div:only-child  {
    /* When there is only one image in the gallery we display a nice shadow */
    box-shadow: -10px -8px 0px ${({ theme }) => theme.palette.contrast[4]};
  }
`;

export const GalleryItem = styled.div`
  width: 84%;
  height: 140px;
  position: relative;
  box-shadow: -2px -4px 6px #ffffff57;

  &:nth-child(2) {
    position: absolute;
    top: 8px;
    left: 10px;
  }
`;

export const GalleryImageItem = styled(BucketImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.space[1]};
`;

export const GalleryVideoItem = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.space[2]};
  border-radius: ${({ theme }) => theme.space[1]};
  background-color: ${({ theme }) => theme.palette.contrast[0]};
  background-image: ${({ youTubeID }) => `url(https://img.youtube.com/vi/${youTubeID}/0.jpg)`};
  background-size: 100% auto;
  background-position: center;
  background-repeat: no-repeat;

  > img {
    width: 24%;
  }
`;

export const ButtonsContainer = styled(Flex)`
  margin-top: ${({ theme }) => theme.space[2]} !important;
`;

export const ButtonBox = styled.div`
  width: 50%;
  text-align: center;
  position: relative;
`;

export const ButtonIcon = styled.img`
  width: 26%;
  max-width: ${({ theme }) => theme.space[7]};
`;
