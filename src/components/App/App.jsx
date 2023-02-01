import { nanoid } from 'nanoid';
import { Component } from 'react';
import { Container } from './App.styled';
import { ContactsList } from 'components/ContactsList';
import { ContactForm } from 'components/ContactForm';
import { FilterContacts } from 'components/FilterContacts';

export class App extends Component {
  state = {
    contacts: [
      { name: 'Artem', number: '+123456789', id: nanoid() },
      { name: 'Mark', number: '+766667654', id: nanoid() },
      { name: 'Lorek', number: '+344678766', id: nanoid() },
      { name: 'Tork', number: '+0987656444', id: nanoid() },
    ],
    filter: '',
  };

  componentDidMount() {
    const saveContacts = JSON.parse(localStorage.getItem('contacts'));

    if (saveContacts) {
      this.setState({ contacts: saveContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevState.contacts);
    console.log(this.state.contacts);

    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = (values, actions) => {
    const { name, number } = values;
    const { contacts } = this.state;

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

    // це відбудеться якщо всі перевірки пройшли
    this.setState(({ contacts }) => ({
      contacts: [{ name, number, id: nanoid() }, ...contacts],
    }));

    actions.resetForm();
  };

  removeContact = contId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(({ id }) => id !== contId),
    }));
  };

  changeInput = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  render() {
    const { contacts, filter } = this.state;
    const nolmalizeFilter = filter.toLowerCase();
    const visiableContacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(nolmalizeFilter)
    );

    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.addContact} />

        <h2>Contacts</h2>
        <FilterContacts filter={filter} onChangeInput={this.changeInput} />
        <ContactsList
          contacts={visiableContacts}
          onRemoveContact={this.removeContact}
        />
      </Container>
    );
  }
}
