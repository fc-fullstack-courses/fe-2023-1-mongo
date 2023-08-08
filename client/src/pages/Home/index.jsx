import React from 'react';
import Header from '../../components/Header';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <Header />
      <h1>Home Page</h1>
      <p>
        <pre>{JSON.stringify(user, null, 4)}</pre>
      </p>
    </div>
  );
};

export default HomePage;
