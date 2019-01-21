import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Li = styled.li`
list-style-type: none;
margin-right: 30px;
display: inline-block;
`;

const Ul = styled.ul`
text-align: center;
`;

const Header = () => {

  return (
    <nav>
      <div>
        <Ul>
          <Li>
            <Link to="/">Home</Link>
          </Li>
          <Li>
            <Link to="/about">About</Link>
          </Li>
        </Ul>
      </div>
    </nav>
  );
};
export default Header;
