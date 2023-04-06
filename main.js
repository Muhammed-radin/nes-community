function $(q) {
  return document.querySelector(q)
}

const API_KEY = '642e83c839cf552ef728c028'

var mData = {
  name: '',
  email: ''
}

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  // the hour '0' should be '12' 
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}





refresh()


if (localStorage.getItem('data')) {
  $('.model').style.display = 'none'
  $('.block-div').style.display = 'none'
  mData = JSON.parse(localStorage.getItem('data'))
}

document.getElementById('sumbit').onclick = function() {
  if ($('#userName').value && $('#email').value) {
    $('.log').innerHTML = ''
    mData.name = $('#userName').value
    mData.email = $('#email').value
    $('.model').style.display = 'none'
    $('.block-div').style.display = 'none'
    localStorage.setItem('data', JSON.stringify(mData))
  } else {
    $('.log').innerHTML = 'type name and email'
  }
}

document.getElementById('sendBtn').onclick = function() {
  if ($('#messageInp').value) {

    var nowDate = formatAMPM(new Date())

    var data = JSON.stringify({
      "author": mData.name,
      "message": $('#messageInp').value,
      "date": nowDate
    });


    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        //console.log(this.response);
      }
    });

    xhr.open("POST", "https://greanleaf-d8a1.restdb.io/rest/communication");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("x-apikey", API_KEY);
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);
    //refresh()


    var htmlCode = `<div class="msg-model"><div>
          <div class="message-div msg-right">
            <author>${mData.name}</author>
            <div class="message">
              ${$('#messageInp').value}
            </div>
            <time>${nowDate}</time>
          </div>
        </div></div>`

    $('#body').innerHTML += htmlCode
    $('#body').scrollTo(0, 999999999999)
    $('#messageInp').value = ''
  }
}

var restoredData = []



function refresh() {
  var bodyData = null;

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = false;

  xhr.addEventListener('readystatechange', function() {
    if (this.readyState === 4) {
      if (this.status == 0) {
        $('#status').innerHTML = `
        <p class="subtext">active</p> 
        <div class="status yellow" > </div>`
      } else {
        $('#status').innerHTML = `
        <p class="subtext">online</p> 
        <div class="status"> </div>`



        var data = JSON.parse(this.response)
        //console.log(data);

        $('#body').innerHTML = `<div class="diarel">
      <div class="dialoge">welcome never ending struggle game community</div>
    </div>
    <div class="msg-model">
      <div class="message-div msg-left">
        <author>Radin</author>
        <div class="message">
          <img src="HbCcfmxrd0pIl2263APn--1--li78k-01.jpeg" alt="logo">
          <h3>never-ending-struggle trailer version</h3>
          <hr>
          <p>get never-ending-struggle(nes) latest version, its free download now</p>
          <button>download</button><button>view</button>
        </div>
        <time>2:00pm</time>
      </div>
    </div>`


        data.sort((a, b) => {
          return b.date - a.date;
        });



        //console.log(data);

        data.forEach(function(dat, i) {
          //if (dat == restoredData[i]) {

          //} else {

          var htmlCode = `<div class="msg-model"><div>
          <div class="message-div ${mData.name == dat.author ? 'msg-right' : 'msg-left'}">
            <author>${dat.author}</author>
            <div class="message">
              ${dat.message}
            </div>
            <time>${dat.date}</time>
          </div>
        </div></div>`

          restoredData.push(dat)
          $('#body').innerHTML += htmlCode
          //$('#body').scrollTo(0, (-$("#body").scrollHeight))
          setTimeout(function() {
            $("#body").scrollY = ($("#body").scrollHeight)
            //console.log($('#body').scrollY);
          }, 200)
          // }
        })
      }
    }
  });


  xhr.open("GET", "https://greanleaf-d8a1.restdb.io/rest/communication");


  xhr.setRequestHeader("content-type", "application/json");
  xhr.setRequestHeader("x-apikey", API_KEY);
  xhr.setRequestHeader("cache-control", "no-cache");

  xhr.send(bodyData);
}





setInterval(function() {
  /* var data = null;

   var xhr = new XMLHttpRequest();
   xhr.withCredentials = false;

   xhr.addEventListener('readystatechange', function() {
     if (this.readyState === 4) {
       if (this.status == 0) {
         console.log(xhr);
         $('#status').innerHTML = `
         <p class="subtext">offline</p> 
         <div class="status red" > </div>`
       } else {
         $('#status').innerHTML = `
         <p class="subtext">online</p> 
         <div class="status" > </div>`

         var data = JSON.parse(this.response)
         console.log(data);

         $('#body').innerHTML = `<div class="diarel">
               <div class="dialoge">welcome never ending struggle game community</div>
             </div> <div>
           <div class="message-div">
                 <author>Radin</author>
                 <div class="message">
                   <img src="HbCcfmxrd0pIl2263APn--1--li78k-01.jpeg" alt="logo">
                   <h3>never-ending-struggle trailer version</h3>
                   <hr>
                   <p>get never-ending-struggle(nes) latest version, its free download now</p>
                   <button>download</button><button>view</button>
                 </div>
                 <time>2:00pm</time>
               </div> </div>`

         data.forEach(function(dat, i) {
           if (dat == restoredData[i]) {} else {
             var htmlCode = `<div>
           <div class="message-div">
             <author>${dat.author}</author>
             <div class="message">
               ${dat.message}
             </div>
             <time>${dat.date}</time>
           </div>
         </div>`

             $('#body').innerHTML += htmlCode
           }
         })
       }
     }
   });


   xhr.open("GET", "https://greanleaf-d8a1.restdb.io/rest/communication");


   xhr.setRequestHeader("content-type", "application/json");
   xhr.setRequestHeader("x-apikey", API_KEY);
   xhr.setRequestHeader("cache-control", "no-cache");

   xhr.send(data);*/

  refresh()

}, 10000)



setInterval(function() {
  document.querySelectorAll('.diarel').forEach(function(v, i) {
    v.style.height = v.querySelector('.dialoge').offsetHeight + 6 + 'px'
    v.className = 'diarel-m'
  })

  document.querySelectorAll('.msg-model').forEach(function(v, i) {
    v.style.height = v.querySelector('.message-div').offsetHeight + 8 + 'px'
    v.className = 'msg-model-m'
  })
})