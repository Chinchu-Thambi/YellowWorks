import { withTheme } from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'rebass/styled-components';
import slugify from 'slugify';

import Button from '../../../Button';
import { parseMd, theme } from '../../../../util';
import {
  Container,
  Content,
} from '../../ContenfulModules.styled';

import {
  Background, Description,
} from './Styled';

const VideoCenterTemplate = ({
  reference,
  title: rawTitle,
  subtitle: rawSubtitle,
  content: rawContent,
  videoId,
  callToActionButtonText,
  callToActionButtonUrl,
  backgroundColor,
}) => {
  const title = parseMd(rawTitle);
  const subtitle = parseMd(rawSubtitle);
  const content = parseMd(rawContent);
  const link = `https://www.youtube.com/embed/${videoId}`;
  const iframeTitle = `Youtube Video ${title}`;

  return (
    <Background color={backgroundColor}>
      <Container
        id={slugify(reference, { lower: true })}
      >
        <Content>
          {title && (
            <h1>{title}</h1>
          )}
          {subtitle && (
            <h2>{subtitle}</h2>
          )}
          <Description>{content}</Description>
          {(callToActionButtonText && callToActionButtonUrl) && (
            <Flex justifyContent={['space-evenly', null, null]}>
              {callToActionButtonText && (
                <Button href={callToActionButtonUrl}>
                  {callToActionButtonText}
                </Button>
              )}
            </Flex>
          )}
        </Content>
        {videoId && (
          <iframe title={iframeTitle} src={link} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
        )}
      </Container>
    </Background>
  );
};
VideoCenterTemplate.defaultProps = {
  reference: '',
  title: {
    title: '',
  },
  subtitle: {
    subtitle: '',
  },
  content: {
    content: '',
  },
  videoId: '',
  callToActionButtonText: '',
  callToActionButtonUrl: '',
  backgroundColor: theme.palette.base[0],
};

VideoCenterTemplate.propTypes = {
  reference: PropTypes.string,
  title: PropTypes.shape({
    title: PropTypes.string,
  }),
  subtitle: PropTypes.shape({
    subtitle: PropTypes.string,
  }),
  content: PropTypes.shape({
    content: PropTypes.string,
  }),
  videoId: PropTypes.string,
  callToActionButtonText: PropTypes.string,
  callToActionButtonUrl: PropTypes.string,
  backgroundColor: PropTypes.string,
};

export default withTheme(VideoCenterTemplate);
