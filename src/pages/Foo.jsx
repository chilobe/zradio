function AudioPlayer(url) {
    this.playing = false;
    const audio = new Audio(url);
    console.debug("init!");

    const play = async () => {
        console.debug("play called!");
        const res = await audio.play();
        this.playing = true;
        console.debug("res", res);
    }
    this.play = play;

    const pause = async () => {
        const res = await audio.pause();
        this.playing = false;
        console.debug("pause called!", this.playing);

        console.debug("res", res);
    }
    this.pause = pause;
}

export default AudioPlayer;