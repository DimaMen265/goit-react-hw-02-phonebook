import { Component } from "react";
import { nanoid } from "nanoid";
import { Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import styles from "./ContactForm.module.css";

const initialValues = {
  name: "",
  number: "",
};

let userSchema = yup.object({
  name: yup
    .string()
    .matches(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/)
    .required(),
  number: yup
    .string()
    .matches(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/)
    .required(),
});

export class ContactForm extends Component {
    handleOnSubmit = (values, actions) => {
        const { contacts } = this.props;
        if (contacts.find(contact => contact.name === values.name) === undefined) {
            const item = { id: nanoid(), name: values.name, number: values.number };
            this.props.addContact(item);
            actions.resetForm();
        } else {
            alert(`${values.name} is already in contacts.`);
        };
    };

    render() {
        return (
            <Formik initialValues={initialValues} onSubmit={this.handleOnSubmit} validationSchema={userSchema}>
                {formikProps => (
                    <form className={styles.form} onSubmit={formikProps.handleSubmit}>
                        <label htmlFor="name" className={styles.labelName}>Name</label>
                        <Field
                            type="text"
                            name="name"
                            id="name"
                            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                            placeholder="Enter a name..."
                            className={styles.input}
                        />
                        <ErrorMessage name="name">
                            {() => (
                                <p className={styles.errorText}>
                                    Wrong name: Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob
                                    Mercer, Charles de Batz de Castelmore d'Artagnan
                                </p>
                            )}
                        </ErrorMessage>

                        <label htmlFor="number" className={styles.labelNumber}>Number</label>
                        <Field
                            type="tel"
                            name="number"
                            id="number"
                            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                            placeholder="Enter a phone number..."
                            className={styles.input}
                        />
                        <ErrorMessage name="number">
                            {() => (
                                <p className={styles.errorText}>Phone number must be digits and can contain spaces, dashes, parentheses and can start with +</p>
                            )}
                        </ErrorMessage>

                        <button type="submit" className={styles.buttonForm}>Add contact</button>
                    </form>
                )} 
            </Formik>
        );
    };
};
