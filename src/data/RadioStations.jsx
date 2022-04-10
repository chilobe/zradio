import HotFmIcon from '../img/hot_fm.png';
import iWaveFmIcon from '../img/iwave_fm.png';
import phoenixFmIcon from '../img/radio_phoenix.png';
import sunFmIcon from '../img/sun_fm.jpg';
import breezeFmIcon from '../img/breeze_fm.jpg';
import radioChikuniIcon from '../img/radio_chikuni.jpg';
import rockFmIcon from '../img/rock_fm.jpg';
import christianVoiceIcon from '../img/christian_voice.webp'

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
    },
    {
        name: "Radio Phoenix 89.5",
        urls: [
            "https://23553.live.streamtheworld.com/RADIO_PHOENIXAAC_SC"
        ],
        icon: phoenixFmIcon,
        id: 2,
    },
    {
        name: "Sun FM",
        urls: [
            "http://11233.cloudrad.io:9102/live"
        ],
        icon: sunFmIcon,
        id: 3,
    },
    {
        name: "Breeze FM Chipata",
        urls: [
            "https://s47.myradiostream.com/9934/listen.mp3"
        ],
        icon: breezeFmIcon,
        id: 4,
    },
    {
        name: "Radio Chikuni",
        urls: [
            "http://centauri.shoutca.st:8102/stream"
        ],
        icon: radioChikuniIcon,
        id: 5,
    },
    {
        name: "965 Rock FM",
        urls: [
            "http://99.198.118.250:8238/stream"
        ],
        icon: rockFmIcon,
        id: 6,
    },
    {
        name: "Radio Christian Voice",
        urls: [
            "http://zas2.ndx.co.za/proxy/cvglobal?mp=/stream"
        ],
        icon: christianVoiceIcon,
        id: 7,
    }
];

export default RadioStations;