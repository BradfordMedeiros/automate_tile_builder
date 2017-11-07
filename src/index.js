import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import Layout from './Layout';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const App = () => (
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <Layout />
  </MuiThemeProvider>
);


ReactDOM.render(<App />, document.getElementById('root'));
