/* @flow */

import * as React from 'react';
import Button from 'ph/components/Button';

type Props = {
  children?: any,
  component?: any,
  onClick: Function,
  loadingText?: any,
};

type State = {
  isLoading: boolean,
};

export default class LoadButton extends React.Component<Props, State> {
  state = {
    isLoading: false,
  };

  _isMounted: boolean = true;

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { isLoading } = this.state;

    const {
      component,
      children,
      onClick: _onClick,
      loadingText: _loadingText,
      ...buttonProps
    } = this.props;

    const Component = component || Button;

    return (
      <Component
        {...buttonProps}
        disabled={isLoading}
        onClick={this.handleClick}>
        {isLoading ? this.renderLoading() : children}
      </Component>
    );
  }

  renderLoading() {
    if (this.props.loadingText === false) {
      return this.props.children;
    }

    if (this.props.loadingText) {
      return this.props.loadingText;
    }

    return <React.Fragment>{this.props.children}…</React.Fragment>;
  }

  handleClick = (event: SyntheticEvent<any>) => {
    event.preventDefault();

    if (this.state.isLoading) {
      return;
    }

    this.setState({ isLoading: true }, () => {
      this.executeClickHandler(event);
    });
  };

  async executeClickHandler(event: SyntheticEvent<any>) {
    await this.props.onClick(event);

    if (this._isMounted) {
      this.setState({ isLoading: false });
    }
  }
}

