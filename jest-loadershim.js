/* globals window, document */

// enzyme adapter
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetch from 'unfetch';

configure({ adapter: new Adapter() });

global.fetch = fetch;
global.window = global;
global.Headers = fetch.Headers;
global.Request = fetch.Request;
global.Response = fetch.Response;
global.location = { hostname: '' };


// jest loader
global.___loader = {
  enqueue: jest.fn(),
};

// mock @reach checkStyles
jest.mock('@reach/utils', () => ({
  ...jest.requireActual('@reach/utils'),
  checkStyles: jest.fn(),
}));

const originalGetComputedStyle = window.getComputedStyle;

window.getComputedStyle = (element) => (
  element === document.body
    ? {
      getPropertyValue: (prop) => (
        prop.includes('--reach')
          ? '1'
          : originalGetComputedStyle(document.body).getPropertyValue(prop)
      ),
    }
    : originalGetComputedStyle(element)
);
