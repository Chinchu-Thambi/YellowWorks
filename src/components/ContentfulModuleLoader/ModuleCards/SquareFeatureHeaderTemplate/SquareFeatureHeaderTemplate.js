import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'rebass/styled-components';
import { withTheme } from 'styled-components';
import { navigate } from 'gatsby';

import { parseMd } from '../../../../util';

import { Container } from '../../../Grid';
import Button from '../../../Button';

import shouldLazyLoad from '../services/shouldLazyLoad';

import {
  Content,
} from '../../ContenfulModules.styled';

import {
  Card, Cards, ContentWrapper,
} from './Styled';

const SquareFeatureHeaderTemplate = ({
  title: rawTitle,
  subtitle: rawTitleSub,
  description: rawDescription,
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
      {cards && cards.length && (
        <Cards as="ul" flexWrap="wrap" justifyContent="space-between">
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
                    width={card.image.file.details?.image?.width}
                    height={card.image.file.details?.image?.height}
                    loading={
                      shouldLazyLoad(card.image.file.url) ? 'lazy' : undefined
                    }
                  />
                )}
              </Flex>
              <ContentWrapper>
                <h3>{card.title}</h3>
                {card.text
                  && <div>{parseMd(card.text.text)}</div>}
              </ContentWrapper>
              {card.callToAction && (
                <Button href={card.callToActionUrl} variant="secondary">
                  {card.callToAction}
                </Button>
              )}
            </Card>
          ))}
        </Cards>
      )}
    </Container>
  );
};

SquareFeatureHeaderTemplate.defaultProps = {
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

SquareFeatureHeaderTemplate.propTypes = {
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
      title: PropTypes.string,
      callToAction: PropTypes.string,
      callToActionUrl: PropTypes.string,
      text: PropTypes.shape({
        text: PropTypes.string,
      }),
      image: PropTypes.shape({
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

export default withTheme(SquareFeatureHeaderTemplate);
