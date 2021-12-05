
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { withTheme } from 'styled-components';

import { parseMd } from '../../../../util';

import { Container } from '../../../Grid';
import Button from '../../../Button';

import shouldLazyLoad from '../services/shouldLazyLoad';

import {
  Card, Description, Content, Cards,
} from './Styled';

const CardLiquidQuotesTemplate = ({
  title: rawTitle,
  subtitle: rawTitleSub,
  description: rawDescription,
  cards,
  callToActionButton,
  callToActionUrl,
  theme,
}) => {
  const title = parseMd(rawTitle);
  const subtitle = parseMd(rawTitleSub);
  const description = parseMd(rawDescription);

  return (
    <Container
      as="section"
      width={theme.containerWidth}
      mx="auto"
      justifyContent="space-between"
      flexWrap="wrap"
    >
      <Content>
        {title && (
          <h1>{title}</h1>
        )}
        {subtitle && (
          <h2>{subtitle}</h2>
        )}
        {description && (
          <Description>{description}</Description>
        )}
        {callToActionButton && (
          <Button href={callToActionUrl}>{callToActionButton}</Button>
        )}
      </Content>
      {cards && cards.length > 0 && (
        <Cards
          as="ul"
          flexWrap="wrap"
          justifyContent="space-between"
        >
          {cards.map((card) => (
            <Card
              key={`${card.title} ${card.text && card.text.text}`}
              as="li"
              borderRadius={5}
              boxShadow="0px 2px 57px rgba(210, 212, 218, 0.35);"
              p={4}
            >
              {card.image && (
                <img
                  src={card.image.file.url}
                  alt={card.image.description}
                  width={card.image.file?.details?.image?.width}
                  height={card.image.file?.details?.image?.height}
                  loading={shouldLazyLoad(card.image.file.url) ? 'lazy' : undefined}
                />
              )}
              <h3>{card.title}</h3>
              <h4>{card.subtitle}</h4>
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
  );
};

CardLiquidQuotesTemplate.defaultProps = {
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
  callToActionButton: '',
  callToActionUrl: '',
};

CardLiquidQuotesTemplate.propTypes = {
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
    title: PropTypes.string,
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
  callToActionButton: PropTypes.string,
  callToActionUrl: PropTypes.string,
  theme: PropTypes.shape({
    containerWidth: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    ),
  }).isRequired,
};

export default withTheme(CardLiquidQuotesTemplate);
