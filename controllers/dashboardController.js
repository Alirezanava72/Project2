// CRUD notes

const Note = require('../models/notes');
const mongoose = require('mongoose');



exports.dashboard = async (req, res) => {
    const locals = {
        title: 'Dashboard', 
        description: 'Free NodeJs Notes App.',
    }

    res.render('dashboard/index', {
        locals,
        layout: '../views/layouts/dashboard'
    });
}