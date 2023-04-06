function $(q) {
  return document.querySelector(q)
}

const API_KEY = 'bd25854b1c53a1bab9df171453a3f6e07fb61'

var mData = {
  name: '',
  email: ''
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

    var data = JSON.stringify({
      "author": mData.name,
      "message": $('#messageInp').value,
      "date": new Date()
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    xhr.open("POST", "https://qwerty-2432.restdb.io/rest/nesc");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("x-apikey", API_KEY);
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);
    refresh()
  }
}

var restoredData = []



function refresh() {
  var data = null;

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

        $('#body').innerHTML = ''

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


  xhr.open("GET", "https://qwerty-2432.restdb.io/rest/nesc");


  xhr.setRequestHeader("content-type", "application/json");
  xhr.setRequestHeader("x-apikey", API_KEY);
  xhr.setRequestHeader("cache-control", "no-cache");


  xhr.send(data);
}





setInterval(function() {
  refresh()
}, 10000)



setInterval(function() {
  document.querySelectorAll('.diarel').forEach(function(v, i) {
    v.style.height = v.querySelector('.dialoge').offsetHeight + 6 + 'px'
  })
})