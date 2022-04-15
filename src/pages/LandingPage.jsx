import { Spinner, Button, Card } from 'react-bootstrap';
import { Fragment, useEffect, useState } from 'react';
import RadioStations from '../data/RadioStations';
import { RADIO_EVENTS, Radio } from '../radio/Radio';
import { MdUndo, MdRedo, MdOutlinePlayArrow, MdOutlinePause, MdOutlineHeadphones } from 'react-icons/md';

import silence from '../data/sound/5-seconds-of-silence.mp3';
const LandingPage = () => {
    const [radio, setRadio] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [loading, setLoading] = useState(false);
    const [radioStation, setRadioStation] = useState(null);
    const [mediaSessionEnabled, setMediaSessionEnabled] = useState(false);

    useEffect(() => {
        setRadioStation(RadioStations[0]);
        console.debug("cwm - ", RadioStations[0]);
        setRadio(new Radio());

        const handleMuteEvent = () => {
            setPlaying(false);
        };

        const handleUnmuteEvent = () => {
            setPlaying(true);
        };

        window.addEventListener(RADIO_EVENTS.MUTED, handleMuteEvent);
        window.addEventListener(RADIO_EVENTS.UNMUTED, handleUnmuteEvent);

        return () => {
            window.removeEventListener(RADIO_EVENTS.MUTED, handleMuteEvent);
            window.removeEventListener(RADIO_EVENTS.UNMUTED, handleUnmuteEvent);
        }
    }, []);



    const handlePlay = async (radioStation) => {

        //this is a hack to allow mediasession to work better with ios.
        if (!mediaSessionEnabled && radioStation) {
            navigator.mediaSession.metadata = new window.MediaMetadata({
                title: radioStation.name,
                album: 'ZRadio',
                artwork: [
                    { src: 'https://dummyimage.com/96x96', sizes: '96x96', type: 'image/png' },
                    { src: 'https://dummyimage.com/128x128', sizes: '128x128', type: 'image/png' },
                    { src: 'https://dummyimage.com/192x192', sizes: '192x192', type: 'image/png' },
                    { src: 'https://dummyimage.com/256x256', sizes: '256x256', type: 'image/png' },
                    { src: 'https://dummyimage.com/384x384', sizes: '384x384', type: 'image/png' },
                    { src: 'https://dummyimage.com/512x512', sizes: '512x512', type: 'image/png' },
                ]
            });

            document.getElementById('silentSound').play();

            console.debug("cwm played!");
            document.getElementById('silentSound').pause();
            navigator.mediaSession.playbackState = "paused";

            setMediaSessionEnabled(true);
        }
        //navigator.mediaSession.playbackState = "paused";


        setRadioStation(radioStation);
        setLoading(true);
        try {
            await radio.playStation(radioStation);
            setPlaying(true);
        }
        catch (error) {
            console.error("playback error-", error);
        }
        finally {
            setLoading(false);
        }
    }

    return <>
        <div className="media-player-container">
            <div className="media-header">
                {loading && <>  <Spinner animation="border" role="status" />&nbsp; </>}
                <span>{radioStation && radioStation.name}</span>
            </div>
            <div className="media-content">
                {RadioStations.map((rs, index) => {
                    return <Card
                        key={index} className={(radioStation && rs.id === radioStation.id) ? "current-station shadow" : ""}
                        onClick={() => handlePlay(rs)}
                    >
                        <Card.Header className="text-center">
                            <span>{rs.name}</span>
                            {((radioStation && rs.id === radioStation.id) && playing) && <>&nbsp;<MdOutlineHeadphones /> </>}
                        </Card.Header>
                        <Card.Body>
                            <Card.Img src={rs.icon} />
                        </Card.Body>
                    </Card>
                })}
            </div>
            <div className="media-controls-container">
                <audio src={silence} id="silentSound" loop>
                    audio unspported
                </audio>
                <Button className="media-control" variant="dark">
                    <MdUndo />
                </Button>

                <Fragment>

                    {loading ? <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner> :
                        <Button className="media-control" variant="dark"
                            onClick={

                                () => {
                                    if (radio) {
                                        if (radio.isPlaying()) {
                                            radio.pause();
                                            setPlaying(false);
                                        }
                                        else {
                                            handlePlay(radioStation);
                                        }
                                    }
                                }
                            }>
                            {playing && <MdOutlinePause />}
                            {!playing && <MdOutlinePlayArrow />}
                        </Button>
                    }
                </Fragment>

                <Button className="media-control" variant="dark">
                    <MdRedo />
                </Button>
            </div>
        </div>
    </>;
}

export default LandingPage;