const passport = require('../../auth/passport')



module.exports.getSignIn = (req,res,next)=>{
    // if(req.user) return res.render('profile')
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