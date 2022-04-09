import { Howl } from 'howler';

/*TODO 
1 SEND OUT EVENT ON PLAYBACK ERROR AFTER INITIAL SUCCESS. 
2 ON ERROR, SEND OUT AN EMAIL WITH DETAIL
*/
function Radio() {
    const ERRORS = {
        NETWORK_ERROR: "NETWORK ERROR",
        LOAD_ERROR: "LOAD ERROR"
    }
    let currentStationID = null;
    let currentSound = null;

    const isPlaying = () => {
        return currentSound && currentSound.playing();
    };
    this.isPlaying = isPlaying;

    const playSound = async (sound) => {
        sound.play();

        /*currentSound.on('stop', () => {
            console.debug("cwm on volume");
        })*/

        return new Promise((resolve, reject) => {
            sound.once('play', () => {
                resolve(true);
            });

            sound.once('loaderror', (id, error) => {
                reject(ERRORS.LOAD_ERROR, error);
            });
        })
    };

    const play = async (radioStation) => {
        if (currentStationID === radioStation.id) {
            if (!isPlaying()) {
                return playSound(currentSound);
            }
        }
        else {
            currentStationID = radioStation.id;
            if (currentSound) {
                currentSound.unload();
            }

            currentSound = new Howl({
                src: [radioStation.urls],
                html5: true,
                preload: false
            });

            return playSound(currentSound);
        }
    }
    this.play = play;

    const pause = () => {
        if (currentSound) {
            currentSound.stop();
        }
    }
    this.pause = pause;
}

export default Radio;