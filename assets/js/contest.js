{
  
 let latestcontainer=$(".latestrelease").eq(0);
 let latestcontainer2=$(".latestrelease").eq(1);

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = hours;}
    if (minutes < 10) {minutes = minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}

    if(minutes=='0')
    return hours+'hr';
    else
    return hours+'hr '+minutes+'min';
}




function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }


    $(document).ready(
        function() {
            loadValues();
            setInterval(loadValues, 100000);
        }
    );



var loadValues=function(){


    $.ajax({
        type:'get',
        url: 'https://kontests.net/api/v1/all',               
        
        success: function(data){                    

            
      for(let d of data)
      {
        let newContest = newcontestdom(d);
      

        if(d.in_24_hours=="Yes"){
        latestcontainer.prepend(newContest);
        }
        else if(d.in_24_hours=="No"){
        latestcontainer2.prepend(newContest);
        }
      }  
        },
        error:function(error){           
        
        console.log(error.responseText);
        }
        
        })

}





let newcontestdom=function(data)
{
    let site=data.site;
    let d=data.start_time.toString();
    let s=new Date(d);
    let day= s.toString().split(' ')[0];
  
   let nd= s.toString().split(' ')[1]+"-"+s.toString().split(' ')[2]+"-"+s.toString().split(' ')[3];
   console.log(s);

    let st= formatAMPM(s);
    let sd=d.substr(0,9);
    let hour=data.duration.toHHMMSS();


    return $(` 
    <a href="${data.url}" class="achip">
    <div class="latest1">
      <div class="latestleft">
        <img src="/images/${site}.png" alt="">
      </div>
      <div class="latestright">
        <h4>${data.name}</h4>
        <p>On: ${nd}</p>
        <p>Duration: ${hour}</p>
        <p>At: ${day} ${st}</p>
      </div>
    </div>
    </a>
  `)
}



}