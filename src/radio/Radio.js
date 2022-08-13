import { Howl, Howler } from 'howler';
import errorAudio from '../data/sounds/error.mp3';
import calmAlarmAudio from '../data/sounds/calmAlarm.mp3';
import stations from '../data/RadioStations';
/*TODO 
1 ON ERROR, SEND OUT AN EMAIL WITH DETAIL
*/

const RADIO_EVENTS = {
    MUTED: "MUTED",
    UNMUTED: "UMUTED",
    PLAYING: "PLAYING",
    PAUSED: "PAUSED",
    STOPPED: "STOPPED",
    LOAD_ERROR: "LOAD_ERROR",
    STATION_CHANGED: "STATION_CHANGED",
    APP_LOADED: "APP_LOADED"
}

function Radio() {
    const ERRORS = {
        NETWORK_ERROR: "NETWORK ERROR",
        LOAD_ERROR: "LOAD ERROR"
    }

    let actionHandlersSet = false;
    let currentStationIndex = 0;

    const getStations = () => stations;
    this.getStations = getStations;

    const loadingSound = new Howl({ src: [calmAlarmAudio], loop: true, preload: true });

    const playLoadingSound = () => {
        if (!isPlaying() && !loadingSound.playing()) {
            loadingSound.play();
        }
    }

    const stopLoadingSound = () => {
        if (loadingSound.playing()) {
            loadingSound.stop();
        }
    }

    window.onload = function () {
        window.dispatchEvent(new Event(RADIO_EVENTS.APP_LOADED));
    }

    const withTryCatch = (callback, errorMsg) => {
        try {
            return callback();
        }
        catch (error) {
            console.error(errorMsg + ": " + error);
        }
        return false;
    }

    const isPlaying = () => {
        return withTryCatch(() => {
            return stations[currentStationIndex] && stations[currentStationIndex].howl.playing()
        }, "Error in isPlaying()");
    };
    this.isPlaying = isPlaying;

    const getCurrentStationIndex = () => currentStationIndex;
    this.getCurrentStationIndex = getCurrentStationIndex;

    const setupSoundEventListeners = (sound) => {
        withTryCatch(() => {
            sound.on('pause', () => {
                window.dispatchEvent(new Event(RADIO_EVENTS.PAUSED));
                navigator.mediaSession.playbackState = "paused";
            });

            sound.on('stop', () => {
                window.dispatchEvent(new Event(RADIO_EVENTS.STOPPED));
                navigator.mediaSession.playbackState = "paused";
            });

            sound.on('play', () => {
                if (loadingSound) {
                    stopLoadingSound();
                }
                window.dispatchEvent(new Event(RADIO_EVENTS.PLAYING));
                navigator.mediaSession.playbackState = "playing";
            });



            sound.on('loaderror', () => {
                console.debug("cwm load error!");
                stations[currentStationIndex].howl = null;
                window.dispatchEvent(new Event(RADIO_EVENTS.LOAD_ERROR));
                stopLoadingSound();
                playErrorSound();
            });

            sound.on('load', () => {
                console.debug("cwm load event!");
            });

            sound.on('rate', () => {
                console.debug("cwm unlock event!");
            });

            sound.on('playerror', () => {
                playErrorSound();
            });
        }, "Error in setupSoundEventListeners()");
    };

    const playSound = async (sound) => {
        playLoadingSound();
        setupSoundEventListeners(sound);

        return withTryCatch(() => {
            sound.play();

            return new Promise((resolve, reject) => {
                sound.once('play', () => {

                    navigator.mediaSession.setPositionState({
                        duration: 999999,
                        playbackRate: 1,
                        position: 80
                    });
                    sound.mute(false);
                    navigator.mediaSession.playbackState = "playing";

                    resolve(true);
                });
                sound.once('loaderror', (id, error) => {
                    reject(ERRORS.LOAD_ERROR, error);
                });
            })
        }, "Error in playSound()")
    };


    const stop = () => {
        withTryCatch(() => {
            stations[currentStationIndex].howl.mute()
            if (stations[currentStationIndex] && stations[currentStationIndex].howl) {
                stations[currentStationIndex].howl.stop();
            }
        }, "Error in stop()");
    }
    this.stop = stop;



    const handlePlayAction = () => {
        play();
    }
    this.handlePlayAction = handlePlayAction;

    const handleNextAction = () => {
        let newStationIndex;
        if (currentStationIndex >= (stations.length - 1)) {
            newStationIndex = 0;
        }
        else {
            newStationIndex = currentStationIndex + 1;
        }
        play(newStationIndex);
    };
    this.handleNextAction = handleNextAction;

    const handlePrevAction = () => {
        let newStationIndex;
        if (currentStationIndex <= 0) {
            newStationIndex = stations.length - 1;
        }
        else {
            newStationIndex = currentStationIndex - 1;
        }

        play(newStationIndex);
    };
    this.handlePrevAction = handlePrevAction;

    const setActionHandlers = () => {
        if (!actionHandlersSet) {
            const actionHandlers = [
                ['play', () => handlePlayAction()],
                ['pause', () => console.debug("cwm paused!")],
                ['previoustrack', () => handlePrevAction()],
                ['nexttrack', () => handleNextAction()],
                ['stop', () => console.debug("cwm stop")],
            ];

            for (const [action, handler] of actionHandlers) {
                try {
                    navigator.mediaSession.setActionHandler(action, handler);
                } catch (error) {
                    console.log(`The media session action "${action}" is not supported yet.`);
                }
            }
            actionHandlersSet = true;
        }
    };

    const errorSound = new Howl({ src: [errorAudio], preload: true });

    const playErrorSound = () => {
        if (errorSound.playing()) return
        errorSound.play();
    }

    const play = async (index) => {
        Howler.stop();

        const oldStationIndex = currentStationIndex;

        console.debug("cwm oldStationIndex-", oldStationIndex, "t-", typeof index);

        currentStationIndex = (typeof index === 'number') ? index : currentStationIndex;

        console.debug("cwm currentStationIndex-", currentStationIndex);


        const radioStation = stations[currentStationIndex];

        if (oldStationIndex !== currentStationIndex) {
            window.dispatchEvent(new Event(RADIO_EVENTS.STATION_CHANGED));
            console.debug("station changed!");
        }

        let sound;
        if (radioStation.howl) {
            sound = radioStation.howl;
        }
        else {
            sound = radioStation.howl = new Howl({
                src: [radioStation.urls],
                html5: true, // A live stream can only be played through HTML5 Audio.
            });
        }

        return withTryCatch(() => {
            document.title = document.title + ' ' + radioStation.name;
            navigator.mediaSession.metadata = new window.MediaMetadata({
                title: radioStation.name,
                album: 'ZRadio 2',
                artwork: [{ src: radioStation.icon, sizes: '384x384', type: 'image/png' },
                ]
            });

            setActionHandlers();
            return playSound(sound);

        }, "Error in play()");
    }
    this.play = play;
}

export { Radio, RADIO_EVENTS };