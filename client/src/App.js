import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './pages/Home';
import RegistrationPage from './pages/Registration';
import LoginPage from './pages/Login';
import { useDispatch } from 'react-redux';
import { refresh } from './redux/slices/authSlice';
import CONSTANTS from './constants';
import ChatPage from './pages/Chat';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem(CONSTANTS.TOKEN_STRING);

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
        <PrivateRoute path='/chat' component={ChatPage} />
      </Switch>
    </Router>
  );
}

export default App;
