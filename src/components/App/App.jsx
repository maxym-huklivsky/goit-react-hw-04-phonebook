import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { Container } from './App.styled';
import { ContactsList } from 'components/ContactsList';
import { ContactForm } from 'components/ContactForm';
import { FilterContacts } from 'components/FilterContacts';

export const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const addContact = (values, actions) => {
    const { name, number } = values;

    // Check name for repetition
    const normalizeName = name.toLowerCase();
    const NameAlreadyInContacts = contacts.find(
      ({ name: nameOfContact }) => nameOfContact.toLowerCase() === normalizeName
    );
    if (NameAlreadyInContacts) {
      return alert(`${name} is already in contacts.`);
    }

    // Check number for repetition
    let thisNameOfContact = null;
    const NumberAlreadyInContacts = contacts.find(
      ({ number: numberOfContact, name: nameOfContact }) => {
        thisNameOfContact = numberOfContact === number && nameOfContact;
        return numberOfContact === number;
      }
    );
    if (NumberAlreadyInContacts) {
      return alert(`${number}(${thisNameOfContact}) is already in contacts.`);
    }

    setContacts(pS => [{ name, number, id: nanoid() }, ...pS]);

    actions.resetForm();
  };

  const removeContact = contId => {
    setContacts(pS => pS.filter(({ id }) => id !== contId));
  };

  const changeInput = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'filter':
        setFilter(value);
        break;

      default:
        break;
    }
  };

  const nolmalizeFilter = filter.toLowerCase();
  const visiableContacts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(nolmalizeFilter)
  );

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={addContact} />

      <h2>Contacts</h2>
      <FilterContacts filter={filter} onChangeInput={changeInput} />
      <ContactsList
        contacts={visiableContacts}
        onRemoveContact={removeContact}
      />
    </Container>
  );
};
