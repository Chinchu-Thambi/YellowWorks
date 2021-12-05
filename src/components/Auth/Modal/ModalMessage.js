import styled from 'styled-components';

export const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 13px;
  line-height: 1.5em;
  margin-bottom: 24px;
`;

export const ErrorMessageBold = styled(ErrorMessage)`
  font-weight: ${({ theme }) => theme.fontWeight[1]};
  font-size: 16px;
`;

export const InfoText = styled.p`
  text-align: center;
  font-size: 12px;
`;

export const InfoTextBig = styled(InfoText)`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fontWeight[1]};
  margin-top: 40px;
`;

export const InfoTextVeryBig = styled(InfoText)`
  font-size: ${({ theme }) => theme.fontSizes[4]};
  color: ${({ theme }) => theme.palette.contrast[2]};
`;
export default ErrorMessage;
