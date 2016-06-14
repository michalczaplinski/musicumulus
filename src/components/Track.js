import React, {PropTypes, Component} from 'react';
import moment from 'moment';
import SC from 'soundcloud';
import {httpsify, trackTime} from '../helpers/helpers';

const Track = ({ trackData, streamTrack }) => {

  var imageUrl = trackData.artwork_url || trackData.user.avatar_url || 'https://placehold.it/64x64';
  var creationDate = moment(trackData.created_at, 'YYYY/MM/DD hh:mm:ss +0000').fromNow();

  return (
    <a className="card track"
       style={{backgroundImage: 'url(' + httpsify(trackData.waveform_url) + ')'}}
       onClick={ () => streamTrack(trackData) }>
      <div className="card-content">
        <div className="media">

          <div className="media-left">
            <figure className="image is-64x64">
              <img src={httpsify(imageUrl)} alt="Image"></img>
            </figure>
          </div>

          <div className="media-content">
            <p className="track--trackArtist title is-5">{trackData.user.username}</p>
            <p className="track--trackTitle subtitle is-6">{trackData.title}</p>
            <p> {trackTime(trackData.duration)}</p>
          </div>
        </div>

        <div className="content">
          <span className="content--item">
            <small>{creationDate}</small>
          </span>
          <span className="content--item track--plays">
            <small><i className="track--playsIcon fa fa-music"> </i>{trackData.playback_count}</small>
          </span>
          <span className="content--item track--heart">
            <small><i className="track--heartIcon fa fa-heart"></i> {trackData.likes_count}</small>
          </span>
        </div>
      </div>
    </a>
  );
};

export default Track
