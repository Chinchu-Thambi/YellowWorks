import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'rebass/styled-components';
import { withTheme } from 'styled-components';
import { Link } from 'gatsby';
import { Container } from '../../../Grid';

import { parseMd } from '../../../../util';

import arrowHead from '../../../../assets/icons/arrowHead.svg';

import {
  Content, Faq, FaqSection, InnerContainer, OpenArrow, Subtitle, FaqContent,
} from './Styled';

const CardFaqTemplate = ({
  title: rawTitle,
  subtitle: rawTitleSub,
  description: rawDescription,
  // media,
  cards,
  theme,
}) => {
  const title = parseMd(rawTitle);
  const subtitle = parseMd(rawTitleSub);
  const description = parseMd(rawDescription);

  const [activeIndex, setActiveIndex] = React.useState(null);

  const handleChange = (index) => {
    if (index === activeIndex) {
      setActiveIndex(null);
    } else setActiveIndex(index);
  };

  return (
    <Container as="section" width={theme.containerWidth}>
      <InnerContainer>
        <div>
          <Content>
            {title && (
              <h2>{title}</h2>
            )}
            {subtitle && (
              <Subtitle>{subtitle}</Subtitle>
            )}
            {description && (
              // eslint-disable-next-line react/no-danger
              <div>{description}</div>
            )}
          </Content>
          {cards && cards.length && (
            <FaqSection
              as="ul"
              flexWrap="wrap"
              justifyContent="space-between"
            >
              {cards.map((card, i) => (
                <Faq
                  key={`${card.title} ${card.text && card.text.text}`}
                  as="li"
                  onClick={() => handleChange(i)}
                >
                  <Flex justifyContent="space-between">
                    <h3>{card.title}</h3>
                    <OpenArrow src={arrowHead} alt={activeIndex === i ? 'Open' : 'Close'} active={activeIndex === i} />
                  </Flex>
                  {card.text && (
                    <FaqContent shown={activeIndex === i}>
                      {parseMd(card.text.text)}
                      {card.callToActionUrl && (
                        <Link to={card.callToActionUrl}>
                          {card.callToAction}
                        </Link>
                      )}
                    </FaqContent>
                  )}
                </Faq>
              ))}
            </FaqSection>
          )}
        </div>
      </InnerContainer>
    </Container>
  );
};

CardFaqTemplate.defaultProps = {
  title: {
    title: '',
  },
  subtitle: {
    subtitle: '',
  },
  description: {
    description: '',
  },
  cards: [],
};

CardFaqTemplate.propTypes = {
  title: PropTypes.shape({
    title: PropTypes.string,
  }),
  subtitle: PropTypes.shape({
    subtitle: PropTypes.string,
  }),
  description: PropTypes.shape({
    description: PropTypes.string,
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

export default withTheme(CardFaqTemplate);
