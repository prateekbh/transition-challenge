import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Home from '../routes/home';
import Profile from '../routes/profile';
// import Home from 'async!../routes/home';
// import Profile from 'async!../routes/profile';

export default class App extends Component {
  constructor(){
    super();
    this.onNavigate = this.onNavigate.bind(this);
  }
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

  onNavigate(mode) {
    this.header.showDetails(mode);
  }

	render() {
		return (
			<div id="app">
				<Header ref={header=>this.header= header} />
				<Router onChange={this.handleRoute}>
					<Home onNavigateRequest={this.onNavigate} path="/" />
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />
				</Router>
			</div>
		);
	}
}
