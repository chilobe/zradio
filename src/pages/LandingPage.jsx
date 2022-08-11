import { Spinner, Button, Card } from 'react-bootstrap';
import { Fragment, useEffect, useState, useCallback, useLayoutEffect } from 'react';
import RadioStations from '../data/RadioStations';
import { RADIO_EVENTS, Radio } from '../radio/Radio';
import {
    MdUndo,
    MdRedo,
    MdOutlinePlayArrow,
    MdOutlinePause,
    MdOutlineHeadphones,
    MdError
} from 'react-icons/md';
import silence from '../data/sounds/5-seconds-of-silence.mp3';

const LandingPage = () => {
    const [radio, setRadio] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [loading, setLoading] = useState(false);
    const [radioStation, setRadioStation] = useState(null);
    const [mediaSessionEnabled, setMediaSessionEnabled] = useState(false);
    const [appLoading, setAppLoading] = useState(true);

    const handleLoadErrorEvent = useCallback(() => {
        setLoading(false);
        setPlaying(false);
        setRadioStation({ ...radioStation, error: true });
    }, [radioStation]);

    const handleStationChanged = useCallback(() => {
        setPlaying(false);
        setLoading(true);
        setRadioStation(radio.getCurrentStation());
    }, [radio]);

    useLayoutEffect(() => {
        const currentStationElement = document.querySelector('.current-station');
        if (currentStationElement) {
            currentStationElement.scrollIntoView({ behavior: 'smooth' });
        }
    }, [radioStation]);


    useEffect(() => {
        setRadioStation(RadioStations[0]);
        setRadio(new Radio(RadioStations));

        const handleMuteEvent = () => {
            setPlaying(false);
        };

        const handleUnmuteEvent = () => {
            setLoading(false);
            setPlaying(true);
        };

        const handlePlayEvent = () => {
            setLoading(false);
            setPlaying(true);
        }

        const handleAppLoadedEvent = () => {
            setAppLoading(false);
        }

        window.addEventListener(RADIO_EVENTS.MUTED, handleMuteEvent);
        window.addEventListener(RADIO_EVENTS.UNMUTED, handleUnmuteEvent);
        window.addEventListener(RADIO_EVENTS.PLAYING, handlePlayEvent);
        window.addEventListener(RADIO_EVENTS.APP_LOADED, handleAppLoadedEvent);

        return () => {
            window.removeEventListener(RADIO_EVENTS.MUTED, handleMuteEvent);
            window.removeEventListener(RADIO_EVENTS.UNMUTED, handleUnmuteEvent);
            window.removeEventListener(RADIO_EVENTS.PLAYING, handlePlayEvent);
            window.removeEventListener(RADIO_EVENTS.APP_LOADED, handleAppLoadedEvent);
        }
    }, []);

    useEffect(() => {
        window.addEventListener(RADIO_EVENTS.LOAD_ERROR, handleLoadErrorEvent);
        return () => window.removeEventListener(RADIO_EVENTS.LOAD_ERROR, handleLoadErrorEvent);
    }, [handleLoadErrorEvent]);

    useEffect(() => {
        window.addEventListener(RADIO_EVENTS.STATION_CHANGED, handleStationChanged);
        return () => window.removeEventListener(RADIO_EVENTS.STATION_CHANGED, handleStationChanged);
    }, [handleStationChanged]);

    const setupMediaSession = () => {
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

            document.getElementById('silentSound').pause();
            navigator.mediaSession.playbackState = "paused";

            setMediaSessionEnabled(true);
        }
    }

    const handlePlayPauseBtnClick = () => {
        setupMediaSession();
        if (radio) {
            if (radio.isPlaying()) {
                if (radio.isMuted()) {
                    radio.unMute();
                }
                else {
                    radio.mute();
                }
            }
            else {
                setLoading(true);
                setPlaying(false);
                radio.playStation(radioStation);
            }
        }
    }

    const handleStationIconClick = (rs) => {
        setRadioStation(rs);
        setupMediaSession();
        if (radio) {
            setLoading(true);
            setPlaying(false);
            radio.playStation(rs);
        }
    }

    const getRadioStationClassNames = (rs) => {
        let className = "shadow ";
        if (radioStation && rs.id === radioStation.id) {
            className = className + "current-station ";
            if (radioStation.error) {
                className = className + "station-error";
            }
        }
        return className;
    };

    return <>
        <div className="media-player-container">
            <div className="media-header">
                {loading && <>  <Spinner animation="border" role="status" />&nbsp; </>}
                <span>{appLoading ? 'Loading...' : (radioStation && radioStation.name)}</span>
            </div>

            <div className="media-content">
                {RadioStations.map((rs, index) => {
                    return <Card
                        key={index} className={getRadioStationClassNames(rs)}
                        onClick={() => handleStationIconClick(rs)}
                    >
                        <Card.Header className="text-center">
                            <span>{rs.name}</span>
                            {((radioStation && rs.id === radioStation.id) && playing) && <>&nbsp;<MdOutlineHeadphones /> </>}
                            {((radioStation && rs.id === radioStation.id) && loading) && <>&nbsp;<Spinner animation="border" role="status" /> </>}
                            {((radioStation && rs.id === radioStation.id) && radioStation.error) && <>&nbsp;<MdError /> </>}

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
                <Button className="media-control"
                    variant="dark"
                    onClick={() => radio.handlePrevAction()}>
                    <MdUndo />
                </Button>

                <Fragment>

                    {loading ? <Spinner animation="border" role="status" className="media-control">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner> :
                        <Button className="media-control" variant="dark"
                            onClick={handlePlayPauseBtnClick}>
                            {playing && <MdOutlinePause />}
                            {!playing && <MdOutlinePlayArrow />}
                        </Button>
                    }
                </Fragment>

                <Button className="media-control"
                    variant="dark"
                    onClick={() => radio.handleNextAction()}>
                    <MdRedo />
                </Button>
            </div>
            {appLoading && <div className="loading-overlay">
                <Spinner animation="border" role="status" />
            </div>}
        </div>
    </>;
}

export default LandingPage;