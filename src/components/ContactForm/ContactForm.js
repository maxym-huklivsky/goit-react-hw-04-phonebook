import { nanoid } from 'nanoid';
import {
  FormContacts,
  Label,
  InputWrapper,
  Submit,
  Error,
} from './ContactForm.styled';
import { Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';

const schema = yup.object().shape({
  name: yup.string().trim().min(4).max(24).required(),
  number: yup.string().trim().length(13).required(),
});

export const ContactForm = ({ onAddContact }) => {
  const idForNameInput = nanoid();
  const idForNumberInput = nanoid();

  return (
    <Formik
      initialValues={{ name: '', number: '+' }}
      validationSchema={schema}
      onSubmit={onAddContact}
    >
      <FormContacts>
        <InputWrapper>
          <Label htmlFor={idForNameInput}>Name</Label>
          <Field id={idForNameInput} type="text" name="name" />
          <ErrorMessage name="name" component={Error} />
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor={idForNumberInput}>Number</Label>
          <Field id={idForNumberInput} type="tel" name="number" />
          <ErrorMessage name="number" component={Error} />
        </InputWrapper>

        <Submit type="submit">Add contact</Submit>
      </FormContacts>
    </Formik>
  );
};

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
