const express = require("express")
const router = express.Router();
const Contact = require("../Models/Contact")
const { body, validationResult } = require('express-validator');
const fetchuser = require("../middlewares/fetchuser")

// Fetching all  contacts
router.get("/fetchallcontacts", fetchuser, async (req, res) => {
    const contact = await Contact.find({ user: req.user.id })
    res.json(contact);
})

// Add a new Contact 
router.post("/addcontact", fetchuser, [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('mobile', 'Mobile No must be atleast 10 characters long').isLength({ min: 10 })

], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let contact = await Contact.findOne({ name: req.body.name })
        if (contact) {
            return res.status(400).json({ error: "Sorry a contact with this name already exists" });
        }
        contact = await Contact.create({
            name: req.body.name,
            mobile: req.body.mobile,
            email: req.body.email,
            user: req.user.id
        })

        res.json({ contact });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }
}
)

// Update an existing contact
router.put("/updatecontact/:id", fetchuser, async (req, res) => {
    let { name, mobile, email } = req.body;
    try {

        // Create a new contact object
        const newContact = {};
        if (name) { newContact.name = name }
        if (mobile) { newContact.mobile = mobile }
        if (email) { newContact.email = email }

        // Find the contact to be updated and update it
        let contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(400).send("Contact not found");
        }
        if (contact.user.toString() != req.user.id) {
            return res.status(400).send("Not allowed: User not authenticated");
        }

        contact = await Contact.findByIdAndUpdate(req.params.id, { $set: newContact }, { new: true })
        res.json({ contact })
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }
})

// Delete a Contact
router.delete("/deletecontact/:id", fetchuser, async (req, res) => {
    try {

        // Find the contact to be deleted and delete it
        let contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(400).send("Contact not found");
        }
        if (contact.user.toString() != req.user.id) {
            return res.status(400).send("Not allowed: User not authenticated");
        }

        contact = await Contact.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Contact has been deleted successfully", contact: contact })
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }
})




module.exports = router