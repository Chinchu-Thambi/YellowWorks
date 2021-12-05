import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'rebass/styled-components';
import { withTheme } from 'styled-components';

import { parseMd } from '../../../../util';

import { Container } from '../../../Grid';

import shouldLazyLoad from '../services/shouldLazyLoad';

import {
  Content,
} from '../../ContenfulModules.styled';

import {
  Card, Cards, HeaderImage, Background, CustomButton,
} from './Styled';

const ThreePanelYellowButtonTemplate = ({
  title: rawTitle,
  subtitle: rawTitleSub,
  description: rawDescription,
  backgroundColor,
  media,
  cards,
  theme,
}) => {
  const title = parseMd(rawTitle);
  const subtitle = parseMd(rawTitleSub);
  const description = parseMd(rawDescription);

  return (
    <Background backgroundColor={backgroundColor}>
      <Container as="section" width={theme.containerWidth}>
        <Content>
          {title && (
            <h1>{title}</h1>
          )}
          {subtitle && (
            <h2>{subtitle}</h2>
          )}
          {(media && media.file) && (
            <HeaderImage>
              <img src={media.file.url} alt={media.description} />
            </HeaderImage>
          )}
          {description && (
            <span>{description}</span>
          )}
        </Content>
        {cards && cards.length && (
          <Cards
            as="ul"
            flexWrap="wrap"
            justifyContent="space-between"
          >
            {cards.map((card) => (
              <Card
                key={`${card.title} ${card.text && card.text.text}`}
                as="li"
              >
                <Flex alignItems="center" justifyContent="space-between" flexDirection="column">
                  {card.image && (
                    <Flex alignItems="center" mb={4}>
                      <img
                        src={card.image.file && card.image.file.url}
                        alt={card.image.description}
                        width={card.image.file?.details?.image?.width}
                        height={card.image.file?.details?.image?.height}
                        loading={shouldLazyLoad(card.image.file.url) ? 'lazy' : undefined}
                      />
                    </Flex>
                  )}
                  <h3>{card.title}</h3>
                  {card.text && (
                    <div>{parseMd(card.text.text)}</div>
                  )}
                </Flex>
                {card.callToActionUrl && (
                  <div>
                    <CustomButton href={card.callToActionUrl}>{card.callToAction}</CustomButton>
                  </div>
                )}
              </Card>
            ))}
          </Cards>
        )}
      </Container>
    </Background>
  );
};

ThreePanelYellowButtonTemplate.defaultProps = {
  title: {
    title: '',
  },
  subtitle: {
    subtitle: '',
  },
  description: {
    description: '',
  },
  backgroundColor: '',
  media: {
    description: '',
    file: {
      url: '',
    },
  },
  cards: [],
};

ThreePanelYellowButtonTemplate.propTypes = {
  title: PropTypes.shape({
    title: PropTypes.string,
  }),
  subtitle: PropTypes.shape({
    subtitle: PropTypes.string,
  }),
  description: PropTypes.shape({
    description: PropTypes.string,
  }),
  backgroundColor: PropTypes.string,
  media: PropTypes.shape({
    description: PropTypes.string,
    file: PropTypes.shape({
      url: PropTypes.string,
    }),
  }),
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.shape({
        title: PropTypes.string,
        text: PropTypes.shape({
          text: PropTypes.string,
        }),
        file: PropTypes.shape({
          url: PropTypes.string,
        }),
      }),
    }),
  ),
  theme: PropTypes.shape({
    containerWidth: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    ),
    space: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    ),
  }).isRequired,
};

export default withTheme(ThreePanelYellowButtonTemplate);
