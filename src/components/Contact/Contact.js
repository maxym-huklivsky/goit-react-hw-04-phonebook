import { ContactItem, ContactInfo, RemoveContBtn } from './Contact.styled';
import PropTypes from 'prop-types';

export const Contact = ({ id, name, number, onRemoveContact }) => (
  <ContactItem>
    <ContactInfo>
      {name}: {number}
    </ContactInfo>
    <RemoveContBtn onClick={() => onRemoveContact(id)}>Delete</RemoveContBtn>
  </ContactItem>
);

Contact.propTypes = {
  onRemoveContact: PropTypes.func.isRequired,
};
