import React from 'react';

const AuthLayout = (props) => {
  return (
    <React.Fragment>
      <div className='layout-wrapper d-lg-flex'>
        {props.children}
      </div>
    </React.Fragment>
  );
};

export default AuthLayout;