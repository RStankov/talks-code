import styled from 'styled-components';

const Button = styled.button`
  background: #ddd;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 18px;
  height: 50px;
  margin: 2px;
  outline: none;
  text-align: center;
  width: 50px;

  &:hover {
    background: #aaa;
  }
`;

export default Button
