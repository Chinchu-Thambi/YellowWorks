import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'rebass/styled-components';
import { withTheme } from 'styled-components';
import { navigate, Link } from 'gatsby';

import { parseMd } from '../../../../util';

import { Container } from '../../../Grid';

import shouldLazyLoad from '../services/shouldLazyLoad';

import {
  Content,
} from '../../ContenfulModules.styled';

import {
  Card, Cards, InnerContainer,
} from './Styled';

const RightHeroTripleProductTemplate = ({
  title: rawTitle,
  subtitle: rawTitleSub,
  description: rawDescription,
  media,
  cards,
  theme,
}) => {
  const title = parseMd(rawTitle);
  const subtitle = parseMd(rawTitleSub);
  const description = parseMd(rawDescription);

  return (
    <Container as="section" width={theme.containerWidth}>
      <Content>
        {title && (
          <h1>{title}</h1>
        )}
        {subtitle && (
          <h2>{subtitle}</h2>
        )}
        {description && (
          <span>{description}</span>
        )}
      </Content>
      <InnerContainer>
        <div>
          {(media && media.file) && (
            <img src={media.file.url} alt={media.description} />
          )}
        </div>
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
                <Flex alignItems="center" mb={4}>
                  {card.image && (
                    <img
                      src={card.image.file.url}
                      alt={card.image.description}
                      loading={shouldLazyLoad(card.image.file.url) ? 'lazy' : undefined}
                    />
                  )}
                </Flex>
                <h3>{card.title}</h3>
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
      </InnerContainer>
    </Container>
  );
};

RightHeroTripleProductTemplate.defaultProps = {
  title: {
    title: '',
  },
  subtitle: {
    subtitle: '',
  },
  description: {
    description: '',
  },
  media: {
    description: '',
    file: {
      url: '',
    },
  },
  cards: [],
};

RightHeroTripleProductTemplate.propTypes = {
  title: PropTypes.shape({
    title: PropTypes.string,
  }),
  subtitle: PropTypes.shape({
    subtitle: PropTypes.string,
  }),
  description: PropTypes.shape({
    description: PropTypes.string,
  }),
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

export default withTheme(RightHeroTripleProductTemplate);
