
import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  Checkbox, Input, Radio, TextArea, FormSubGroup,
} from './FormElements';

describe('Input', () => {
  it('should render - without label', () => {
    render(<Input />);
    screen.getByRole('textbox');
  });

  it('should render - with label', () => {
    render(<Input label="Some label" />);
    screen.getByRole('textbox');
    screen.getByText('Some label');
  });
});

describe('TextArea', () => {
  it('should render - without label', () => {
    render(<TextArea />);
    screen.getByRole('textbox');
  });

  it('should render - with label', () => {
    render(<TextArea label="Some label" />);
    screen.getByRole('textbox');
    screen.getByText('Some label');
  });
});

describe('Radio', () => {
  it('should render - without label', () => {
    render(<Radio />);
    screen.getByRole('radio');
  });

  it('should render - with label', () => {
    render(<Radio label="Some label" />);
    screen.getByRole('radio');
    screen.getByText('Some label');
  });
});

describe('Checkbox', () => {
  it('should render - without label', () => {
    render(<Checkbox />);
    screen.getByRole('checkbox');
  });

  it('should render - with label', () => {
    render(<Checkbox label="Some label" />);
    screen.getByRole('checkbox');
    screen.getByText('Some label');
  });
});

describe('FormSubGroup', () => {
  it('should render - without label', () => {
    render(
      <FormSubGroup>
        <Input label="Some label for input" />
        <TextArea label="Some label for textarea" />
        <Radio label="Some label for radio" />
        <Checkbox label="Some label for checkbox" />
      </FormSubGroup>,
    );
    expect(screen.getAllByRole('textbox').length).toBe(2);
    screen.getByRole('radio');
    screen.getByRole('checkbox');
  });
});
