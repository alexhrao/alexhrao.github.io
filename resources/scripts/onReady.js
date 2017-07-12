$(document).ready(function() {
    emailjs.init("user_F0kE6IBMQ9Lm6OLpQRxDf")
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();
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
    $('#logoName').hide();
    $('#logo').hover(
        function() {
            $('#logoImage').hide();
            $('#logoName').fadeIn(500);
        },
        function() {
            $('#logoName').hide();
            $('#logoImage').fadeIn(500);
        }
    );
    $('#messageEditor').summernote({
        height: 300,
        minHeight: null,
        maxHeight: null,
        focus: false
    });
    $('#sendMessage').click(function() {
        emailjs.send("gmail", "default", {name: $('#contactName').val(), email: $('#contactEmail').val(), content: $('#messageContent').summernote('code')})
        .then(function(response) {
            $('#messenger').show();
            $('#messenger').append("<div id='messageSent' class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Success!</strong> Your message was successfully delivered!</div>").delay(2500).fadeOut(1000, function() {
                $('#messenger').empty();
            });
        }, function(err) {
            $('#messenger').show();
            $('#messenger').append("<div id='messageSent' class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Drats!</strong> We couldn't send your message. Please try again later.</div>").delay(2500).fadeOut(1000, function() {
                $('#messenger').empty();
            });
        });
    });
});