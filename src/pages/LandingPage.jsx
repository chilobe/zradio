import { Container, Row, Col, Spinner, Button } from 'react-bootstrap';
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
        <Container className="">
            <Row>
                <Col className="cwmx">
                    {loading && <>  <Spinner animation="border" role="status" />&nbsp; </>
                    }
                    {radioStation && radioStation.name}
                </Col>
            </Row>
            <Row >
                <Col >
                    <div className="bar">
                        {RadioStations.map((rs, index) => {
                            return <Fragment>
                                <img src={rs.icon}
                                    alt={rs.name}
                                    onClick={() => handlePlay(rs)}
                                    className="station-icon"
                                    key={index} />
                            </Fragment>
                        })}
                    </div>
                </Col>
            </Row>
            <Row >

                <Col >
                    {radio && <div className="foo">

                        <Button className="playback-buttons">
                            <MdUndo />
                        </Button>

                        <Fragment>

                            {loading ? <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner> :
                                <Button className="playback-buttons"
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

                        <Button className="playback-buttons">
                            <MdRedo />
                        </Button>
                    </div>}
                </Col>
            </Row>
        </Container>
    </>;
}

export default LandingPage;