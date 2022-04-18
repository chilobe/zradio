import { Howl } from 'howler';

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
    STATION_CHANGED: "STATION_CHANGED"
}

function Radio(stations) {
    const ERRORS = {
        NETWORK_ERROR: "NETWORK ERROR",
        LOAD_ERROR: "LOAD ERROR"
    }

    let currentStationID = null;
    let currentSound = null;
    let actionHandlersSet = false;
    let currentStationIndex = 0;

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
            return currentSound && currentSound.playing()
        }, "Error in isPlaying()");
    };
    this.isPlaying = isPlaying;

    const isMuted = () => {
        return withTryCatch(() => {
            return currentSound && currentSound.mute();
        }, "Error in isMuted()");
    };
    this.isMuted = isMuted;

    const mute = () => {
        return withTryCatch(() => {
            if (currentSound) {
                currentSound.mute(true);
                return true;
            }
        }, "Error in mute()");
    };
    this.mute = mute;

    const unMute = () => {
        return withTryCatch(() => {
            if (currentSound) {
                currentSound.mute(false);
                return true;
            }
        }, "Error in unMute()");
    }
    this.unMute = unMute;

    const getCurrentStation = () => {
        return stations[currentStationIndex];
    };
    this.getCurrentStation = getCurrentStation;



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
                window.dispatchEvent(new Event(RADIO_EVENTS.PLAYING));
                navigator.mediaSession.playbackState = "playing";
            });

            sound.on('mute', () => {
                if (currentSound.mute()) {
                    window.dispatchEvent(new Event(RADIO_EVENTS.MUTED));
                }
                else {
                    window.dispatchEvent(new Event(RADIO_EVENTS.UNMUTED));
                }

                navigator.mediaSession.playbackState = currentSound.mute() ? "paused" : "playing";
            });

            sound.on('loaderror', () => {
                window.dispatchEvent(new Event(RADIO_EVENTS.LOAD_ERROR));
            })

            sound.on('load', () => {
                console.debug("cwm load event!");
            });

            sound.on('rate', () => {
                console.debug("cwm unlock event!");
            });

        }, "Error in setupSoundEventListeners()");
    };

    const playSound = async (sound) => {
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
    const play = () => {
        withTryCatch(() => {
            if (currentSound) {
                if (currentSound.mute()) {
                    currentSound.mute(false);
                }
                else {
                    currentSound.mute(true);
                }
            }
        }, "Error in play()");
    }
    this.play = play;

    const pause = () => {
        withTryCatch(() => {
            if (currentSound) {
                currentSound.mute(true);
            }
        }, "Error in pause()")
    };
    this.pause = pause;

    const stop = () => {
        withTryCatch(() => {
            if (currentSound) {
                currentSound.stop();
            }
        }, "Error in stop()");
    }
    this.stop = stop;

    const handlePauseAction = () => {
        withTryCatch(() => {
            if (currentSound) {
                if (currentSound.mute()) {
                    currentSound.mute(false);
                }
                else {
                    currentSound.mute(true);
                }
            }
        }, "Error in handlePauseAction()");
    }
    this.handlePauseAction = handlePauseAction;

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
        playStation(stations[newStationIndex]);
        window.dispatchEvent(new Event(RADIO_EVENTS.STATION_CHANGED));
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

        playStation(stations[newStationIndex]);

        window.dispatchEvent(new Event(RADIO_EVENTS.STATION_CHANGED));
    };
    this.handlePrevAction = handlePrevAction;

    const setActionHandlers = () => {
        if (!actionHandlersSet) {
            const actionHandlers = [
                ['play', () => handlePlayAction()],
                ['pause', () => handlePauseAction()],
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

    const playStation = async (radioStation) => {
        return withTryCatch(() => {
            if (currentSound) {
                currentSound.unload();
            }

            if (currentStationID === radioStation.id) {
                if (!isPlaying()) {
                    return playSound(currentSound);
                }
            }
            else {
                currentStationID = radioStation.id;
                currentStationIndex = stations.findIndex(s => s.id === radioStation.id);

                document.title = document.title + ' ' + radioStation.name;
                navigator.mediaSession.metadata = new window.MediaMetadata({
                    title: radioStation.name,
                    album: 'ZRadio 2',
                    artwork: [{ src: radioStation.icon, sizes: '384x384', type: 'image/png' },
                    ]
                });

                currentSound = new Howl({
                    src: [radioStation.urls],
                    html5: true,
                    preload: false
                });

                setActionHandlers();
                return playSound(currentSound);
            }
        }, "Error in playStation()");
    }
    this.playStation = playStation;
}

export { Radio, RADIO_EVENTS };