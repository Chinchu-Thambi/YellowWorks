import React from 'react';
import { render, screen } from '@testing-library/react';

import ChooseCover from './ChooseCover';

describe('ChooseCover', () => {
  it('renders cover photo component', () => {
    const value = 'my src';
    render(<ChooseCover value={value} />);

    const imgElement = screen.getByAltText('cover photo');
    expect(imgElement).toHaveAttribute('src', value);
  });

  it('renders change modal', () => {
    render(<ChooseCover />);

    expect(screen.queryByText('modal content')).not.toBeInTheDocument();
    screen.getByText('Change').click();

    screen.getByText('Choose a cover for your website');
  });
});
