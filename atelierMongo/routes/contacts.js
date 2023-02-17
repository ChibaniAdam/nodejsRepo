const express = require('express');
const router = express.Router();
var Contact = require('../models/contact');


router.get('/:id', (req, res) => {
    Contact.findById(req.params.id, (err, contact) => {
        if (err) {
            console.log(err);
        } else {
            res.json(contact);
        }
    });
});

router.delete('/:id', (req, res) => {
    Contact.findByIdAndRemove(req.params.id, (err, contact) => {
        if (err) {
            console.log(err);
        } else {
            res.json('Contact deleted successfully');
        }
    });
});

router.put('/:id', (req, res) => {
    Contact.findById(req.params.id, (err, contact) => {
        if (!contact) {
            res.status(404).send("Contact not found");
        } else {
            contact.FullName = req.body.FullName;
            contact.Phone = req.body.Phone;
            contact.save().then(contact => {
                res.json('Contact updated successfully');
            }).catch(err => {
                res.status(400).send("Update not possible");
            });
        }
    });
});

router.get('/', (req, res) => {
    Contact.find((err, contacts) => {
        if (err) {
            console.log(err);
        } else {
res.json(contacts);
            //res.render('form.twig',{title:"Contacts List", cont: contacts});
        }
    });
});



router.post('/', (req, res) => {
new Contact ({
    FullName: req.body.FullName,
    Phone: req.body.Phone
}).save((err, newContact) => {
    if (err) {
        console.log("Error message: "+err);
    } else {
        console.log(newContact);
        res.json('Contact added successfully id: '+newContact._id);
    }
});
});

module.exports = router;