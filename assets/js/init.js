/* eslint-disable no-alert, no-console */
var isViblastLoaded = false;
var isreadyListener = false;
var player;
var previousState;
var parentPreviousState;
var appScope;
var active_menu_item_id;

var current_Item;
var current_focus;
var navZone = "menu";
var lastNavZone = "menu";
var lastContentNavZone;
var current_Item_temp;
var active_menu_item;
var last_current_Item;
var prev_active_menu_item;
var isImeFocused = false;

if ($.localStorage.get('deviceUdid') === null) {

    if ($.browser.mozilla || $.browser.msie) {
        console.log('mozila -----');
        $('#VRWPluginPanel').html('<object id="ViewRightControl" onload="VRWLoad();" type="application/x-viewright-m3u8" width="0" height="0"></object>');
        //                                                            console.log(' ViewRightControl.GetClientID(): ' + ViewRightControl.GetClientID());
        //                                                            $.localStorage.set('deviceUdid', ViewRightControl.GetClientID());
        if (ViewRightControl.GetClientID) {
            $.localStorage.set('deviceUdid', ViewRightControl.GetClientID());
        } else {
            $.localStorage.set('deviceUdid', jQuery.fingerprint());
        }
        //                                                            $.localStorage.set('deviceUdid', jQuery.fingerprint());
    } else {
        console.log('set deviceUdid .................');
        $.localStorage.set('deviceUdid', jQuery.fingerprint());
        console.log('set deviceUdid .................' + $.localStorage.get('deviceUdid'));
    }
}


function loadAVPlay() {

    /**
     * Displays logging information on the screen and in the console.
     *
     * @param {string}
     *            msg - Message to log.
     */
    function log(msg) {
        var logsEl = document.getElementById('logs');

        if (msg) {
            // Update logs
            //                console.log('[PlayerMultiApp]: ', msg);
            logsEl.innerHTML += msg + '<br />';
        } else {
            // Clear logs
            logsEl.innerHTML = '';
        }

        logsEl.scrollTop = logsEl.scrollHeight;
    }


    // flag to monitor UHD toggling
    var uhdStatus = false;

    /**
     * Register keys used in this application
     */



    function registerControlEvents() {
        document.querySelector('.video-controls .play').addEventListener(
            'click',
            function() {
                player.playPause();
                document.getElementById('streamParams').style.visibility = 'visible';
            }
        );
        document.querySelector('.video-controls .stop').addEventListener(
            'click',
            function() {
                player.stop();
                document.getElementById('streamParams').style.visibility = 'hidden';
            }
        );
        document.querySelector('.video-controls .pause').addEventListener(
            'click',
            player.playPause
        );
        document.querySelector('.video-controls .ff').addEventListener(
            'click',
            player.ff
        );
        document.querySelector('.video-controls .rew').addEventListener(
            'click',
            player.rew
        );
        document.querySelector('.video-controls .fullscreen').addEventListener(
            'click',
            player.toggleFullscreen
        );
        document.querySelector('.video-controls .return').addEventListener(
            'click',
            function() {
                if (webapis.avplay.getState() !== 'IDLE' && webapis.avplay.getState() !== 'NONE') {
                    player.stop();
                } else {
                    tizen.application.getCurrentApplication().hide();
                }

            }
        );
    }

    /**
     * Display application version
     */
    function displayVersion() {
        var el = document.createElement('div');
        el.id = 'version';
        el.innerHTML = 'ver: ' + tizen.application.getAppInfo().version;
        document.body.appendChild(el);
    }

    /**
     * Enabling uhd manually in order to play uhd streams
     */
    function setUhd() {
        if (!uhdStatus) {
            if (webapis.productinfo.isUdPanelSupported()) {
                log('4k enabled');
                uhdStatus = true;
            } else {
                log('this device does not have a panel capable of displaying 4k content');
            }

        } else {
            log('4k disabled');
            uhdStatus = false;
        }
        player.setUhd(uhdStatus);
    }

    function addEventListener() {
        player.addEventListener('play', function() {
            log("Playback started.");
            webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_OFF);
        });

        player.addEventListener('ended', function() {
            log("Playback finished.");
            webapis.appcommon.setScreenSaver(webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_ON);
            $('#playerPanel').hide();
            navZone = lastContentNavZone;
            if (webapis.avplay.getState() !== 'IDLE' &&
                webapis.avplay.getState() !== 'NONE') {
                player.stop();
            } else {
                tizen.application.getCurrentApplication().hide();
            }
        });
    }

    /**
     * Function initialising application.
     */

    if (window.tizen === undefined) {
        log('This application needs to be run on Tizen device');
        return;
    }

    displayVersion();

    //        registerKeyHandler();

    /**
     * Enable multitasking
     */
    document.addEventListener("visibilitychange", function() {
        // When going away from this app suspend player
        if (document.hidden) { // PAUSE
            log("lifecycle [pause]");
            player.suspend();

        } else { // RESUME
            // When going back to this app resume player
            log("lifecycle [resume]");
            player.resume();
        }
    });

    /**
     * Player configuration object.
     *
     * @property {String} url - content url
     * @property {HTML Element} player - application/avplayer object
     * @property {HTML Div Element} controls - player controls
     * @property {HTLM Div Element} info - place to display stream info
     */

    console.log("avplay conffig ............ ");
    console.log(document.getElementById('av-player'));
    console.log("");
    var config = {
        url: '',
        player: document.getElementById('av-player'),
        controls: document.querySelector('.video-controls'),
        info: document.getElementById('info'),
        logger: log //Function used for logging

        /*Smooth Streaming examples*/
        //  url:'http://playready.directtaps.net/smoothstreaming/SSWSS720H264/SuperSpeedway_720.ism/Manifest',
        // url: 'http://playready.directtaps.net/smoothstreaming/TTLSS720VC1/To_The_Limit_720.ism/Manifest'
    };


    // Check the screen width so that the AVPlay can be scaled
    // accordingly
    tizen.systeminfo.getPropertyValue("DISPLAY", function(display) {
        console.log("The display width is 1111:  " + display.resolutionWidth);
        config.resolutionWidth = display.resolutionWidth;

        try {
            // initialize player - loaded from videoPlayer.js
            console.log('init starting ......................');
            player = new VideoPlayer(config);
            console.log('init done ......................');
            registerControlEvents();


        } catch (e) {
            console.log(e);
        }

    }, function(error) {
        log("An error occurred " + error.message);
    });

}

function registerKeys() {
    console.log('registerKeys ............................');
    var usedKeys = ['MediaPause', 'MediaPlay', 'MediaPlayPause',
        'MediaFastForward', 'MediaRewind', 'MediaStop', 'Exit'
    ];

    usedKeys.forEach(function(keyName) {
        tizen.tvinputdevice.registerKey(keyName);
    });
}

$(document).ready(function() {
    registerKeys();

    $("#playerPanel").hide();
    loadAVPlay();

});