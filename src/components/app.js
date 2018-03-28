import { h, Component } from 'preact';
import { Router } from 'preact-router';
import PreactCSSTransitionGroup from 'preact-css-transition-group';
import Header from './header';
import Home from '../routes/home';
import Profile from '../routes/profile';
// import Home from 'async!../routes/home';
// import Profile from 'async!../routes/profile';

export default class App extends Component {
	constructor(){
		super();
		this.prevUrl = null;
		this.onNavigateRequest = this.onNavigateRequest.bind(this);
		this.animateToDetails = this.animateToDetails.bind(this);
		this.animateToHome = this.animateToHome.bind(this);
		this.removeGhost = this.removeGhost.bind(this);
	}
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.prevUrl = this.currentUrl;
		this.currentUrl = e.url;
		this.onNavigateRequest(this.currentUrl);
	};

	onNavigateRequest(mode) {
		if (mode === '/') {
			this.header.navigateRequest('home');
		}
		else if (mode.startsWith('/details')) {
			this.header.navigateRequest('details');
		}
	}

	animateToDetails(card) {
		document.body.classList.add('lock');
		this.animGhost.appendChild(card);
	}

	animateToHome(card) {
		window.scrollTo(0,0);
		document.body.classList.remove('lock');
		this.animGhost.appendChild(card);
	}

	removeGhost() {
		this.animGhost.innerHTML = '';
	}

	render() {
		return (
			<div id="app">
				<Header ref={header => this.header= header} />
				<Router onChange={this.handleRoute} >
					<Home key="1" onNavigateRequest={this.onNavigateRequest} animateToDetails={this.animateToDetails} removeGhost={this.removeGhost} path="/" />
					<Profile key="2" removeGhost={this.removeGhost} animateToHome={this.animateToHome} path="/details/:cardindex" />
				</Router>
				<div ref={animGhost => this.animGhost = animGhost} className="animation-ghost" />
			</div>
		);
	}
}