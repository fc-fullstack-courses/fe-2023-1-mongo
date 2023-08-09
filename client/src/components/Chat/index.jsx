import { Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMessages } from '../../redux/slices/messagesSlice';

const initialValues = {
  body: '',
};

const Chat = (props) => {
  const { messages, isLoading, error } = useSelector((state) => state.message);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMessages({ id: user?._id }));
  }, []);

  const submitHandler = (values, formikBag) => {
    formikBag.resetForm();
  };

  return (
    <div>
      <ul>{JSON.stringify(messages)}</ul>
      <Formik initialValues={initialValues} onSubmit={submitHandler}>
        <Form>
          <Field name='body' />
          <button>Send message</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Chat;
