import React, {PropTypes, Component} from 'react';
import moment from 'moment';
import SC from 'soundcloud';
import {httpsify, trackTime} from '../helpers/helpers';

const Track = ({ trackData, streamTrack }) => {

  var imageUrl = trackData.artwork_url || trackData.user.avatar_url || 'https://placehold.it/64x64';

  var title = trackData.title;
  title.length > 23 ? title = title.slice(0, 23) + '...' : title;

  var username = trackData.user.username;
  username.length > 15 ? username = username.slice(0, 23) + '...' : username;

  var creationDate = moment(trackData.created_at, 'YYYY/MM/DD hh:mm:ss +0000').fromNow();

  const stream = () => {
    streamTrack(trackData);
  };

  return (
    <a className="card my-track"
       style={{backgroundImage: 'url(' + httpsify(trackData.waveform_url) + ')'}}
       onClick={stream}>
      <div className="card-content">
        <div className="media">

          <div className="media-left">
            <figure className="image is-64x64">
              <img src={httpsify(imageUrl)} alt="Image"></img>
            </figure>
          </div>

          <div className="media-content">
            <p className="title is-5">{trackData.user.username}</p>
            <p className="subtitle is-6">{title}</p>
            <p> {trackTime(trackData.duration)}</p>
          </div>
        </div>

        <div className="content">
          <span className="content--item">
            <small>{creationDate}</small>
          </span>
          <span className="content--item">
            <small>plays: {trackData.playback_count}</small>
          </span>
          <span className="content--item">
            <small>likes: {trackData.likes_count}</small>
          </span>
        </div>
      </div>
    </a>
  );
};

export default Track
