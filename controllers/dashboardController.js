// CRUD notes

const Note = require('../models/notes');
const mongoose = require('mongoose');


// GET / Dashboard

exports.dashboard = async (req, res) => {
    const locals = {
        title: 'Dashboard', 
        description: 'Free NodeJs Notes App.',
    }

    try {
        const notes = await Note.find({});
        
        res.render('dashboard/index', {
          userName: req.user.firstName,
          locals,
          notes,
          layout: '../views/layouts/dashboard'
    });
    } catch (error) {
        
    }

}


// GET view specific note

exports.dashboardViewNote = async(req, res) => {
    const note = await Note.findById({ _id: req.params.id }).where({ user: req.user.id }).lean();

if (note) {
    res.render('dashboard/view-note', {
        noteID: req.params.id,
        note,
        layout: '../views/layouts/dashboard'
    });
} else {
    res.send("Something went wrong.")
}


}


// PUT update specfic note

exports.dashboardUpdateNote = async(req, res) => {
 try {
    await Note.findOneAndUpdate(
        {_id: req.params.id},
        { title: req.body.title, body : req.body.body }
        ).where( {user: req.user.id });

        res.redirect('/dashboard');

 } catch (error) {
    console.log(error);
 }
}