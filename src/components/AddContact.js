import React, { useContext, useRef } from 'react'
import { useState } from 'react';
import contactsContext from "../context/contacts/ContactContext"

const AddContact = (props) => {
    const { mode } = props;
    const buttonStyle = {
        height: "50px",
        border: `1px solid ${mode === 'light' ? 'black' : 'white'}`,
        fontSize: "20px"

    }
    const context = useContext(contactsContext);
    const { addContact, contacts, setContacts } = context;
    const [contact, setContact] = useState({ name: "", mobile: "", email: "" })

    const changeHandler = (e) => {

        setContact({ ...contact, [e.target.name]: e.target.value })

    }
    const ref = useRef(null);
    const ref2 = useRef(null);

    const submitHandler = (e) => {
        e.preventDefault();
        addContact(contact.name, contact.mobile, contact.email);
        ref.current.click();
        // setContacts(contacts.concat({ name: contact.name, mobile: contact.mobile, email: contact.email }));
        setContact({ name: "", mobile: "", email: "" });
    }
    return (
        <div>

            <button style={buttonStyle} type="button" ref={ref} className={`btn container mx-3 text-${mode === 'light' ? 'dark' : 'light'}`} data-toggle="modal" data-target="#exampleModal3">
                <i className="fa-solid fa-user-plus"></i>   Add a Contact
            </button>


            <div className="modal fade" id="exampleModal3" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                    <input type="text" className="form-control" id="name" value={contact.name} aria-describedby="emailHelp" name="name" onChange={changeHandler} />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="emobile" className="form-label">Mobile No. (Atleast 10 digit)</label>
                                    <input type="tel" className="form-control" id="mobile" value={contact.mobile} name="mobile" onChange={changeHandler} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="eemail" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" name="email" value={contact.email} onChange={changeHandler} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">

                            <button type="button" ref={ref2} className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" disabled={contact.mobile.length < 10} className="btn btn-primary" onClick={submitHandler}>Add Contact</button>
                        </div>
                    </div>
                </div>
            </div>


            {/* <div className="container my-3">
                <h2>Add a Contact</h2>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" value={contact.name} aria-describedby="emailHelp" name="name" onChange={changeHandler} />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="mobile" className="form-label">Mobile No.</label>
                        <input type="tel" className="form-control" id="mobile" value={contact.mobile} name="mobile" onChange={changeHandler} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name="email" value={contact.email} onChange={changeHandler} />
                    </div>

                    <button disabled={contact.mobile.length < 5 || contact.name.length < 5} type="submit" className="btn btn-primary" onClick={submitHandler}>Add Contact</button>
                </form>
            </div> */}

        </div>
    )
}

export default AddContact
