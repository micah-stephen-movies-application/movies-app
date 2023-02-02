fetch("https://tulip-marsh-cake.glitch.me/movies")
.then(function(response){
    return response.json();
}).then(function(data){
    console.log(data);
})
$(document).ready(function () {
    $('body').append('<div style="" id="loadingDiv"><div class="loader">Loading...</div></div>');
    $(window).on('load', function () {
        setTimeout(removeLoader, 2000); //wait for page load PLUS two seconds.
    });
    function removeLoader() {
        $("#loadingDiv").fadeOut(500, function () {
            // fadeOut complete. Remove the loading div
            $("#loadingDiv").remove(); //makes page more lightweight
        });
    }
});