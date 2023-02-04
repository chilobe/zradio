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

    let currentStationIndex = 0;

    let requestStopLoadingSound = false;

    const getCurrentStationIndex = () => currentStationIndex;
    this.getCurrentStationIndex = getCurrentStationIndex;

    const loadingSound = new Howl({ src: [calmAlarmAudio], loop: true, preload: true });

    loadingSound.on('play', () => {
        if (requestStopLoadingSound) {
            loadingSound.stop();
            requestStopLoadingSound = false;
        }
    });

    const playLoadingSound = () => {
        if (!isPlaying() && !loadingSound.playing()) {
            loadingSound.play();
        }
    }

    const stopLoadingSound = () => {
        requestStopLoadingSound = true;
    }

    const getStations = () => stations;
    this.getStations = getStations;

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


    const setupSoundEventListeners = (sound) => {
        withTryCatch(() => {
            sound.on('pause', () => {
                window.dispatchEvent(new Event(RADIO_EVENTS.PAUSED));
            });

            sound.on('stop', () => {
                window.dispatchEvent(new Event(RADIO_EVENTS.STOPPED));
            });

            sound.on('play', () => {
                if (loadingSound) {
                    stopLoadingSound();
                }
                window.dispatchEvent(new Event(RADIO_EVENTS.PLAYING));
            });

            sound.on('loaderror', (e) => {
                stations[currentStationIndex].howl = null;
                window.dispatchEvent(new Event(RADIO_EVENTS.LOAD_ERROR));
                stopLoadingSound();
                playErrorSound();
            });

            sound.on('playerror', () => {
                playErrorSound();
            });
        }, "Error in setupSoundEventListeners()");
    };


    const handleStopAction = () => {
        withTryCatch(() => {
            if (stations[currentStationIndex] && stations[currentStationIndex].howl) {
                stations[currentStationIndex].howl.stop();
            }
        }, "Error in handleStopAction()");
    }
    this.handleStopAction = handleStopAction;

    const handlePauseAction = () => {
        withTryCatch(() => {
            if (stations[currentStationIndex] && stations[currentStationIndex].howl) {
                stations[currentStationIndex].howl.pause();
            }
        }, "Error in handlePauseAction()");
    }
    this.handleStopAction = handlePauseAction;

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

    const playSound = async (sound) => {
        playLoadingSound();
        setupSoundEventListeners(sound);

        return withTryCatch(() => {
            sound.play();

            return new Promise((resolve, reject) => {
                sound.once('play', () => {
                    resolve(true);
                });
                sound.once('loaderror', (id, error) => {
                    reject(ERRORS.LOAD_ERROR, error);
                });
            })
        }, "Error in playSound()")
    };

    const errorSound = new Howl({ src: [errorAudio], preload: true });

    const playErrorSound = () => {
        if (errorSound.playing()) return
        errorSound.play();
    }

    const play = async (index) => {
        Howler.stop();

        const oldStationIndex = currentStationIndex;

        currentStationIndex = (typeof index === 'number') ? index : currentStationIndex;

        const radioStation = stations[currentStationIndex];

        if (oldStationIndex !== currentStationIndex) {
            window.dispatchEvent(new Event(RADIO_EVENTS.STATION_CHANGED));
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
            return playSound(sound);
        }, "Error in playSound()");
    }
    this.play = play;
}

export { Radio, RADIO_EVENTS };