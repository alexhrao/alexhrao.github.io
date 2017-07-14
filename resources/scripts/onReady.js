$(document).ready(function() {
    startUp();
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

var welcome = [
    "Welcome. I'm glad you're here.",
    "Wilkomen. Ich bin froh, dass du hier bist.",
    "Alexander.getSalutation();",
    "Receperint. Gaudeo te hic.",
    "欢迎。我很高兴你在这里",
    "ようこそ。あなたがここにいることをうれしく思います。",
    "स्वागत हे। मुझे खुशी है कि तुम यहाँ हो।",
    "Bienvenue. Je suis content que tu sois là.",
    "أهلا بك. أنا سعيد لأنك هنا.",
    "Bienvenido. Me alegra que estes aqui.",
    "Benvenuto. Sono contento che tu sia qui."
]
var ind = 0;

function changeWelcome() {
    $('#welcome').fadeOut('fast', function() {
            $('#welcome').text(welcome[ind]);
            $('#welcome').fadeIn('fast');
    });
    if (++ind == welcome.length) {
        ind = 0;
    }
}

function startUp() {
    $('body > :not(#beginning)').addClass("blurred");
    $('#beginning')
    .show()
    .typeIt({
        autoStart: true,
        deleteSpeed: 100,
        speed: 50,
        callback: function() {
            $('#beginning').fadeOut(1000, function() {
                $('body > :not(#beginning)')
                .addClass("unblurred")
                .removeClass("blurred");
                setInterval(changeWelcome, 5000);
            });
        }
    })
    .tiType("Hi there!")
    .tiPause(1000)
    .tiDelete(9)
    .tiType("I'm happy you made it")
    .tiPause(1500)
    .tiDelete(21)
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}