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
    var userSearch = [];

    function makeGifTags() {
        for (var i = 0; i < suggestedGifs.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("tags");
            gifButton.attr("data-name", suggestedGifs[i]);
            gifButton.html("<span class='glyphicon glyphicon-tag' aria-hidden='true'></span>" + " " + suggestedGifs[i]);

            $("#starting-tags").append(gifButton);
        }
    }

    $("#go").on("click", function(event) {
        event.preventDefault();

        var search = $("#search-term").val().trim();
        userSearch.push(search);

        $("#user-tags").text("");

        for (var i = 0; i < userSearch.length; i++) {
            var searchButton = $("<button>");
            searchButton.addClass("tags");
            searchButton.attr("data-name", userSearch[i]);
            searchButton.html("<span class='glyphicon glyphicon-tag' aria-hidden='true'></span>" + " " + userSearch[i]);

            $("#user-tags").append(searchButton);
        }
    });

    function displayGifs() {
        gif = $(this).attr("data-name");
        console.log(gif);
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
                gifImage.attr("data-state", "still");
                gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                gifImage.attr("data-animate", results[i].images.fixed_height.url)
                gifImage.addClass("gifs");
                displayGif.append(gifImage);
                displayGif.append(p);
                $("#gifs-appear-here").prepend(displayGif);
            }

            // $(".gifs").hover(function () {
            //     $(this).attr("src", $(this).attr("data-animate"));
            //     $(this).attr("data-state", "animate");
            // },
            // function () {
            //     $(this).attr("src", $(this).attr("data-still"));
            //     $(this).attr("data-state", "still");
            // });

            $(".gifs").on("click", function () {
                var state = $(this).attr("data-state");
                console.log($(this).attr("src"));

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else if (state === "animate") {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });

        }); 

    };

    makeGifTags();
    $(document).on("click", ".tags", displayGifs);

});