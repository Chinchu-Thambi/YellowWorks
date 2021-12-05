import React from 'react';
import { render, screen } from '@testing-library/react';

import ChooseImage from './ChooseImage';

describe('ChooseImage', () => {
  const label = 'label';

  it('renders existing image', () => {
    const value = 'original url';

    render(
      <ChooseImage
        label={label}
        value={value}
      />,
    );

    const imageElement = screen.getByAltText(label);

    expect(imageElement).toHaveAttribute('src', value);
    expect(imageElement.className).toMatchSnapshot();
  });

  it('toggles asset modal', () => {
    const actionText = 'Change';
    const modalTitle = `Choose an image for ${label}`;

    render(<ChooseImage label={label} />);

    const modalButton = screen.getByText(actionText);
    expect(screen.queryByText(modalTitle)).not.toBeInTheDocument();

    modalButton.click();

    screen.getByText(modalTitle);
  });
});
