
import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { parseMd } from '../../../../util';
import Button from '../../../Button';

import shouldLazyLoad from '../services/shouldLazyLoad';

import {
  Content, Container,
} from '../../ContenfulModules.styled';

import {
  Card, Cards, CustomButton, ContentWapper,
} from './Styled';

const CardFourLiquidTemplate = ({
  title: rawTitle,
  description: rawDescription,
  cards,
  callToActionButton,
  callToActionUrl,
  theme,
}) => {
  const title = parseMd(rawTitle);
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
        {description && (
          <span>{description}</span>
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
              <ContentWapper>
                {card.text && (
                  <div>{parseMd(card.text.text)}</div>
                )}
                {card.callToAction && (
                  <CustomButton href={card.callToActionUrl} variant="tertiary" outline="true">{card.callToAction}</CustomButton>
                )}
              </ContentWapper>
            </Card>
          ))}
        </Cards>
      )}
    </Container>
  );
};

CardFourLiquidTemplate.defaultProps = {
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

CardFourLiquidTemplate.propTypes = {
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

export default withTheme(CardFourLiquidTemplate);
