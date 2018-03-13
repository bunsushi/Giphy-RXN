// TO-DO:
// Make an array of objects to auto-populate suggested tags
// Make gifs load still and on-click animate
// Capture search terms to add new gif tags
// Add one-click download buttons

$(document).ready(function () {

    var apiKey = "DfJ63O6NryPFMaDm3SrMJ4Px1iwmzY4t";

    var gif;
    var queryURL;

    var suggestedGifs = ["science", "biology", "chemistry", "physics", "mathematics", "Bill Nye", "Neil deGrasse Tyson"]

    function makeGifTags() {
        for (var i=0; i < suggestedGifs.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("tags");
            gifButton.attr("data-name", suggestedGifs[i]);
            gifButton.html("<span class='glyphicon glyphicon-tag' aria-hidden='true'></span>" + " " +  suggestedGifs[i]);

            $("#starting-tags").append(gifButton);
        }
    }

    makeGifTags();

    $(".tags").on("click", function () {
        gif = $(this).attr("data-name");
        queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            gif + "&api_key=" + apiKey + "&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var displayGif = $("<div>");
                displayGif.addClass("display-gifs");

                var p = $("<p>");
                p.text("Rating: " + results[i].rating)

                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_still.url);
                gifImage.attr("state", "still");
                displayGif.append(gifImage);
                displayGif.append(p);
                $("#gifs-appear-here").prepend(displayGif);
            }

        });
    });

});