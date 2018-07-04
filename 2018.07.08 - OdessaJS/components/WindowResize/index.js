/* @flow */

import * as React from 'react';
import { throttle } from 'lodash';

type Props = {
  onResize: ({| height: number, width: number |}) => void,
};

export default class WindowResize extends React.Component<Props> {
  componentDidMount() {
    this.handleResize();

    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return null;
  }

  handleResize = throttle(() => {
    this.props.onResize({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  }, 500);
}
