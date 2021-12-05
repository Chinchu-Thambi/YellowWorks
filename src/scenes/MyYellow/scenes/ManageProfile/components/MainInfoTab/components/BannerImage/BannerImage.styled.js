import styled from 'styled-components';

import { mediaBreakpointUp } from '../../../../../../../../util';

import Button from '../../../../../../../../components/Button';
import BucketImage from '../../../../../../../../components/BucketImage';

export const MessageInstructions = styled.p`
  margin: 0;
  margin-bottom: ${({ theme }) => theme.space[2]};
  font-size: ${({ theme }) => theme.fontSizes[1]};
  color: ${({ theme }) => theme.palette.contrast[2]};
`;

export const CancelButton = styled(Button)`
  margin-right: ${({ theme }) => theme.space[3]};
`;

export const BannerContainer = styled.div`
  > div {
      width: 100%;
      overflow: auto;
      flex-wrap: wrap;
      max-width: 720px;
      max-height: 340px;
      display: inline-flex;
      justify-content: space-between;
      padding: ${({ theme }) => theme.space[3]};

      &::after {
        /* 
          Important to align last element in the flex list 
          flex-basis needs to be the same size than the BannerItemContainer
        */
        content: "";
        flex-basis: 31%;
      }
  }
`;

export const BannerItemContainer = styled.div`
  width: 48%;
  line-height: 0;
  overflow: hidden;
  position: relative;
  margin-bottom: ${({ theme }) => theme.space[4]};
  border-radius: ${({ theme }) => theme.space[1]};

  ${mediaBreakpointUp('lg')} {
    width: 31%;
  }

  /* There are only two items */
  &:first-child:nth-last-child(2),
  &:first-child:nth-last-child(2) ~ div {
      width: 48%;
  }

  /* There is only one item */
  &:only-child {
    width: 70%;
    margin: 0 auto;
    max-width: 320px;

    > img {
      height: 234px;
    }
  }

  input[type='text'] {
    width: 100%;
    padding: ${({ theme }) => theme.space[2]};
    border: 1px solid ${({ theme }) => theme.palette.contrast[3]};
    border-left: 0;
  }

  &:hover {
    button {
      /* DeleteButton */
      top: 6px;
      opacity: 1;
    }
  }
`;

export const BannerItem = styled.div`
  width: 100%;
  height: 142px;
  margin-bottom: ${({ theme }) => theme.space[2]};
  border-radius: ${({ theme }) => theme.space[1]};

  &:hover {
    cursor: move;
    transition: box-shadow .2s ease;
    /* Shadow values form theme doesn't looks good */
    box-shadow: 0px 1px 6px #0707075e;
  }
`;

export const BannerImageItem = styled(BucketImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  margin-bottom: ${({ theme }) => theme.space[2]};
  border-radius: ${({ theme }) => theme.space[1]};
`;

export const DeleteButton = styled(Button)`
    position: absolute;
    right: 6px;
    top: -20px;
    opacity: 0;
    cursor: pointer;
    font-size: ${({ theme }) => theme.fontSizes[1]};
    padding: 4px 6px;
    transition: all .16s ease-in-out;

    &:hover,
    &:active,
    &:focus {
      top: 6px;
      opacity: 1;
      background: ${({ theme }) => theme.palette.contrast[4]};
    }
`;

export const DeleteIconImg = styled.img`
  width: ${({ theme }) => theme.fontSizes[2]};
  height: ${({ theme }) => theme.fontSizes[2]};
  margin: 0!important;
`;

export const UploadButtonsContainer = styled.div`
  display: inline-flex;
  margin-bottom:  ${({ theme }) => theme.space[2]};
  align-items: center;
`;

export const ButtonBox = styled.div`
  display: flex;
  align-self: stretch;
  text-align: center;
  border-radius: 4px;
  position: relative;
  margin: 0 ${({ theme }) => theme.space[1]} ;
  background: ${({ theme }) => theme.palette.contrast[5]};
  border: 1px dashed ${({ theme }) => theme.palette.contrast[4]};
  line-height: 1.25;

  &:hover,
  &:focus {
    border-style: solid;
  }
`;

export const ButtonIcon = styled.img`
  min-width: 50px;
  max-width: ${({ theme }) => theme.space[7]};
`;

export const UploadsCount = styled.span`
    position: absolute;
    right: 22px;
    top: 10px;
    font-size: ${({ theme }) => theme.fontSizes[0]};
    color: ${({ theme }) => theme.palette.contrast[2]};
`;

export const ErrorContainer = styled.div`
  && {
    color: ${({ theme }) => theme.palette.error[0]};
    padding: 0;
    text-align: center;

    ::after {
      display: none;
    }

    > p {
      margin: ${({ theme }) => theme.space[2]} auto 0;
      font-size: ${({ theme }) => theme.fontSizes[1]};
    }
  }
`;
