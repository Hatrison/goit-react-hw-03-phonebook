import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import { Header, SectionHeader } from './App.styled';
import Filter from './Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  onSubmit = values => {
    if (this.state.contacts.find(contact => contact.name === values.name)) {
      return;
    }
    values.id = nanoid();
    const contacts = [values, ...this.state.contacts];

    this.setState({
      contacts,
    });
  };

  onChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onDelete = id => {
    const contacts = this.state.contacts.filter(contact => contact.id !== id);
    this.setState({
      contacts,
    });
  };

  render() {
    const { filter } = this.state;

    const normalizedFilter = filter.toLowerCase();
    const visibleContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );

    return (
      <div>
        <Header>Phonebook</Header>
        <ContactForm onSubmit={this.onSubmit} />

        <SectionHeader>Contacts</SectionHeader>
        <Filter onChange={this.onChange} filter={filter} />
        <ContactList contacts={visibleContacts} onDelete={this.onDelete} />
      </div>
    );
  }
}
