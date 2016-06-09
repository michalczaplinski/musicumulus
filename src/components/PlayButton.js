import React, {PropTypes, Component} from 'react';

import {SCPlayer} from '../containers/Player';

export const PlayButton = ({ tracks, is_streaming, is_playing, startStreaming, pauseTrack, resumeTrack }) => {

  const pause = () => {
    if (is_streaming) {
      SCPlayer.pause();
      pauseTrack();
    }
  };

  const play = () => {
    // in case we have a streaming instance of SC player, just resume current song.
    if (is_streaming) {
      SCPlayer.play();
      resumeTrack();

      // otherwise, stream the first song on the list.
    } else {
      startStreaming(tracks[0])
    }
  };

  let handleClick = is_playing ? pause : play;
  let icon = is_playing ? 'fa fa-pause' : 'fa fa-play';

  return (
    <a className="player--item" onClick={handleClick}>
      <i className={icon}></i>
    </a>
  )
};
