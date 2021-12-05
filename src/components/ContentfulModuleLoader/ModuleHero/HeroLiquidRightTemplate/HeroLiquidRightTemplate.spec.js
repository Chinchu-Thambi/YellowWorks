import React from 'react';

import { render, screen } from '@testing-library/react';
import HeroLiquidRightTemplate from './HeroLiquidRightTemplate';

describe('HeroLiquidRightTemplate', () => {
  it('renders from props', () => {
    const props = {
      id: 'theId',
      className: 'theclass',
      title: { title: 'my title' },
      titleSub: { titleSub: 'my title sub' },
      description: { description: 'my description' },
      image: {
        title: 'imagetitle',
        description: 'imagedescription',
        file: {
          url: 'imgurl',
          fileName: 'imgfilename',
          details: {
            image: {
              width: 4000,
              height: 2000,
            },
          },
        },
      },
      callToActionButton: 'cta string',
      callToActionButtonUrl: 'cta url!',
      callToActionSecondary: 'callToActionSecondary',
      callToActionSecondaryUrl: 'callToActionSecondaryUrl',
    };

    // eslint-disable-next-line react/jsx-props-no-spreading
    const { container } = render(<HeroLiquidRightTemplate {...props} />);

    // content
    screen.getByText(props.title.title);
    screen.getByText(props.titleSub.titleSub);
    screen.getByText(props.description.description);

    // image
    // skipping because it was set on background
    // const image = screen.getByAltText(props.image.description);
    // expect(image).toHaveAttribute('src', props.image.file.url);

    // cta
    expect(screen.getByText(props.callToActionButton))
      .toHaveAttribute('href', props.callToActionButtonUrl);
    expect(screen.getByText(props.callToActionSecondary))
      .toHaveAttribute('href', props.callToActionSecondaryUrl);

    // id
    expect(container.querySelector(`#${props.id}`)).toBeInTheDocument();
    expect(container.querySelector(`.${props.className}`)).toBeInTheDocument();
  });

  it.skip('renders case study', () => {
    const caseStudy = {
      text: 'case study text',
      mobileText: 'case study mobile text',
      link: 'link',
    };

    const props = {
      customFields: {
        internal: {
          content: JSON.stringify({
            caseStudy,
          }),
        },
      },
    };

    // eslint-disable-next-line react/jsx-props-no-spreading
    render(<HeroLiquidRightTemplate {...props} />);

    expect(screen.getByText(caseStudy.text))
      .toHaveAttribute('href', caseStudy.link);
  });
});
