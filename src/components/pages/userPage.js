import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { bindActionCreators } from 'redux'


import { getAuthedUser, getCurrentUser, userActions } from '../../core/users'
import Tracklist from '../tracklist'
import * as tracklistActions from '../../core/tracklists'
import UserCard from '../userCard'
import { getTracklistStatus, getCurrentTracklist } from '../../core/tracklists'

class UserPage extends Component {
	constructor() {
		super()
		this.state = {
			tracksLoaded: false,
			favoritesLoaded: false
		}
	}

	componentDidMount() {
  	if (this.scrolled === false){
    	window.scrollTo(0,0);
    	this.scrolled = true;
  	}
  	this.props.fetchCurrentUser(this.props.match.params.id)
		this.props.fetchUserTracks(this.props.match.params.id, this.props.match.params.section)
		this.loadCurrentUser()
	}

	componentWillMount() {

	}

	componentWillUpdate(nextProps) {
		if (nextProps.match.params !== this.props.match.params) {
			console.log('favoritesLoaded', this.state.favoritesLoaded)
			console.log('tracksLoaded', this.state.tracksLoaded)
			this.loadCurrentUser(nextProps.match.params)
			if (this.state.tracksLoaded !== this.state.favoritesLoaded) {
				this.props.fetchUserTracks(nextProps.match.params.id, nextProps.match.params.section)
			} else {
				this.props.reloadPlaylist(`users/${nextProps.match.params.id}/${nextProps.match.params.section}`)
			}
		}
	}

	loadCurrentUser(params) {
		params = params || this.props.match.params
		this.props.loadUser(params.id)
		if (params.section === 'favorites') {
			this.props.loadUserFavorites(params.id)
			this.setState({ favoritesLoaded: true })
		} else {
			this.props.loadUserTracks(params.id)
			this.setState({ tracksLoaded: true })
		}
	}

	render() {
		const { currentUser, authedUser, currentTracklist, isLoaded } = this.props
		if (!currentUser) return null;
		return (
			<div>
				<UserCard user={currentUser}/>
				<div className="ui container">
					<Tracklist />
				</div>
			</div>
			
		)
	}
}

const mapStateToProps = createSelector(
	getAuthedUser,
	getCurrentUser,
	getTracklistStatus,
	getCurrentTracklist,
	(authedUser, currentUser, isLoaded, currentTracklist) => ({authedUser, currentUser, isLoaded, currentTracklist})
)

function mapDispatchToProps(dispatch) {
	return {
		loadUser: bindActionCreators(userActions.loadUser, dispatch),
		loadUserFavorites: bindActionCreators(userActions.loadUserFavorites, dispatch),
		loadUserTracks: bindActionCreators(userActions.loadUserTracks, dispatch),
		fetchCurrentUser: bindActionCreators(userActions.fetchCurrentUser, dispatch),
		fetchUserTracks: bindActionCreators(tracklistActions.fetchUserTracks, dispatch),
		reloadPlaylist: bindActionCreators(tracklistActions.reloadPlaylist, dispatch)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(UserPage)