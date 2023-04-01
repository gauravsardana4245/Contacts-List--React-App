import { useState } from "react"
import ContactContext from "./ContactContext"

const ContactState = (props) => {
    const host = "https://icontacts-gaurav-backend.onrender.com"

    const contactsInitial = []
    const [contacts, setContacts] = useState(contactsInitial)

    //Getting all contacts 
    const getContacts = async () => {
        //API call
        const response = await fetch(`${host}/api/contacts/fetchallcontacts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            }
        });
        const json = await response.json();
        setContacts(json);
    }

    const addContact = async (name, mobile, email) => {

        const response = await fetch(`${host}/api/contacts/addcontact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify({ name: name, mobile: mobile, email: email })
        });
        const json = await response.json();
        const contact = json.contact;
        console.log(contact);
        // const newContact = {
        //     name: contact.name,
        //     mobile: contact.mobile,
        //     email: contact.email
        // }
        if (json.success) {
            let newContacts = JSON.parse(JSON.stringify(contacts));
            newContacts.push(contact);
            console.log(typeof newContacts);
            setContacts(newContacts);
        }
        else {
            alert("A contact with this name alredy exists!")
        }
    }

    const deleteContact = async (id) => {

        //API call
        const response = await fetch(`${host}/api/contacts/deletecontact/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            }
        });
        console.log(response);
        const newContacts = contacts.filter((contact) => { return contact._id !== id });
        setContacts(newContacts);
    }

    const editContact = async (name, mobile, email, id) => {
        //API call
        const response = await fetch(`${host}/api/contacts/updatecontact/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify({ name: name, mobile: mobile, email: email })
        });
        const json = await response.json();
        console.log(json);

        let newContacts = JSON.parse(JSON.stringify(contacts));
        for (let index = 0; index < newContacts.length; index++) {
            let element = newContacts[index];
            if (element._id === id) {
                newContacts[index].name = name
                newContacts[index].mobile = mobile
                newContacts[index].email = email
                break;
            }
        }
        setContacts(newContacts);

    }

    return (
        <ContactContext.Provider value={{ contacts, setContacts, addContact, deleteContact, getContacts, editContact }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState
