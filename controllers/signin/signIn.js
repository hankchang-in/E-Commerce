const passport = require('../../auth/passport')



module.exports.getSignIn = (req,res,next)=>{
    res.render('login' ,{
        message : req.flash('message')
    })
}

// module.exports.postSignIn = (req,res,next)=>{
//     passport.authenticate('local', { failureRedirect: '/login' }),
//     function(req, res) {
//     res.redirect('/');
// }
// }