$(function () {
    var syncClient;
    var syncStream;
    var message = document.getElementById('message');
    var text_area = document.getElementById('text_area');
    var select_element = document.getElementById('select')
    var background_color;


    $.getJSON('/token', function(tokenResponse) {
        syncClient = new Twilio.Sync.Client(tokenResponse.token, { logLevel: 'info' });

        // create the stream object
        syncClient.stream('messageData').then(function(stream) {
            syncStream = stream;
            // listen update and sync drawing data
            syncStream.on('messagePublished', function(event) {
                console.log('syncStream:',event.message.value);
                syncDrawingData(event.message.value);


            });
        });
    });
    
    function syncDrawingData(data) {
        console.log(data);
    }

    text_area.addEventListener('keyup', messageSync);
    function messageSync(event) {
        text = text_area.value;

        setTimeout(function(){
            settingSyncData();
        }, 1700);
    }

    function settingSyncData() {
        syncStream.publishMessage({
            text_area_value:text,
            text_color:background_color
        })
    }

    select_element.addEventListener('change', select_color);
    function select_color() {
        color = select_element.value

        if (color == 'white') {
            background_color = 'white'
        }
        if (color == 'red') {
            background_color = 'red'
        }
        if (color == 'green') {
            background_color = 'green'
        }
        if (color == 'yellow') {
            background_color = 'yellow'
        }
    }

    function syncDrawingData(data) {
        text_area.value = data.text_area_value

        if (data.text_color == 'white') {
            text_area.style.backgroundColor = 'white'
        }
        if (data.text_color == 'red') {
            text_area.style.backgroundColor = 'red'
        }
        if (data.text_color == 'green') {
            text_area.style.backgroundColor = 'green'
        }
        if (data.text_color == 'yellow') {
            text_area.style.backgroundColor = 'yellow'
        }
    }
});
