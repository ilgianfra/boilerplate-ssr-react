import React from 'react';

// import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from '../Home';

describe('Home', () => {
  configure({ adapter: new Adapter() });
  const testProps = {
    name: 'Home'
  };
  it('renders correctly', () => {
    const wrapper = shallow(
      <Home
        {...testProps} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
