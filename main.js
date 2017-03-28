const $ = require('jquery');
const jwb = require('./jwplayerBackground.js');
require('expose-loader?LibraryName!./jwplayer.js');
const Vue = require('./vue.min.js');

var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


Vue.component('videobackground-div', {
    template: '#videobackground-template'
});

// get playlist callback, this fires first then calls the player instance factory
function loadFeed() {
    $.ajax({
        url: 'https://content.jwplatform.com/feeds/EU8xl6Xv.json',
        dataType: 'JSON'
    }).done(function(data) {
        fullPlaylist = data.playlist;
        JWInstanceFactory(fullPlaylist);
    });
}

// jwplayer instance factory callback
var jwplayers = [];

function JWInstanceFactory(fullPlaylist) {
    console.log(fullPlaylist);

    var customElements2 = [];
    for (var i = 0; i < fullPlaylist.length; i++) {
        customElements2.push("wall-player-" + i);
    }

    var jwplayerInstanceNames = [];
    for (var j = 0; j < fullPlaylist.length; j++) {
        jwplayerInstanceNames.push("videowallplayer" + j);
    }

    for (var k = 0; k < jwplayerInstanceNames.length; k++) {
        jwplayerInstanceNames[k] = jwplayer(customElements2[k]).setup({
            autostart: false,
            controls: true,
            aspectratio: '16:9',
            stretching: 'fill',
            height: '100%',
            width: '100%',
            file: fullPlaylist[k].sources[4].file, // assuming all assets in playlist are HD, grabbing file at index where 720p rendition is located
            image: fullPlaylist[k].image // grabbing file url from image property
        });
        jwplayers.push(jwplayerInstanceNames[k]);
    }
    return jwplayers;
}

// template is hardcoded for 12 videos, need to do programmatic template iteration
Vue.component('videowall-div', {
    template: '#videowall-template',
    mounted: function() { // gets called after component is rendered
        //return JWInstanceFactory();
        return loadFeed();
    }
});


Vue.component('navbar-div', {
    template: '#navbar-template'
});


Vue.component('modal', {
    template: '#modal-template',
    data: function() {
        return {
            // this is bound to the form inputs via v-model directive
            newUser: {
                name: '',
                email: ''
            }
        }
    },
    // computed property for form validation state
    computed: {
        // paraphrased from docs on computeds:
        // You can data-bind to computed properties in templates just like a normal property. Vue is aware that a specific computed method depends on a specific property in the instance data object, so it will update any bindings that depend on validation when say name or email changes. And the best part is that we’ve created this dependency relationship declaratively: the computed getter function has no side effects, which makes it easy to test and reason about.

        // So you'll see that with every single character that is typed into or deleted from the form fields validation() gets pinged.
        // computeds are just another reactive binding approach, like v-model, or v-bind, but it has some logic attached
        validation: function() {
            console.log("this is this in validation computed method: ");
            console.log(this);
            console.log({
                name: !!this.newUser.name.trim(),
                email: emailRE.test(this.newUser.email)
            });
            // returning bool values depending upon validation
            // This is computed property that is part of a component is constantly being called or is computing in real-time as the user interacts with the UI.
            //every time user types on either field this function is called and returning this object with bool values for name and email
            return {
                // trim() removes whitespace from both ends of string
                name: !!this.newUser.name.trim(), // double !! is same as boolean(), so empty string after attempting trim() === false
                email: emailRE.test(this.newUser.email)
            }
        },
        isValid: function() {
            var validation = this.validation
            console.log("this is validation in isValid(): " + JSON.stringify(validation));
            return Object.keys(validation).every(function(key) {
                return validation[key]
            });
        }
    },
    // methods
    methods: {
        //just for demo
        login: function() {
            var demoCreds = {
                email: 'michael@scott.com',
                password: 'threatlevelmidnight'
            };
            if (this.newUser.email == demoCreds.email && this.newUser.name == demoCreds.password) {
                console.log("logged in!");
                Vueapp.showModal = false;
                Vueapp.showVideoBackground = false;
                Vueapp.showNavBar = true;
                Vueapp.showVideoWall = true;
            } else {
                console.log("invalid login info");
            }
        }

    }
});

// instantiating root Vue instance
var Vueapp = new Vue({
    el: '#app',
    data: {
        showVideoBackground: true,
        showModal: false,
        showVideoWall: false,
        showNavBar: false
    }
});

var divClick = document.getElementById("js-background-video-container");
divClick.addEventListener("click", function() {
    console.log("js-background-video clicked!");
    Vueapp.showModal = true;
});
