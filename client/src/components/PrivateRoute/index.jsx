import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = (props) => {
  const { user, isLoading, error } = useSelector((state) => state.auth);

  if (isLoading) {
    return <div>LOADING ...</div>;
  }

  if (user) {
    return <Route {...props} />;
  }

  return <Redirect to='/' />;
};

export default PrivateRoute;
