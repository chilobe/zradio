import HotFmIcon from '../img/hot_fm.png';
import iWaveFmIcon from '../img/iwave_fm.png';
import phoenixFmIcon from '../img/radio_phoenix.png';
import sunFmIcon from '../img/sun_fm.png';
import breezeFmIcon from '../img/breeze_fm.png';
import radioChikuniIcon from '../img/radio_chikuni.png';
import rockFmIcon from '../img/rock_fm.png';
import christianVoiceIcon from '../img/christian_voice.png';
import metroFmIcon from '../img/metro_fm.png';
import zedStageIcon from '../img/zed_stage.png';
import fiveFmIcon from '../img/5fm_radio.png';
import dcTalkRadioIcon from '../img/dc_talk_radio.png'; //TODO
import komboniRadioIcon from '../img/komboni_radio.png';


const RadioStations = [
    {
        name: "IWave FM Radio",
        urls: [
            "https://s47.myradiostream.com/:9934/listen.mp3"
        ],
        icon: iWaveFmIcon,
        id: 0, fiveFmIcon
    },
    {
        name: "Komboni Radio",
        urls: [
            "http://41.72.106.138:5000/"
        ],
        icon: komboniRadioIcon,
        id: 1,
        xhr: {
            headers: {
                Referer: "http://kombonipobo.com/"
            }
        }
    },
    {
        name: "HOT FM",
        urls: [
            "http://s2.yesstreaming.net:7091/stream"
        ],
        icon: HotFmIcon,
        id: 2
    },
    {
        name: "Radio Phoenix 89.5",
        urls: [
            "https://23553.live.streamtheworld.com/RADIO_PHOENIXAAC_SC"
        ],
        icon: phoenixFmIcon,
        id: 3,
    },
    {
        name: "Sun FM",
        urls: [
            "http://11233.cloudrad.io:9102/live"
        ],
        icon: sunFmIcon,
        id: 4,
    },
    {
        name: "Breeze FM Chipata",
        urls: [
            "https://s47.myradiostream.com/9934/listen.mp3"
        ],
        icon: breezeFmIcon,
        id: 5,
    },
    {
        name: "Radio Chikuni",
        urls: [
            "http://centauri.shoutca.st:8102/stream"
        ],
        icon: radioChikuniIcon,
        id: 6,
    },
    {
        name: "965 Rock FM",
        urls: [
            "http://99.198.118.250:8238/stream"
        ],
        icon: rockFmIcon,
        id: 7,
    },
    {
        name: "Radio Christian Voice",
        urls: [
            "http://zas2.ndx.co.za/proxy/cvglobal?mp=/stream"
        ],
        icon: christianVoiceIcon,
        id: 8,
    },
    {
        name: "Metro FM",
        urls: [
            "https://s24.myradiostream.com/:15422/listen.mp3"
        ],
        icon: metroFmIcon,
        id: 9,
    },
    {
        name: "Zed Stage Radio",
        urls: [
            "https://node-03.zeno.fm/49836bqkpd0uv"
        ],
        icon: zedStageIcon,
        id: 10,
    },
    {
        name: "5fm Radio",
        urls: [
            "http://ca9.rcast.net:8014/;stream.mp3"
        ],
        icon: fiveFmIcon,
        id: 11,
    }
];
export default RadioStations;