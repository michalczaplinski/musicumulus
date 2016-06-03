import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

import MainPage from '../containers/MainPage';

const App = (props) => {
  return (
    <div>
      {props.children || <MainPage/> }
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
