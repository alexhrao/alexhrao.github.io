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
    
    $.ajax({
        url: 'https://api.github.com/emojis'
    }).then(function(data) {
        window.emojis = Object.keys(data);
        window.emojiUrls = data;
    });

    $('#messageEditor').summernote({
        placeholder: 'Your message to me. For emojis, type ":" followed by the name of the emoji.',
        height: 300,
        minHeight: null,
        maxHeight: null,
        focus: false,
        hint: {
            match: /:([\-+\w]+)$/,
            search: function(key, call) {
                call($.grep(emojis, function(item) {
                    return item.indexOf(key) === 0;
                }));
            },
            template: function(item) {
                var content = emojiUrls[item];
                return '<img src="' + content + '" width="20" /> :' + item + ':';
            },
            content: function(item) {
                var url = emojiUrls[item];
                if (url) {
                    return $('<img />').attr('src', url).css('width', 20)[0];
                };
                return '';
            }
        }
    });
    
    $('#sendMessage').click(function() {
        var dt = new Date($.now());
        emailjs.send("gmail", "default", {
            name: $('#contactName').val(),
            email: $('#contactEmail').val(),
            content: $('#messageEditor').summernote('code'),
            time: dt.getFullYear() + "-" + addZero(dt.getMonth()) + "-" + addZero(dt.getDay()) + " " + addZero(dt.getHours()) + ":" + addZero(dt.getMinutes() + ":" + addZero(dt.getSeconds()))
        })
        .then(function(response) {
            $('#messenger').show();
            $('#messenger').append("<div id='messageSent' class='alert alert-success alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Success!</strong> Your message was successfully delivered!</div>").delay(2500).fadeOut(1000, function() {
                $('#messenger').empty();
            });
            $('#messageEditor').summernote 
        }, function(err) {
            $('#messenger').show();
            $('#messenger').append("<div id='messageSent' class='alert alert-danger alert-dismissable'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Drats!</strong> We couldn't send your message. Please try again later.</div>").delay(2500).fadeOut(1000, function() {
                $('#messenger').empty();
            });
        });
    });
});

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}