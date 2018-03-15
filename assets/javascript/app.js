// TO-DO:
// Add one-click download buttons

$(document).ready(function () {

    var apiKey = "DfJ63O6NryPFMaDm3SrMJ4Px1iwmzY4t";
    var gif;
    var queryURL;
    var suggestedGifs = ["science", "biology", "chemistry", "physics", "mathematics", "coding", "Bill Nye", "Marie Curie", "Neil deGrasse Tyson"]
    var userSearch = [];

    // CREATE SUGGESTED GIF TAGS
    function makeGifTags() {
        for (var i = 0; i < suggestedGifs.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("tags");
            gifButton.attr("data-name", suggestedGifs[i]);
            gifButton.html("<span class='glyphicon glyphicon-tag' aria-hidden='true'></span>" + " " + suggestedGifs[i]);

            $("#starting-tags").append(gifButton);
        }
    }

    // LOAD SEARCH TERM GIFS AND ADD TAG
    $("#go").on("click", function (event) {
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

        function displaySearchGif() {
            gif = search;
            callGif();
        };

        displaySearchGif();
        scrollTop();

    });

    // DISPLAY GIFS FROM TAG DATA-NAME
    function displayGifs() {
        gif = $(this).attr("data-name");
        callGif();
        scrollTop();
    };

    // SCROLL TO TOP
    function scrollTop() {
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    }

    // PAUSE AND ANIMATE GIFS
    function animateGifs() {
        var state = $(this).attr("data-state");
        console.log($(this).attr("src"));

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else if (state === "animate") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    };

    // AJAX CALL TO RETRIEVE GIFS FROM GIPHY
    function callGif() {
        queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            gif + "&api_key=" + apiKey + "&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                if (results[i].rating !== "r") {
                    var displayGif = $("<div>");
                    displayGif.addClass("display-gifs");

                    var p = $("<p>");
                    p.text("Rated: " + results[i].rating.toUpperCase());

                    var downloadWrapper = $("<span>");
                    var downloadLink = $("<a>");
                    downloadLink.attr("href", results[i].images.original.url)
                    downloadLink.attr("download", "");
                    downloadLink.attr("target", "_blank");
                    downloadLink.addClass("pull-right");
                    downloadLink.text("Alt/Option + ");
                    var download = $("<span class='glyphicon glyphicon-cloud-download'>");
                    downloadLink.append(download);
                    downloadWrapper.append(downloadLink);

                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height_still.url);
                    gifImage.attr("data-state", "still");
                    gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                    gifImage.attr("data-animate", results[i].images.fixed_height.url)
                    gifImage.addClass("gifs");
                    displayGif.append(gifImage);
                    p.append(downloadWrapper);
                    displayGif.append(p);
                    $("#gifs-appear-here").prepend(displayGif);
                };
            };

        });
    };

    makeGifTags();
    $(document).on("click", ".tags", displayGifs);
    $(document).on("click", ".gifs", animateGifs);

});