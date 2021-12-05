/* globals describe, it, expect */
import React from 'react';
import { mount } from 'enzyme';
import ImageUploadArea from './ImageUploadArea';

describe('Image upload area', () => {
  it('matches snapshot', () => {
    const wrapper = mount(<ImageUploadArea onFilesSelected={(f) => 1} />);
    expect(wrapper).toMatchSnapshot();
  });
});
