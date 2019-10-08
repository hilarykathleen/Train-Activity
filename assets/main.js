// 1. Initialize Firebase
// 2. Create button for adding new trains - then update the html + update the database
// 3. Create a way to retrieve train data from the train database.
// 4. Create a way to calculate when the next train will arrive; this should be relative to the current time
// 5. Then use moment.js formatting to set difference in military time.

// initialize firebase //
$(document).ready(function(){

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
    var firstTrain = moment($("#first-train-time-input").val().trim(), "HH:mm").format("LT");
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


    // clears all of the text-boxes //
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");

    });

    // create Firebase event for adding train to the database and a row in the html when a user adds an entry
    database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().dest;
    var firstTrain = parseInt(childSnapshot.val().first);
    var frequency = parseInt(childSnapshot.val().freq);

        // console.log("trying to modulo " + typeof(firstTrain) + " and  " + typeof(frequency));
    var remainder = firstTrain % frequency;
    console.log(remainder, 'remainder')
    var minAway = frequency - remainder;
    console.log(minAway);


    // calculate  next arrival//
    var nextArrival = moment().add(minAway, "minutes");
    nextArrival = moment(nextArrival).format("HH:mm");
    console.log(nextArrival);

    $("#new-train-table").append("<tr><td>" + trainName +
            "<td>" + destination +
            "<td>" + frequency +
            "<td>" + nextArrival + 
            "<td>" + minAway + "<td>");

    });

});