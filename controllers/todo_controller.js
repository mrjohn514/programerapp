
const Todo=require('../models/todoapp');
const User=require('../models/user');

var color_list={
    eating:"#ff2b75;",
    gym:"rgb(9, 171, 225)",
    home:"rgb(210, 14, 213)",
    cleanning:"#201487",
    market:"orange",
    other:"#ff2b75;"
  }

  
module.exports.todo= async function(req , res){

console.log(req.user);

//altering the user_id cookie to value 25 by res.cookie //altering the data of cookies came through req
// res.cookie('user_id',29);

  try {
  

    //and this post part is now awating and any success responce will be stored in let post 
  
   if(req.user)
   {
    let user = await User.findById(req.user._id)                                              //await 1  first this get executed          
    .populate({                       
    path:'todos'               
    });
                                  
    if(user){
     
        return res.render('todo',{                    
            todo_list:user.todos,
            title:"my Todo list",
            clist:color_list
          });
   
    }
    // if user is not logged in dont show freinds so dont pass cuser
      return res.redirect('/user/signin');
   }

    return res.redirect('/user/signin');
    
    }catch(err){
    console.log("error",err);
    return;
    }



} 