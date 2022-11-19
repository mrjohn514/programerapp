
const { findById } = require('../models/user');
const User = require('../models/user');

module.exports.home=async function(req,res)
{

try {
    
  if(req.user)
  {
   
 let user= await User.findById(req.user._id);
 console.log(user);
if(user)
{
  console.log("we are in ser");
  console.log(user);
    return res.render('home',{                    
        username:user.name,
      });
}
return res.redirect('/');


  }
  return res.render("home");


} catch (error) {
    if(err)
    {
        console.log("error");
        return;
    }
}
   

    res.render('home');
}