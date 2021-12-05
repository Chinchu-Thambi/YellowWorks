/* globals describe, it, expect */

import React from 'react';
import { render } from 'enzyme';

import YouTubeVideo from './YouTubeVideo';

describe('YouTubeVideo', () => {
  it('YouTubeVideo', () => {
    const wrapper = render(<YouTubeVideo videoID="YCp2GZNkBSU" onEdit={() => 'edit'} onDelete={() => 'delete'} />);
    expect(wrapper).toMatchSnapshot();
  });
});
