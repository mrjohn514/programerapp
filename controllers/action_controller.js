// import database configuaration here it is important becaouse controller usees db rather than in home
const db = require('../config/mongoose')
const { findById } = require('../models/todoapp')

// import database model
const todo = require('../models/todoapp')

//improting user db
const User = require('../models/user')

var color_list = {
  eating: '#ff2b75;',
  gym: 'rgb(9, 171, 225)',
  home: 'rgb(210, 14, 213)',
  cleanning: '#201487',
  market: 'orange',
  other: '#ff2b75;',
}

// This function will create a new task entry in the database from the entered data and refresh the whole page
// module.exports.create =  function(req,res){

//     User.findById(req.user.id,function(err,user){

//    if(err){console.log("erro finding user ");return}

//    if(user)
//    {
//     console.log(user);
//     todo.create({
//       work:req.body.work,
//       category:req.body.category,
//       date:req.body.date

//       },function(err,newtodo){
//       if(err)
//       {
//         console.log("errerr");
//         return
//       }

//     console.log(newtodo._id);

//       user.todos.push(newtodo._id);
//       user.save();

//       console.log('*********',newtodo);
//       return res.redirect('back');

//       });

//   }
//   else
//   {
//     return res.redirect('back');
//   }

//    })

// }

module.exports.create = async function (req, res) {
  try {
    let user = await User.findById(req.user.id)

    if (user) {
      let newtodo = await todo.create({
        work: req.body.work,
        category: req.body.category,
        date: req.body.date,
      })

      user.todos.push(newtodo._id)
      user.save()

      if (req.xhr) {
        return res.status(200).json({
          data: {
            todo: newtodo,
            clist: color_list,
          },
          message: 'postcreated',
        })
      }
    } else return
  } catch (error) {
    console.log('facing eror', error)
    return
  }
}

// module.exports.delete=async function(req,res){

//   console.log("in delete");
//   console.log("reqcontains",req.body);

//       // If user haven't selected any task to delete
//       if(req.body.id == undefined){
//         console.log("User haven't selected any task to delete");
//         return res.redirect('back');
//     }
//     // If only one task is to be deleted
//     else if(typeof(req.body.id) == 'string'){

//           await todo.findByIdAndDelete(req.body.id);
//           await User.findByIdAndUpdate(req.user.id,{ $pull:{todos:req.body.id }});
//           return res.redirect('back');

//     }
//     // If multiple tasks are to be deleted
//     else{
//         for(let i of req.body.id){

//           await todo.findByIdAndDelete(i);
//           await User.findByIdAndUpdate(req.user.id,{ $pull:{todos:i }});
//         }
//         return res.redirect('back');
//     }

//   }

module.exports.delete = async function (req, res) {
  try {
    console.log('in delete')
    console.log(req.body)
    if (req.body.id == undefined) {
      console.log("User haven't selected any task to delete")
    } else if (typeof req.body.id == 'string') {
      await todo.findByIdAndDelete(req.body.id)
      await User.findByIdAndUpdate(req.user.id, {
        $pull: { todos: req.body.id },
      })
    } else {
      for (let i of req.body.id) {
        await todo.findByIdAndDelete(i)
        await User.findByIdAndUpdate(req.user.id, { $pull: { todos: i } })
      }
    }

    if (req.xhr) {
      return res.status(200).json({
        data: {
          todos: req.body.id,
        },
        message: 'postcreated',
      })
    } else return
  } catch (error) {
    console.log('facing eror', error)
    return
  }
}
