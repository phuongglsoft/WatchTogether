import { useEffect, useRef, useState } from 'react';
import { useRoomStore } from '../store/room-store'
import { movies } from '../utils/movies';
import { AddTime, InvokeServerFunction, VideoStatus } from '../type/type';
import { Box, IconButton, Slider, Typography } from '@mui/material';
import { Pause, Play } from '@phosphor-icons/react';
import forward15Secs from '../assets/fast-forward-15-secs.svg';
import backward15Secs from '../assets/fast-backward-15-secs.svg';
import { useHubConnectionStore } from '../store/hub-store';
import { formatVideoTime } from '../util/video';
import replaySVG from '../assets/replay.svg';

function WatchMovie() {
  const { room } = useRoomStore();
  const { connection } = useHubConnectionStore()
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [status, setStatus] = useState<VideoStatus>(VideoStatus.Paused);
  const [videoDuration, setVideoDuration] = useState<number | null>(null);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!room) return;
    const video = movies.find(mv => mv.code.toString() === room!.video!);
    if (!video) return;
    videoRef.current?.setAttribute('src', video.src);
    videoRef.current?.setAttribute('type', 'video/mp4');

    connection?.on('VideoPlaying', () => {
      setStatus(VideoStatus.Playing);
      videoRef.current?.play();
    });

    connection?.on('VideoPaused', () => {
      setStatus(VideoStatus.Paused);
      videoRef.current?.pause();
    });

    connection?.on('TimeStampChanged', (timeStamp: number) => {
      if (videoRef.current) {
        videoRef.current.currentTime = timeStamp;
      }
    })

    connection?.on('Replayed', () => {
      setStatus(VideoStatus.Playing);
      if (!videoRef.current) {
        throw new Error('VideoRef is null')
      }
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    })
  }, [room?.video])


  function handleControlClick() {
    if (status === VideoStatus.Paused) {
      connection?.invoke(InvokeServerFunction.playVideo, room?.roomCode)
    }
    else if (status === VideoStatus.Playing) {
      connection?.invoke(InvokeServerFunction.pauseVideo, room?.roomCode)
    }
    else {
      connection?.invoke(InvokeServerFunction.replay, room?.roomCode)
    }

  }

  function handleForward() {
    const request: AddTime = {
      roomCode: room!.roomCode,
      timeStamp: (videoRef.current?.currentTime ?? 0) + 15
    }
    connection?.invoke('ChangeTimeStamp', request);
  }

  function handleBackward() {
    const request: AddTime = {
      roomCode: room!.roomCode,
      timeStamp: (videoRef.current?.currentTime ?? 0) - 15
    }
    connection?.invoke('ChangeTimeStamp', request);
  }

  function handleSliderChange(_event: Event, newValue: number | number[]) {
    const request: AddTime = {
      roomCode: room!.roomCode,
      timeStamp: newValue as number
    }
    connection?.invoke('ChangeTimeStamp', request);
  }

  function handleTimeUpdate(_e: React.SyntheticEvent<HTMLVideoElement, Event>) {
    if (videoRef.current) {
      setTime(videoRef.current.currentTime)
    }
  }


  return (
    <Box width='100%'>
      <Box width='100%' padding={2}>
        <video ref={videoRef} onTimeUpdate={handleTimeUpdate} onEnded={() => setStatus(VideoStatus.Ended)} style={{ width: '100%' }} onLoadedMetadata={(_e) => setVideoDuration(videoRef.current!.duration)} onClick={handleControlClick}>
        </video>
        <Box display='flex' alignItems='center' gap='2'>
          <IconButton onClick={handleControlClick}>
            {
              status === VideoStatus.Paused ? <Play size={24} /> : status === VideoStatus.Playing ? <Pause size={24} /> : <img src={replaySVG} style={{ width: '24px' }} />
            }
          </IconButton>
          <IconButton onClick={handleBackward}>
            <img src={backward15Secs} style={{ width: '2rem', color: 'lightgray' }} />
          </IconButton>
          <IconButton onClick={handleForward}>
            <img src={forward15Secs} style={{ width: '2rem', color: 'lightgray' }} />
          </IconButton>
          <Box display='flex' alignItems='center' justifyContent='center' marginRight={3}>
            <Typography>{formatVideoTime(time)}</Typography>
            {
              videoDuration && <Typography>/{formatVideoTime(videoDuration)}</Typography>
            }
          </Box>
          <Slider
            value={time}
            valueLabelDisplay="auto"
            step={1}
            onChange={handleSliderChange}
            min={0}
            max={videoRef.current?.duration}
            valueLabelFormat={formatVideoTime}
          />
        </Box>
      </Box>
    </Box >
  )
}

export default WatchMovie