const express = require('express')
const passport = require('passport');
const router = express.Router();

// @DES Auth with Google
// @Route GET /auth/google
router.get('/google',passport.authenticate('google', {scope: ['profile']}));

// @DES google auth callback
// @Route GET /auth/googel/callback
router.get('/google/callback', passport.authenticate('google' , {failureRedirect: '/'}), (req,res) =>  {
    res.redirect('/dashboard');
    
});


// @Desc Logout
// @Route /auth/logout
router.get('/logout', (req,res) => {
    req.logOut();
    res.redirect('/')
}) 

module.exports = router;