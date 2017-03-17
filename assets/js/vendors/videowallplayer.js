// jwplayer module is the js library code the player in account that is provided
define(['jquery', 'jwplayer'], function($, jwplayer) {


        // setting up and configuring instance of JWPlayer
        var videowallplayer = jwplayer('wall-player').setup({
            autostart: true,
            controls: false,
            //playlist: fullPlaylist,
            mute: true,
            repeat: true,
            stretching: 'fill',
            height: '100%',
            width: '100%'
        });

});
