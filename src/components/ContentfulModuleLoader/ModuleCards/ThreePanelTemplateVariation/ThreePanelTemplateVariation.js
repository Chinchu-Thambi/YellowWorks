import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'rebass/styled-components';
import { withTheme } from 'styled-components';
import { navigate, Link } from 'gatsby';

import { parseMd } from '../../../../util';

import { Container } from '../../../Grid';

import shouldLazyLoad from '../services/shouldLazyLoad';

import {
  Background, Content,
} from '../../ContenfulModules.styled';

import {
  Card, Cards, Title, Subheading,
} from './Styled';

const ThreePanelTemplateVariation = ({
  title: rawTitle,
  subtitle: rawTitleSub,
  description: rawDescription,
  callToActionButton,
  callToActionUrl,
  backgroundColor,
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
            <h2>{title}</h2>
          )}
          {subtitle && (
            <h3>{subtitle}</h3>
          )}
          {description && (
            <span>{description}</span>
          )}
          {callToActionButton && (
            <Link to={callToActionUrl}>
              {callToActionButton}
            </Link>
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
                onClick={() => card.callToActionUrl && navigate(card.callToActionUrl)}
              >
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
                <Title>{card.title}</Title>
                {card.subtitle && (
                  <Subheading>{card.subtitle}</Subheading>
                )}
                {card.text && (
                  <div>{parseMd(card.text.text)}</div>
                )}
                {card.callToActionUrl && (
                  <Link to={card.callToActionUrl}>
                    {card.callToAction}
                  </Link>
                )}
              </Card>
            ))}
          </Cards>
        )}
      </Container>
    </Background>
  );
};

ThreePanelTemplateVariation.defaultProps = {
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
  callToActionButton: '',
  callToActionUrl: '',
  media: {
    description: '',
    file: {
      url: '',
    },
  },
  cards: [],
};

ThreePanelTemplateVariation.propTypes = {
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
  callToActionButton: PropTypes.string,
  callToActionUrl: PropTypes.string,
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
        subtitle: PropTypes.string,
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

export default withTheme(ThreePanelTemplateVariation);
