import { h, Component } from 'preact';
import { route } from 'preact-router';
import Toolbar from 'preact-material-components/Toolbar';
import Icon from 'preact-material-components/Icon';
import 'preact-material-components/Toolbar/style.css';
import style from './style';

export default class Header extends Component {
	constructor() {
		super();
		this.state = {
			mode: 'home'
		};
	}
	showDetails(mode) {
		this.setState({
			mode
		});
	}
	render() {
		return (
			<div>
				<Toolbar className={`${style.toolbar} ${style[this.state.mode]}`}>
					<Toolbar.Row>
						<Toolbar.Section align-start>
							<Toolbar.Title>
								My Stocks
							</Toolbar.Title>
						</Toolbar.Section>
						<Toolbar.Section align-end>
							<Icon className={style.sideicon}>sort</Icon>
							<Icon className={style.sideicon}>insert_drive_file</Icon>
						</Toolbar.Section>
					</Toolbar.Row>
				</Toolbar>
				<div className={`${style.detailsheader} ${style[this.state.mode]}`}>
				</div>
			</div>
		);
	}
}
