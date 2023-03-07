import React, { useContext, useRef } from 'react'
import contactsContext from "../context/contacts/ContactContext"

const ContactItem = (props) => {
    const { contact, updateContact, mode } = props;

    const context = useContext(contactsContext);
    const { deleteContact } = context;

    const ref = useRef(null);
    const ref2 = useRef(null);
    const handleClick = () => {
        ref.current.click();
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    }

    return (
        <>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal2">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal2" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className={`modal-content bg-${mode === 'light' ? 'light' : 'dark'} text-${mode === 'light' ? 'dark' : 'light'}`}>
                        <div className='modal-header'>
                            This note will be deleted
                        </div>
                        <div className="modal-footer">


                            <button type="button" className="btn btn-secondary" ref={ref2} data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" onClick={() => { deleteContact(contact._id); props.showAlert("Contact Deleted Succesfully", "success"); ref2.current.click(); }} >Delete</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`my-1`} >
                <div className={`card my-3 bg-${mode === 'light' ? 'light' : 'dark'}`} >
                    <div className="card-body">
                        <h5 className={`card-name `}>Name: {contact.name}</h5>
                        <p className="card-text"> <i className="fa-solid fa-phone"></i> {contact.mobile} </p>
                        <i className="fa-sharp fa-solid fa-trash mx-2" onClick={handleClick}></i>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateContact(contact) }}></i>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ContactItem
