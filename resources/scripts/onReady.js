$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();
    // Add smooth scrolling on all links inside the navbar
    $("#menuBar a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 50
            }, 800, function() {
                window.location.hash = hash;
            });
        }
    });
});