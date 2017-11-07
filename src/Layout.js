import React from 'react';
import Editor from './Editor/Editor';

const Layout = () => (
  <div style={{ width: '100%', height: '100%', position: 'absolute', background: 'rgb(30,30,30)', color: 'whitesmoke' }}>
      <Editor />
  </div>
);

export default Layout;