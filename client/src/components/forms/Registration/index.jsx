import React from 'react';
import { Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { registration } from '../../../redux/slices/authSlice';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  isMale: 'male',
};

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const submitHandler = (values, formikBag) => {
    const newUser = {
      ...values,
      isMale: values.isMale === 'male',
    };

    dispatch(registration(newUser));
    formikBag.resetForm();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={submitHandler}>
      <Form>
        <Field name='firstName' placeholder='firstName' />
        <Field name='lastName' placeholder='lastName' />
        <Field type='email' name='email' placeholder='email' />
        <Field type='password' name='password' placeholder='password' />
        <fieldset>
          <legend>Choose your gender</legend>
          <label>
            <Field type='radio' name='isMale' value='male' /> Male
          </label>
          <label>
            <Field type='radio' name='isMale' value='female' /> Female
          </label>
        </fieldset>
        <button type='submit'>Sign Up</button>
      </Form>
    </Formik>
  );
};

export default RegistrationForm;
