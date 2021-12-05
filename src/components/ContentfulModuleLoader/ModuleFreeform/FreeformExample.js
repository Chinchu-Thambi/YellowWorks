import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: none;
`;

const FreeformExample = () => (
  <Container>
    <h1>
      This is a hardcode module example.
    </h1>
    <p>
      Just like a finely tuned instrument, the success of your website’s
      performance can be helped along with some expert adjustments. Search
      Engine Optimisation (SEO) helps to make your website attractive to search
      engines like Google, so your customers can find your website quickly and easily.
    </p>
    <img src="https://images.ctfassets.net/h7ajxcwj2nu7/2DcJc2njJNEJM97CtohMo3/bcce9c094b4fce2e765cbce3abf24466/yh0040b-seo-v01.gif" style={{ maxWidth: '100%' }} alt="" />
    <button type="button">Get in touch</button>
  </Container>
);

export default FreeformExample;
