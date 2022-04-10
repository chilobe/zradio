import { Spinner, Button, Card } from 'react-bootstrap';
import { Fragment, useEffect, useState } from 'react';
import RadioStations from '../data/RadioStations';
import Radio from '../radio/Radio';
import { MdUndo, MdRedo, MdOutlinePlayArrow, MdOutlinePause } from 'react-icons/md';
const LandingPage = () => {
    const [radio, setRadio] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [loading, setLoading] = useState(false);
    const [radioStation, setRadioStation] = useState(null);

    useEffect(() => {
        setRadioStation(RadioStations[0]);
        console.debug("cwm - ", RadioStations[0]);
        setRadio(new Radio());
    }, []);

    const handlePlay = async (radioStation) => {
        setRadioStation(radioStation);
        setLoading(true);
        try {
            await radio.play(radioStation);
            setPlaying(true);
        }
        catch (error) {
            console.error("cwm playback error-", error);
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
                    return <Card key={index} className={(rs.id === radioStation.id) ? "current-station" : ""}
                        onClick={() => handlePlay(rs)}
                    >
                        <Card.Header className="text-center"> <span>{rs.name}</span></Card.Header>
                        <Card.Body>
                            <Card.Img src={rs.icon} />
                        </Card.Body>
                    </Card>
                })}
            </div>
            <div className="media-controls-container">
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