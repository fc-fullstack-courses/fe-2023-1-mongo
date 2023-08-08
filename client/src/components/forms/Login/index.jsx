import React from 'react';
import { Formik, Form, Field } from 'formik';

const initialValues = {
  email: '',
  password: '',
};

const LoginForm = (props) => {
  return (
    <Formik initialValues={initialValues}>
      <Form>
        <Field type='email' placeholder='email' name='email' />
        <Field type='password' placeholder='password' name='password' />
        <button type='submit'>Login</button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
