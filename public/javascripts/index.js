var eventSource = new EventSource('http://localhost:3000/convert/listen-for-conversion');
eventSource.addEventListener('converted', function (e) {
  document.getElementById('result').innerHTML = JSON.parse(e.data)
});

document.getElementById('convert').addEventListener('click',
  function () {
    var number = document.getElementById('number').value;
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/convert", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("number=" + number)
  }
)