import { Spinner, Button, Card } from 'react-bootstrap';
import { Fragment, useEffect, useState, useCallback, useLayoutEffect } from 'react';
import { RADIO_EVENTS, Radio } from '../radio/Radio';
import {
    MdUndo,
    MdRedo,
    MdOutlinePlayArrow,
    MdOutlineStop,
    MdOutlineHeadphones,
    MdError
} from 'react-icons/md';
import silence from '../data/sounds/5-seconds-of-silence.mp3';

const LandingPage = () => {
    const [radio, setRadio] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentStationIndex, setCurrentStationIndex] = useState(null);
    const [currentStation, setCurrentStation] = useState(null);
    const [mediaSessionEnabled, setMediaSessionEnabled] = useState(false);
    const [appLoading, setAppLoading] = useState(true);
    const [stations, setStations] = useState([]);
    const [stationErrorIndexes, setStationErrorIndexes] = useState([]);

    const handleLoadErrorEvent = useCallback(() => {
        setLoading(false);
        setPlaying(false);
        if (stationErrorIndexes.length > 0) {
            const updatedArr = [...stationErrorIndexes];
            updatedArr[currentStationIndex] = true;
            setStationErrorIndexes(updatedArr);
        }
    }, [currentStationIndex, stationErrorIndexes]);

    const handleStationChanged = useCallback(() => {
        setPlaying(false);
        setLoading(true);
        setCurrentStationIndex(radio.getCurrentStationIndex());
        setCurrentStation(stations[radio.getCurrentStationIndex()]);
    }, [radio, stations]);

    const handlePlayEvent = useCallback(() => {
        setLoading(false);
        setPlaying(true);

        if (stationErrorIndexes.length > 0 && stationErrorIndexes[currentStationIndex]) {
            const updatedArr = [...stationErrorIndexes];
            updatedArr[currentStationIndex] = false;
            setStationErrorIndexes(updatedArr);
        }
    }, [currentStationIndex, stationErrorIndexes]);

    useLayoutEffect(() => {
        const currentStationElement = document.querySelector('.current-station');
        if (currentStationElement) {
            currentStationElement.scrollIntoView({ behavior: 'smooth' });
        }
    }, [currentStationIndex]);

    useEffect(() => {
        if (radio) {
            setStations(radio.getStations());
            setCurrentStationIndex(radio.getCurrentStationIndex());

            const a = new Array(radio.getStations().length);
            for (let i = 0; i < a.length; i++) a[i] = false;
            setStationErrorIndexes(a);
        }
    }, [radio]);

    useEffect(() => {
        if (stations && stations.length > 0) {
            setCurrentStation(stations[radio.getCurrentStationIndex()]);
        }
    }, [stations]);


    useEffect(() => {
        setRadio(new Radio());

        const handleMuteEvent = () => {
            setPlaying(false);
        };

        const handleUnmuteEvent = () => {
            setLoading(false);
            setPlaying(true);
        };

        const handleAppLoadedEvent = () => {
            setAppLoading(false);
        }

        const handleStoppedEvent = () => {
            setPlaying(false);
        }

        window.addEventListener(RADIO_EVENTS.MUTED, handleMuteEvent);
        window.addEventListener(RADIO_EVENTS.UNMUTED, handleUnmuteEvent);
        window.addEventListener(RADIO_EVENTS.PLAYING, handlePlayEvent);
        window.addEventListener(RADIO_EVENTS.APP_LOADED, handleAppLoadedEvent);
        window.addEventListener(RADIO_EVENTS.STOPPED, handleStoppedEvent);

        return () => {
            window.removeEventListener(RADIO_EVENTS.MUTED, handleMuteEvent);
            window.removeEventListener(RADIO_EVENTS.UNMUTED, handleUnmuteEvent);
            window.removeEventListener(RADIO_EVENTS.PLAYING, handlePlayEvent);
            window.removeEventListener(RADIO_EVENTS.APP_LOADED, handleAppLoadedEvent);
            window.removeEventListener(RADIO_EVENTS.STOPPED, handleStoppedEvent);
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
        if (!mediaSessionEnabled && currentStationIndex) {
            navigator.mediaSession.metadata = new window.MediaMetadata({
                title: stations[currentStationIndex].name,
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

    const handlePlayStopBtnClick = () => {
        //setupMediaSession();
        if (radio) {
            if (radio.isPlaying()) {
                radio.stop();
            }
            else {
                setLoading(true);
                setPlaying(false);
                radio.play(currentStationIndex); //TODO check that currentstationindex is initially set
            }
        }
    }

    const handleStationIconClick = (index) => {
        //setupMediaSession();
        if (radio) {
            setLoading(true);
            setPlaying(false);
            radio.play(index);
        }
    }

    const getRadioStationClassNames = (index) => {
        let className = "shadow ";
        if (currentStationIndex === index) {
            className = className + "current-station ";
            if (stationErrorIndexes && stationErrorIndexes[index]) {
                className = className + "station-error";
            }
        }
        return className;
    };
    return <>
        <div className="media-player-container">
            <div className="media-header">
                {loading && <>  <Spinner animation="border" role="status" />&nbsp; </>}
                <span>{appLoading ? 'Loading...' : (currentStation && currentStation.name)}</span>
            </div>

            <div className="media-content">
                {stations.map((rs, index) => {
                    return <Card
                        key={index} className={getRadioStationClassNames(index)}
                        onClick={() => handleStationIconClick(index)}
                    >
                        <Card.Header className="text-center">
                            <span>{rs.name}</span>
                            {((index === currentStationIndex) && playing) && <>&nbsp;<MdOutlineHeadphones /> </>}
                            {((index === currentStationIndex) && loading) && <>&nbsp;<Spinner animation="border" role="status" /> </>}
                            {(stationErrorIndexes && stationErrorIndexes[index]) && <>&nbsp;<MdError /> </>}
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
                            onClick={handlePlayStopBtnClick}>
                            {playing && <MdOutlineStop />}
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