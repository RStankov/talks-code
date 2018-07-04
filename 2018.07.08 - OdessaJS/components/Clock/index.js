/* @flow */

import * as React from "react";
import moment from "moment";
import type { Moment } from "types/Moment";

type Props = {
  children: (time: Moment) => any
};

type State = {
  time: Moment
};

export default class Clock extends React.Component<Props, State> {
  state = { time: moment() };

  intervalId = null;

  componentDidMount() {
    this.updateTime();

    if (!this.intervalId) {
      this.intervalId = setInterval(this.updateTime, 1000);
    }
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  updateTime = () => {
    this.setTime({ time: moment() });
  };

  render() {
    return this.children(this.state.time);
  }
}
