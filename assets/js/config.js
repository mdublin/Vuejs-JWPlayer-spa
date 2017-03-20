//config.js module

requirejs.config({
    baseUrl: './assets/js',
    //deps: ['app/main'], //deps for depends, this file depends on app/mail file being run to kick off app after the other properties here are loaded
    paths: {
         //'jquery': 'vendors/jquery-3.1.1.min',
        'jquery': 'vendors/jquery-1.8.0.min',
        'bootstrap': 'vendors/bootstrap',
        'vue': 'vendors/vue.min',
        'jwplayer': 'vendors/jwplayer-7.9.3/jwplayer',//this is just the js code provided by jwplayer in the dashboard for a spcific player from my account
        'jwpbackground': 'vendors/jwplayerBackground',
        'videowallplayer': 'vendors/videowallplayer'
    }
    //shim: {       //shim property used to synchronously load libaries that are not setup as AMD modules and that have dependencies, that way requirejs will make sure any libraries a non-AMD library depends will be loaded in the right order
    //    'highstock': ['jquery']
    // }
});

// start loading the main app file, put all of yoru application logic in there.
// the main.js file is itself an AMD module, that is being defined and is using
requirejs(['app/main']);
