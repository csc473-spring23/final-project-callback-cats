import React from 'react';

function Errorpage() {
  interface Style {
    color: string;
    fontSize: string;
    marginLeft: string;
    marginRight: string;
  }
  const errStyle: Style = {
    color: 'red',
    fontSize: '72px',
    marginLeft: '400px',
    marginRight: '400px',
  };

  return <h1 style={errStyle}> Error 404: Page NOT Found</h1>;
}

export default Errorpage;
