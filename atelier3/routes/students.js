const express = require('express');
const router = express.Router();
var Student = require('../models/student');
const ss = require('../services/studentService');
router.get('/over18', ss.findOver18);
router.get('/note', ss.findNote);
router.get('/:id',ss.findById);
router.put('/note', ss.updateNote);
router.get('/', ss.findAll);

router.get('/name/:name', ss.findByName);
router.post('/', (req, res) => {
    Student.find({Name: req.body.Name}, (err, student) => {
        if (err) {
            console.log(err);
        } else {
            if (student.length > 0) {
                res.json('Student name already used');
            } else {
                
    new Student ({
        Name: req.body.Name,
        Age: req.body.Age,
        Note: req.body.Note
    }).save((err, newContact) => {
        if (err) {
            console.log("Error message: "+err);
        } else {
            console.log(newContact);
            res.json('Student added successfully id: '+newContact._id);
        }
    });
}}});
 });
 router.delete('/:id', ss.deleteById);

router.put('/:id', (req, res) => {
    Student.findById(req.params.id, (err, student) => {
        if (!student) {
            res.status(404).send("Student not found");
        } else {
            Student.find({Name: req.body.Name}, (err, students) => {
                if (err) {
                    console.log(err);
                } else {
                    if (students.length > 0 && students[0].Name != req.body.Name) {
                        res.json('Student name already used'+students[0].Name+"/"+req.body.Name);
                    } else {
            student.Name = req.body.Name;
            student.Age = req.body.Age;
            student.Note = req.body.Note;
            student.save().then(student => {
                res.json('Student updated successfully');
            }).catch(err => {
                res.status(400).send("Update not possible");
            });
        }}});
        }
    });
});

module.exports = router;