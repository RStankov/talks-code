import styled from 'styled-components';

const WIDTH = 54;

const Grid = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 2px;
`;

Grid.Column = styled.div`
  text-align: center;
  width: ${ props => props.size * WIDTH }px;
`;

export default Grid;
