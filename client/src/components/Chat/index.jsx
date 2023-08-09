import { Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMessages } from '../../redux/slices/messagesSlice';
import { sendMessage } from '../../api/ws';

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
    const newMessage = {
      ...values,
      author: user?._id,
    };

    sendMessage(newMessage);

    formikBag.resetForm();
  };

  const chatMessages = messages.map((message) => (
    <li key={message._id}>
      <p>
        <b>{`${message.author.firstName} ${message.author.lastName}`} says:</b>
        <span>{message.body}</span>
      </p>
    </li>
  ));

  return (
    <div>
      <ul>{chatMessages}</ul>
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
