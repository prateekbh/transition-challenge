import { h, Component } from 'preact';
import { route } from 'preact-router';
import 'preact-material-components/Toolbar/style.css';
import style from './style';

export default class Header extends Component {
	constructor() {
		super();
		this.state = {
			route: 'home'
		};
	}
	navigateRequest(route) {
		this.setState({
			route
		});
	}
	render() {
		return (
			<div>

			</div>
		);
	}
}
