import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
//import { Link } from 'react-router-dom';

//import { getTracks } from '../core/tracks'
//import { getTrackById } from '../core/tracks'
import { getTracksForCurrentTracklist, getCurrentTracklist, getTracklistLoaded } from '../core/tracklists'
import TrackCard from './trackCard'
import Spinner from './spinner'
import { playerActions } from '../core/player'


function List({ tracks, playTrack, tracklistId }) {
	const renderList = tracks.map(track => 
		<div key={track.id}>
			<div className="three wide column">
				<TrackCard track={track} play={playTrack.bind(null, track, tracklistId)} />
			</div>
		</div>
	)
	return (
		<div className="ui centered grid">
			{renderList}
		</div>
	)
}

class Tracklist extends Component {
	render() {
		const { tracklist, tracks, isLoaded, playTrack } = this.props
		console.log('isLoaded', isLoaded)
		return (
			<div className="tracklist">
				{isLoaded ? <List tracks={tracks} playTrack={playTrack} tracklistId={tracklist.id} /> : <Spinner />}	
			</div>
		)
	}
}


const mapStateToProps = createSelector(
	getCurrentTracklist,
	getTracksForCurrentTracklist,
	getTracklistLoaded,
	(tracklist, tracks, isLoaded) => ({ tracklist, tracks, isLoaded })
);

const mapDispatchToProps = {
	playTrack: playerActions.playSelectedTrack
}

export default connect(mapStateToProps, mapDispatchToProps)(Tracklist)