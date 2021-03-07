function toggle(){
    var popup = document.getElementById('popup');
    popup.classList.toggle('active');
}

var playOn = document.getElementById('song');

function playing(){
  playOn.play();
}

AOS.init();

var countDownDate = new Date("Mar 21, 2021 09:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the countdown date
  var distance = countDownDate - now;

  // Calculate Remaining Time
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("day").innerHTML = days;
  document.getElementById("hour").innerHTML = hours;
  document.getElementById("minute").innerHTML = minutes;
  document.getElementById("second").innerHTML = seconds;

  // If the countdown is finished, write some text
  function timesup(){
      var habis = document.getElementById("habis");
      habis.classList.toggle('aktif');
      
      var waktu = document.getElementById("times");
      waktu.classList.toggle('aktif');
      var waktu1 = document.getElementById("times1");
      waktu1.classList.toggle('aktif');
      var waktu2 = document.getElementById("times2");
      waktu2.classList.toggle('aktif');
      var waktu3 = document.getElementById("times3");
      waktu3.classList.toggle('aktif');

      var separator = document.getElementById("separator");
      var separator1 = document.getElementById("separator1");
      var separator2 = document.getElementById("separator2");

      separator.classList.toggle('aktif');
      separator1.classList.toggle('aktif');
      separator2.classList.toggle('aktif');
    }
  
  if (distance < 0) {
    clearInterval(x);
    timesup();
    document.getElementById("habis").innerHTML = "Pernikahan 'sedang' / 'telah selesai' dilaksanakan";
  }
}, 1000);

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCkcUUPmAqiGm6MoZApVZTxrsbh9Uys-Cc",
  authDomain: "mita-5bb95.firebaseapp.com",
  databaseURL: "https://mita-5bb95-default-rtdb.firebaseio.com",
  projectId: "mita-5bb95",
  storageBucket: "mita-5bb95.appspot.com",
  messagingSenderId: "425119333880",
  appId: "1:425119333880:web:d0f422cb43cca5ad88aa0d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  
  function add_task(){
    input_box = document.getElementById("message");
    input_date = document.getElementById("name");
  
    if(input_box.value.length != 0 && input_date.value.length != 0){
      // our boxes have data and we take database
      var key = firebase.database().ref().child("mita").push().key;
      var task = {
        title: input_box.value,
        date: input_date.value,
        key: key
      };
  
      var updates = {};
      updates["/mita/" + key] = task;
      firebase.database().ref().update(updates);
      create_unfinished_task();
      document.getElementById("name").value=''; 
      document.getElementById("message").value='';
    }
  }


function create_unfinished_task(){
    unfinished_task_container = document.getElementsByClassName("container1")[0];
    unfinished_task_container.innerHTML = "";
  
    task_array = [];
    firebase.database().ref("mita").once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        task_array.push(Object.values(childData));
      });
      for(var i, i = 0; i < task_array.length; i++){
        task_date = task_array[i][0];
        task_key = task_array[i][1];
        task_title = task_array[i][2];  
  
        task_container = document.createElement("div");
        task_container.setAttribute("class", "task_container");
        task_container.setAttribute("data-key", task_key);
  
        // TASK DATA  
        task_data = document.createElement('div');
        task_data.setAttribute('id', 'task_data');
  
        title = document.createElement('p');
        title.setAttribute('id', 'task_title');
        title.innerHTML = task_title;
  
        date = document.createElement('p');
        date.setAttribute('id', 'task_date');
        date.innerHTML = "-" + task_date + "-";


  
        unfinished_task_container.append(task_container);
        task_container.append(task_data);
        task_data.append(title);
        task_data.append(date);
      }
  
    });
  
  }
