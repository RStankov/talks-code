import React from 'react';
import styled from 'styled-components';

import Calulator from './Calculator';

const Center = styled.div`
  margin: 20px;
  align-items: center;
  justify-content: center;
  display: flex;
`;

export default class App extends React.Component {
  render() {
    return (
      <Center>
        <Calulator />
      </Center>
    );
  }
}
