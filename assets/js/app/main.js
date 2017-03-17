// main module, including jwpbackground module - we just include this but don't need to do anything with it, it's just loaded when the main module is called at end of the config.js module (which is pointed to for requirejs as the value of the data-main attribute in the script tag in index.html)
define(['jquery', 'jwpbackground', 'jwplayer', 'vue'], function($, jwb, jwplayer, Vue) {

    var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


    Vue.component('videobackground-div', {
        template: '#videobackground-template'
    });


    // jwplayer instance factory function
    var jwplayers = [];

    function JWInstanceFactory() {

        var customElements2 = [];

        for (var i = 0; i < 9; i++) {
            customElements2.push("wall-player-" + i);
        }

        console.log(customElements2);

        var jwplayerInstanceNames = [];

        for (var j = 0; j < 9; j++) {
            jwplayerInstanceNames.push("videowallplayer" + j);
        }

        console.log(jwplayerInstanceNames);

        for (var k = 0; k < jwplayerInstanceNames.length; k++) {
            jwplayerInstanceNames[k] = jwplayer(customElements2[k]).setup({
              autostart: false,
              controls: true,
              aspectratio: '16:9',
              //stretching: 'fill',
              file: 'https://www.youtube.com/watch?v=obAtn6I5rbY',
              image: 'http://11986-presscdn-0-77.pagely.netdna-cdn.com/wp-content/uploads/2016/03/widescreen-iphone-photo.jpg'
            });
            jwplayers.push(jwplayerInstanceNames[k]);
        }

        console.log(jwplayers);

        return jwplayers;
    }


    Vue.component('videowall-div', {
        template: '#videowall-template',
        /*
        data: function() {
          return {
            players: (function() {
              players = [];
              for (var i = 0; i < globalVideoArray.length; i++){
                (function() {
                  var player = `<div class="col-xs-6 col-md-4"><div class="embed-responsive embed-responsive-16by9"><playerembed${i}>${globalVideoArray[i]}</playerembed${i}></div>`;
                  players.push(player);
                })();
              }
              return players;
            })()
          }
        },
        */
        mounted: function() {
            return JWInstanceFactory();
        }


        // https://vuejs.org/v2/api/#mounted
        /*
        mounted: function() {
          var videowallplayer = jwplayer('wall-player').setup({
              file: 'http://content.jwplatform.com/videos/9EkN93ib-cYifo9hM.mp4',
              autostart: true,
              //controls: true,
              //playlist: fullPlaylist,
              //mute: true,
              //repeat: true,
              //stretching: 'fill',
              //height: '100%',
              //width: '100%'
              height: '315',
              width: '560'

          });
          return videowallplayer;
        }
        */

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
        // firebase binding
        // https://github.com/vuejs/vuefire
        //firebase: {
        //    users: usersRef
        //},
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
            /*
            addUser: function () {
                if (this.isValid) {
                    usersRef.push(this.newUser)
                    this.newUser.name = ''
                    this.newUser.email = ''
                }
            },
            removeUser: function (user) {
                usersRef.child(user['.key']).remove()
            },
            */
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
            showVideoWall: false
            //newUser: {
            //     name: '',
            //     email: ''
            // }
        }
    })



    var divClick = document.getElementById("js-background-video-container");
    divClick.addEventListener("click", function() {
        console.log("js-background-video clicked!");
        Vueapp.showModal = true;
    });


});
