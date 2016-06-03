import React, { Component, PropTypes } from 'react';

const LoadMoreButton = ({fetchMoreData, path}) => {

  const loadMoreData = () => { fetchMoreData(path) };

  return (
    <button className="button is-large" onClick={loadMoreData}>
      Load more..
    </button>
  )
};

export default LoadMoreButton;
