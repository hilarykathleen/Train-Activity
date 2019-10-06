// 1. Initialize Firebase
// 2. Create button for adding new trains - then update the html + update the database
// 3. Create a way to retrieve train data from the train database.
// 4. Create a way to calculate when the next train will arrive; this should be relative to the current time
// 5. Then use moment.js formatting to set difference in military time.

// initialize firebase //

var firebaseConfig = {
    apiKey: "AIzaSyARLsFHHnRjnHTtfomX8ArxUoRRM6iN_W4",
    authDomain: "hilary-train.firebaseapp.com",
    databaseURL: "https://hilary-train.firebaseio.com",
    projectId: "hilary-train",
    storageBucket: "",
    messagingSenderId: "43944516443",
    appId: "1:43944516443:web:9546a09f4a64edb236987e"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// button for adding trains //

$("#add-train-btn").on("click", function(event) {
    event.preventDefault();

  // grabs user input //
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrain = moment($("#first-train-time-input").val().trim(), "HH:mm").format("X");
  var frequency = $("#frequency-input").val().trim();

  // creates local "temporary" object for holding train data //
  var newTrain = {
    name: trainName,
    dest: destination,
    first: firstTrain,
    freq: frequency
  };

  // uploads train data to the database //
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.dest);
  console.log(newTrain.first);
  console.log(newTrain.freq);

});
  