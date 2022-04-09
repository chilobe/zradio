import HotFmIcon from '../img/hot_fm.jpg';
import iWaveFmIcon from '../img/iwave_fm.jpg';

const RadioStations = [
    {
        name: "HOT FM",
        urls: [
            "http://s2.yesstreaming.net:7091/stream"
        ],
        icon: HotFmIcon,
        id: 0
    },
    {
        name: "IWave FM Radio",
        urls: [
            "http://s47.myradiostream.com:9934/listen.mp3"
        ],
        icon: iWaveFmIcon,
        id: 1,
    }
];

export default RadioStations;