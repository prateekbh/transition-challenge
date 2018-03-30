import { h, Component } from 'preact';
import { Router } from 'preact-router';
import PreactCSSTransitionGroup from 'preact-animate';
import Header from './header';
import Home from '../routes/home';
import Profile from '../routes/profile';
import AppRouter from './app-router';

export default class App extends Component {
	constructor(){
		super();
		this.appRouter_;
		this.onNavigateRequest = this.onNavigateRequest.bind(this);
		this.animateToDetails = this.animateToDetails.bind(this);
		this.animateToHome = this.animateToHome.bind(this);
		this.removeGhost = this.removeGhost.bind(this);
		this.getPrevUrlIndex = this.getPrevUrlIndex.bind(this);
	}
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.appRouter_ && this.appRouter_.setRoute(e.url);
		this.onNavigateRequest(e.url);
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

	getPrevUrlIndex() {
		if (!this.prevUrl) {
			return -1;
		}
		return Number(this.prevUrl.substring(this.prevUrl.lastIndexOf('/') + 1));
	}

	componentDidMount() {
		this.appRouter_ = new AppRouter(this.animGhost, this.header);
	}

	render() {
		return (
			<div id="app" className={`${this.state.prevUrl===null?'firstview':''}`}>
				<Header ref={header => this.header= header} />
				<TransitionRouter onChange={this.handleRoute} >
					<Home key="1" path="/" getRouter={() => this.appRouter_} />
					<Profile key="2" getRouter={() => this.appRouter_} path="/details/:cardindex" />
				</TransitionRouter>
				<div ref={animGhost => this.animGhost = animGhost} className="animation-ghost" />
			</div>
		);
	}
}

class TransitionRouter extends Router {
	render(props, state) {
		return (
			<PreactCSSTransitionGroup
				component="div"
				transitionName="pageTransition"
				transitionEnter={false}
				transitionLeave
        transitionLeaveTimeout={500}
			>
				{super.render(props, state)}
			</PreactCSSTransitionGroup>
		);
	}
}