export function formatVideoTime(duration: number) {
    const hrs = Math.floor(duration / 3600);
    const hrsInSecs = hrs * 3600;
    const mins = Math.floor((duration - hrsInSecs) / 60);
    const minsInSecs = mins * 60;
    const secs = Math.floor(duration - hrsInSecs - minsInSecs);
    if (hrs <= 0) {
        return `${mins < 10 ? `0${mins}` : mins.toString()}:${secs < 10 ? `0${secs}` : secs.toString()}`;
    }
    return `${hrs < 10 ? `0${hrs}` : hrs.toString()}:${mins < 10 ? `0${mins}` : mins.toString()}:${secs < 10 ? `0${secs}` : secs.toString()}`;
}