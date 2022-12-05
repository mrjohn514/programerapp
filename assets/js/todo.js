
{

  const element = document.getElementsByClassName("midr");
  // const a=document.getElementsByClassName('work');
  // const b=document.getElementsByClassName('pdate');
  // const cm=document.getElementsByClassName('chipmid');
  
  const delbtn=document.getElementsByClassName('deltebtn')[0];
  
    
  
  let trigercheck=function()
  {
 
    let checkbox = document.getElementsByClassName('checkbox');
    for(let i=0;i<checkbox.length;i++)
    {
    checkbox[i].addEventListener('change', function(event) {
  
       //if not do like this then only cheking one all previous element a b got changed so 
       //to change only related elemnt a and b we select them only 
       //this.value return value of checkbox 
      console.log(this.value);
      let element=$('#todo-chip-'+ this.value +' .midr')
      let a=$('#todo-chip-'+ this.value+' .work');
      let b=$('#todo-chip-'+ this.value+' .pdate');
        
      if (this.checked) {

        element[0].style.display= "none" 
        a[0].style="text-decoration: line-through;"
        b[0].style="text-decoration: line-through;"
      } else {
        element[0].style.display = "block";
        a[0].style="text-decoration: none;"
        b[0].style="text-decoration: none;"
      }
    });
    
    
    
    }
  }
  trigercheck();

 
  let mytodoconatiner=$(".mytodos").eq(0);
  let newtodoform=$("#todoform");

  newtodoform.submit(function(e){

   e.preventDefault();
  
  
$.ajax({
  type:'post',
  url: '/action/create-todo',                 //form action 
  data: newtodoform.serialize(),           //convert the form data into jason ie key value pairs {content: 'fdfndv'}
  
  
  success: function(data){      
  
  console.log("creatd todo",data.data);

  let newTodo = newTodoDom(data.data);
  
   console.log("id",data.data.todo._id);
  
  mytodoconatiner.prepend(newTodo);
  trigercheck();
  // var atodo=$('#todo-chip-'+ data.data.todo._id);
  // console.log("hi",atodo);
  // var checkbox=$('#todo-chip-'+ data.data.todo._id +' input:checkbox:first');
  // var element=$('#todo-chip-'+ data.data.todo._id +' .midr')
  // var a=$('#todo-chip-'+ data.data.todo._id+' .work');
  // var b=$('#todo-chip-'+ data.data.todo._id+' .pdate');

  // console.log("check is",b[0]);

  // checkbox[0].addEventListener('change', function(event) {
  
  //   if (this.checked) {
  //     element[0].style.display= "none" 
  //     a[0].style="text-decoration: line-through;"
  //     b[0].style="text-decoration: line-through;"
  //   } else {
  //     element[0].style.display = "block";
  //     a[0].style="text-decoration: none;"
  //     b[0].style="text-decoration: none;"
  //   }
  // });




  
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
 
 console.log("delted todo",data.data);

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