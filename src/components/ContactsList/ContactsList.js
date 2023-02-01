import { Contact } from 'components/Contact';
import PropTypes from 'prop-types';

export const ContactsList = ({ contacts, onRemoveContact }) => (
  <ul>
    {contacts.map(({ name, number, id }) => (
      <Contact
        key={id}
        id={id}
        name={name}
        number={number}
        onRemoveContact={onRemoveContact}
      />
    ))}
  </ul>
);

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string,
      number: PropTypes.string,
      id: PropTypes.string,
    })
  ).isRequired,
};
