import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../../redux/slices/authSlice';

const initialValues = {
  email: '',
  password: '',
};

const LoginForm = (props) => {
  const { isLoading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const submitHandler = (values, formikBag) => {
    dispatch(login(values));
  };

  return (
    <>
      {isLoading && <div>Loading</div>}
      {error && <div>{JSON.stringify(error)}</div>}
      <Formik initialValues={initialValues} onSubmit={submitHandler}>
        <Form>
          <Field type='email' placeholder='email' name='email' />
          <Field type='password' placeholder='password' name='password' />
          <button type='submit'>Login</button>
        </Form>
      </Formik>
    </>
  );
};

export default LoginForm;
