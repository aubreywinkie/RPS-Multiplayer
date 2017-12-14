var config = {
    apiKey: "AIzaSyCZeM4x7yLf8uyHA-nmcXAWbCfBCbGiP9g",
    authDomain: "train-be7f2.firebaseapp.com",
    databaseURL: "https://train-be7f2.firebaseio.com",
    projectId: "train-be7f2",
    storageBucket: "",
    messagingSenderId: "282134874184"
  };
firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainStart = moment($("#first-input").val().trim());
  var trainFrequency = $("#rate-input").val().trim();
  var firstTime = moment(trainStart, "hh:mm").subtract(1, "years");
  var curentTime = moment();
  var difference = moment().diff(moment(firstTime), "minutes");
  var remainder = difference % trainFrequency;
  var minutesTil = trainFrequency - remainder
  var nextTrain = moment().add(minutesTil, "minutes").format("hh:mm");
  

  var newTrain = {
    name: trainName,
    destination: trainDestination,
    start: trainStart,
    frequency: trainFrequency,
    nextArrival: nextTrain,
    minutesAway: minutesTil
  };

  database.ref().push(newTrain);
  
  console.log(newtrain.name);
  console.log(trainDestination.destination);
  console.log(trainStart.start);
  console.log(trainFrequency.frequency);

  alert("Train successfully added");

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-input").val("");
  $("#rate-input").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().role;
  var trainStart = childSnapshot.val().start;
  var trainFrequency = childSnapshot.val().rate;
  var nextTrain = childSnapshot.val().nextArrival
  var minutesTil = childSnapshot.val().minutesAway

  console.log(trainName);
  console.log(trainDestination);
  console.log(trainStart);
  console.log(trainFrequency);

  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainStart + "</td><td>" + trainFrequency + "</td><td>");
});
