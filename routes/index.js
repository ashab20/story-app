const express = require('express');
const Story = require('../models/Story');
const {ensureAuth, ensureGuest} = require('../middleware/authMiddleware');

const router = express.Router();

// @DES /login landing page
// @GET / requirest
router.get('/', ensureGuest,(req,res) => {
    res.render('login',{
        layout:'login',
    });
});

// @DES /Deshboard landing page
// @GET / requirest
router.get('/dashboard',ensureAuth, async (req,res) => {
    try {
        const stories = await Story.find({ user: req.user.id }).lean()
        res.render('dashboard', {
            name: req.user.firstName,
            stories,
        })
        } catch (err) {
        console.error(err)
        res.render('error/500')
        }

});

module.exports = router;