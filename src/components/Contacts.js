import React, { useContext, useEffect, useRef, useState } from 'react'
import contactsContext from "../context/contacts/ContactContext"
import AddContact from './AddContact';
import ContactItem from './ContactItem';
import { useNavigate } from "react-router-dom"

const Contacts = (props) => {
    const context = useContext(contactsContext)
    const { contacts, getContacts, editContact } = context;
    const { showAlert, mode, setName } = props;
    let navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("token")) {
            getContacts();
            async function fetchdata() {
                const response = await fetch("https://icontacts-gaurav-backend.onrender.com/api/auth/getuser", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem("token")
                    },
                });
                const json = await response.json();
                console.log(json.name);
                setName(json.name);
            }
            fetchdata();
            setName(props.name);
        }
        else {
            navigate("/login");
        }



    }, [getContacts, setName, props.name, navigate])

    const [contact, setContact] = useState({ id: "", ename: "", emobile: "", eemail: "" })

    const ref = useRef(null);
    const ref2 = useRef(null);
    const updateContact = (currentContact) => {
        ref.current.click();
        setContact({ id: currentContact._id, ename: currentContact.name, emobile: currentContact.mobile, eemail: currentContact.email })
    }

    const changeHandler = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value })

    }

    const submitHandler = (e) => {
        console.log("Updating the contact...", contact)
        editContact(contact.ename, contact.emobile, contact.eemail, contact.id)
        // e.preventDefault();
        showAlert(" Contact Updated Succesfully", "success");
        ref2.current.click();

    }
    return (
        <>
            <div className='d-flex justify-content-center'>
                <AddContact mode={mode} />
            </div>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className={`modal-content bg-${mode === 'light' ? 'light' : 'dark'} text-${mode === 'light' ? 'dark' : 'light'}`} >
                        <div className="modal-header">
                            <h5 className="modal-name" id="exampleModalLabel">Edit Details</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="ename" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="ename" aria-describedby="emailHelp" name="ename" onChange={changeHandler} value={contact.ename} />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="emobile" className="form-label">Mobile</label>
                                    <input type="text" value={contact.emobile} className="form-control" id="emobile" name="emobile" onChange={changeHandler} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="eemail" className="form-label">Email</label>
                                    <input type="text" value={contact.eemail} className="form-control" id="eemail" name="eemail" onChange={changeHandler} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">

                            <button type="button" ref={ref2} className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" disabled={contact.emobile.length < 5 || contact.ename.length < 5} onClick={submitHandler} className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-5 mx-auto container'>
                <h2 className='text-center'>Your Contacts</h2>
                {contacts.length === 0 && <div className='container'> No contacts to display</div>}
                {contacts.map((currentcontact) => {
                    return <ContactItem key={currentcontact.name} updateContact={updateContact} contact={currentcontact} showAlert={showAlert} mode={mode} />

                })}
            </div>
        </>
    )
}

export default Contacts
