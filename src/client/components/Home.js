import React from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';

import { EXAMPLE_QUERY } from '../../graphql/querys';

const H3 = styled.h3`
background: #944a62;
padding: 2px;
border-radius: 3px;
border: none;
width: fit-content
color: white;`;

class Home extends React.Component {

  render() {
    return (
      <Query query={EXAMPLE_QUERY}>
        {({ loading, error, data }) => {
          if (loading) {
            return <h1>Loading</h1>;
          }
          if (error) {
            return <h1>{`Error ${error.message}`}</h1>;
          }
          return data.rates.map((element) => {
            return (
              <H3 key={element.currency}>{`The ${element.name}'s short name is ${element.currency}`}</H3>
            );
          });
        }}
      </Query>
    );
  }
}

// export default {
//   component: Home
// };
export default Home;
