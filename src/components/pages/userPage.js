import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { bindActionCreators } from 'redux'


import { getAuthedUser, getCurrentUser, userActions } from '../../core/users'
import Tracklist from '../tracklist'
import * as tracklistActions from '../../core/tracklists'
import UserCard from '../userCard'

class UserPage extends Component {
	componentDidUpdate() {
  if(this.scrolled === false){
    window.scrollTo(0,0);
    this.scrolled = true;
  }
}

	componentWillMount() {
		this.props.fetchCurrentUser(this.props.match.params.id)
		this.props.fetchUserTracks(this.props.match.params.id, this.props.match.params.section)
		this.loadCurrentUser()
		console.log('props',this.props)
	}

	componentWillUpdate(nextProps) {
		if (nextProps.match.params !== this.props.match.params) {
			this.loadCurrentUser(nextProps.match.params)
			this.props.fetchUserTracks(nextProps.match.params.id, nextProps.match.params.section)
		}
	}

	loadCurrentUser(params) {
		params = params || this.props.match.params
		this.props.loadUser(params.id)
		if (params.section === 'favorites') {
			this.props.loadUserFavorites(params.id)
		} else {
			this.props.loadUserTracks(params.id)
		}
	}

	render() {
		const { currentUser, authedUser } = this.props
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
	(authedUser, currentUser) => ({authedUser, currentUser})
)

function mapDispatchToProps(dispatch) {
	return {
		loadUser: bindActionCreators(userActions.loadUser, dispatch),
		loadUserFavorites: bindActionCreators(userActions.loadUserFavorites, dispatch),
		loadUserTracks: bindActionCreators(userActions.loadUserTracks, dispatch),
		fetchCurrentUser: bindActionCreators(userActions.fetchCurrentUser, dispatch),
		fetchUserTracks: bindActionCreators(tracklistActions.fetchUserTracks, dispatch),
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(UserPage)