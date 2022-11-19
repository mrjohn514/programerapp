
{

  const element = document.getElementsByClassName("midr");
  var checkbox = document.getElementsByClassName('checkbox');
  const a=document.getElementsByClassName('work');
  const b=document.getElementsByClassName('pdate');
  const cm=document.getElementsByClassName('chipmid');
  
  const delbtn=document.getElementsByClassName('deltebtn')[0];
  
    
  
  for(let i=0;i<checkbox.length;i++)
  {
  checkbox[i].addEventListener('change', function(event) {
  
    if (this.checked) {
      element[i].style.display= "none" 
      a[i].style="text-decoration: line-through;"
      b[i].style="text-decoration: line-through;"
    } else {
      element[i].style.display = "block";
      a[i].style="text-decoration: none;"
      b[i].style="text-decoration: none;"
    }
  });
  
  
  
  }

 
  let mytodoconatiner=$(".mytodos").eq(0);
  let newtodoform=$("#todoform");

  newtodoform.submit(function(e){

   e.preventDefault();
  
  
$.ajax({
  type:'post',
  url: '/action/create-todo',                 //form action 
  data: newtodoform.serialize(),           //convert the form data into jason ie key value pairs {content: 'fdfndv'}
  
  
  success: function(data){      
  
  console.log(data.data);

  let newTodo = newTodoDom(data.data);
  
  mytodoconatiner.prepend(newTodo);

  
  },
  error:function(error){            //error is function wehre we recieve error any
  
  console.log(error.responseText);
  }
  
  })

   })



 let newTodoDom=function(d){
 
  return $(`
  <div id="todo-chip-${d.todo._id}"  class="chips">
  <div class="chipleft">
   <input type="checkbox"  name="id" class="checkbox" value=${d.todo._id}>
  </div>
  <div class="chipmid">
  <div class="midl">
   <p class="work">${d.todo.work}</p>
   <span class="calendar"><i class="fas fa-calendar"></i></span>
   <p class="pdate">${d.todo.date}</p>
  </div>

   <div class="midr from-left" style="background-color: ${d.clist[d.todo.category]};">
     <p>${d.todo.category}</p>
   </div>

  </div>

</div>
  
  `)
  

 }



 let chipform=$("#chipform");
 chipform.submit(function(e){

  e.preventDefault();
 
 
$.ajax({
 type:'post',
 url: '/action/delete-todo',                 //form action 
 data: chipform.serialize(),           //convert the form data into jason ie key value pairs {content: 'fdfndv'}
 
 
 success: function(data){      
 

 if( data.data.todos==undefined)
 {
 alert("hey u have not selected anything to delete");
 }
 else if(typeof(data.data.todos)=='string')
 {
  $(`#todo-chip-${data.data.todos}`).remove();
 }
 else
 {
  for(let i of data.data.todos)
  $(`#todo-chip-${i}`).remove();

 }

 
 },
 error:function(error){            //error is function wehre we recieve error any
 
 console.log(error.responseText);
 }
 
 })

  })





}