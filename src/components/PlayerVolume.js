import React from 'react';

import {SCPlayer} from '../containers/Player';

const PlayerVolume = ({currentVolume, previousVolume, changeVolume}) => {

  const setVolume = (volume) => {
    changeVolume(volume, currentVolume);
    SCPlayer.setVolume(volume);
  };

  const mute = () => {
    changeVolume(0, currentVolume);
    SCPlayer.setVolume(0)
  };

  const unmute = () => {
    changeVolume(previousVolume, 0);
    SCPlayer.setVolume(previousVolume);
  };

  let volumeIcon = `fa fa-volume-${currentVolume > 0 ? 'up' : 'off'}`;

  return (
    <a className="player--item"
       onClick={() => currentVolume > 0 ? mute() : unmute()}>
      <i className={volumeIcon}> </i>
    </a>
  )
};

export default PlayerVolume
