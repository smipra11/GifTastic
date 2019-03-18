 // store all the feelings in a array variable

var topics = ["happy", "sad",  "angry","grumpy","annoyed"];
// function to create a button
function renderButtons() {
  $("#buttonarea").empty();
  for (var i = 0; i < topics.length; i++) {

    var mybutton = $("<button>");
    mybutton.addClass("feelbutton");
    mybutton.attr("type", "button");
    mybutton.attr("data-feelings", topics[i]);

    mybutton.text(topics[i]);

    $("#buttonarea").append(mybutton);

  }
};
//calling that function here
renderButtons();
// function to get response back from AJAX call
function displaybuttonInfo() {

  var mySearch = $(this).attr("data-feelings");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    mySearch + "&api_key=dc6zaTOxFJmzC&limit=10&rating=G";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    var result = response.data;
    console.log(response);


   $("#imagearea").empty();
//create a images give them attribure and append them in image area div
    for (i = 0; i < result.length; i++) {

      var imageDiv = $("<div>")
      imageDiv.addClass("gifdiv")
      var myrating = result[i].rating;
      var displayRating = $("<p>").text("Rating: " + myrating)
      imageDiv.append(displayRating);
      var image = $("<img>");
      image.addClass("gifimage");
      //var imageUrl = result[i].images.fixed_height_still.url;
      image.attr("src", result[i].images.fixed_height_still.url);
      image.attr("data-still", result[i].images.fixed_height_still.url);
      image.attr("data-animate", result[i].images.fixed_height.url);
      image.attr("data-state", "still");
      imageDiv.append(displayRating);
      imageDiv.append(image);
      $("#imagearea").prepend(imageDiv);

    }

  });
}
//end of dispalybutton info function

// when you click on any buttons images display
$(document).on("click", ".feelbutton", displaybuttonInfo);

function playGif() {
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
};
// 

//when you click on image it animate when you click again it stops
$(document).on("click", ".gifimage", playGif);


// when user input text and click on submit button new button clicks
$("#submitButton").on("click", function(event) {


//when your click in input box create new function for that

event.preventDefault();
  var newTopics = $("#userinput").val().trim();
  topics.push(newTopics);
  renderButtons();
});

//(document).on("click", "#submitButton", newValue);
renderButtons();