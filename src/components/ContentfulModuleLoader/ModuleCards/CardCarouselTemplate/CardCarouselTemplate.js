/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';

import { parseMd } from '../../../../util';

import shouldLazyLoad from '../services/shouldLazyLoad';

import {
  CustomContainer, ExtendedContainer, Description, Screen, Content, MobileBackNav, MobileNextNav,
  Cards, CarouselCounter, ArrowNav, Background,
} from './Styled';

const CardCarouselTemplate = (props) => {
  const {
    title,
    description,
    cards,
    backgroundColor,
  } = props;

  const [currentItem, setCurrentItem] = React.useState(0);
  const nextItem = currentItem + 1 === cards.length ? 0 : currentItem + 1;
  const previousItem = currentItem - 1 < 0 ? 0 : currentItem - 1;

  const card = cards[currentItem];

  return (
    <Background backgroundColor={backgroundColor}>
      <CustomContainer ExtendedContainer={ExtendedContainer}>
        <h1>{parseMd(title)}</h1>
        <Description>{parseMd(description)}</Description>
        {card && card.image && (
          <Cards>
            <MobileBackNav onClick={() => setCurrentItem(previousItem)} />
            <MobileNextNav onClick={() => setCurrentItem(nextItem)} />
            <Screen src={card.image && card.image.file.url}>
              {card.image && card.image.file && (
                <img
                  src={card.image.file.url}
                  alt={card.image.description}
                  width={card.image.file?.details?.image?.width}
                  height={card.image.file?.details?.image?.height}
                  loading={shouldLazyLoad(card.image.file.url) ? 'lazy' : undefined}
                />
              )}
            </Screen>
            <Content>
              <h4>{card.title}</h4>
              <div>{parseMd(card.text)}</div>
              <nav>
                <ArrowNav onClick={() => setCurrentItem(nextItem)} />
                <CarouselCounter
                  currentIndex={currentItem}
                  nItems={cards.length}
                  goTo={setCurrentItem}
                />
              </nav>
            </Content>
          </Cards>
        )}
      </CustomContainer>
    </Background>
  );
};

CardCarouselTemplate.defaultProps = {
  title: {
    title: '',
  },
  backgroundColor: '',
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
  cards: [
  ],
};

CardCarouselTemplate.propTypes = {
  title: PropTypes.shape({
    title: PropTypes.string,
  }),
  subtitle: PropTypes.shape({
    subtitle: PropTypes.string,
  }),
  backgroundColor: PropTypes.string,
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
  theme: PropTypes.shape({
    containerWidth: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    ),
  }).isRequired,
};

export default withTheme(CardCarouselTemplate);
