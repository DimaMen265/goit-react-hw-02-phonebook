import { Component } from "react";
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import styles from "./App.module.css";

export class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  handleAddContact = contact => {
    this.setState(prev => {
      return { contacts: prev.contacts.concat(contact), name: "", number: "" };
    });
  };

  handleChangeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  handleDeleteContact = id => {
    this.setState(prev => ({ contacts: prev.contacts.filter(item => item.id !== id) }));
  };

  render() {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Phonebook</h1>
        <ContactForm addContact={this.handleAddContact} contacts={this.state.contacts} />
        <h2 className={styles.title}>Contacts</h2>
        <Filter changeFilter={this.handleChangeFilter} />
        <ContactList
          contacts={
            this.state.filter.length > 0
              ? this.state.contacts.filter(item => item.name.toLowerCase().includes(this.state.filter.toLowerCase()))
              : this.state.contacts
          }
          onDelete={this.handleDeleteContact}
        />
      </div>
    )
  }
}
