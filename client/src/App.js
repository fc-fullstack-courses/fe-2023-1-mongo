import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './pages/Home';
import RegistrationPage from './pages/Registration';
import LoginPage from './pages/Login';
import { useDispatch } from 'react-redux';
import { refresh } from './redux/slices/authSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      dispatch(refresh(token));
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/registration' component={RegistrationPage} />
        <Route path='/login' component={LoginPage} />
      </Switch>
    </Router>
  );
}

export default App;
