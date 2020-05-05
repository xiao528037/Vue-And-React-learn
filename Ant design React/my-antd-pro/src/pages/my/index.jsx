import React, { PureComponent } from 'react';
import Todo from './components/Todo';

class login extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Todo />
      </>
    );
  }
}

export default login;
