const express = require('express');
const Story = require('../models/Story');
const { ensureAuth } = require('../middleware/authMiddleware');

const router = express.Router();

// @DES Show add page
// @GET /stories/add
router.get('/add', ensureAuth,(req,res) => {
    res.render('stories/add');
});

// @desc    Process add form
// @route   POST /stories
router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id
        await Story.create(req.body)
        res.redirect('/dashboard')
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

// @DES Show All stories
// @GET /stories/
router.get('/', ensureAuth, async(req,res) => {
    try {
        const stories = await Story.find({status:'public'}).populate('user').sort({createdAt:'desc'}).lean();

        res.render('stories/index',{
            stories,
        });
    } catch (err) {
        console.log(err);
        res.render('error/500')
    }
});


module.exports = router;