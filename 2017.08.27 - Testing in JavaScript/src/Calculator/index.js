import React from 'react';

import Memory from './Memory';
import Grid from './Grid';
import Button from './Button';

import { addToMemory, removeFromMemory, calculate } from './utils';

export default class Calculator extends React.Component {
  state = {
    memory: '0',
  };

  render() {
    return (
      <Grid size="4">
        <Grid.Column size="3">
          <Memory>
            {this.state.memory.trim()}
          </Memory>
          <Button data-test="1" onClick={this.add('1')}>1</Button>
          <Button data-test="2" onClick={this.add('2')}>2</Button>
          <Button data-test="3" onClick={this.add('3')}>3</Button>
          <Button data-test="4" onClick={this.add('4')}>4</Button>
          <Button data-test="5" onClick={this.add('5')}>5</Button>
          <Button data-test="6" onClick={this.add('6')}>6</Button>
          <Button data-test="7" onClick={this.add('7')}>7</Button>
          <Button data-test="8" onClick={this.add('8')}>8</Button>
          <Button data-test="9" onClick={this.add('9')}>9</Button>
          <Button data-test="reset" onClick={this.reset}>C</Button>
          <Button data-test="0" onClick={this.add('0')}>0</Button>
          <Button data-test="remove" onClick={this.remove}>←</Button>
        </Grid.Column>
        <Grid.Column size="1">
          <Button data-test="calculate" onClick={this.calculate}>=</Button>
          <Button data-test="+" onClick={this.add('+')}>+</Button>
          <Button data-test="-" onClick={this.add('-')}>-</Button>
          <Button data-test="*" onClick={this.add('*')}>*</Button>
        </Grid.Column>
      </Grid>
    );
  }

  add = value => () => this.setMemory(addToMemory(this.state.memory, value));

  remove = () => this.setMemory(removeFromMemory(this.state.memory));

  reset = () => this.setMemory('0');

  calculate = () => this.setMemory(calculate(this.state.memory));

  setMemory = memory => this.setState({ memory });
}
