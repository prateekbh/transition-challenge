import { h, Component } from 'preact';
import Icon from 'preact-material-components/Icon';
import List from 'preact-material-components/List';
import Fab from 'preact-material-components/Fab';
import StockCard from '../../components/stock';
import friends from '../friends.json';
import 'preact-material-components/Fab/style.css';
import 'preact-material-components/List/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';

export default class Profile extends Component {

	componentDidMount() {
		this.props.getRouter()
			.runAnimation(this.pic.getBoundingClientRect())
			.then(this.completeHandoff)
			.catch(this.completeHandoff);
	}

	completeHandoff = () => {
		// this.setState({
		// 	visibilityState: 'visible'
		// });
	}

	componentWillLeave() {
		// const ghostCard = this.stockcard.base.cloneNode(true);
		// const clientRects = this.stockcard.base.getBoundingClientRect();
		// this.props.getRouter().addSharedElement(ghostCard, clientRects);
		// this.setState({
		// 	visibilityState: 'leaving'
		// });
	}

	render(props) {
		const friendData = friends[props.id];
		return (
			<div class={`${style.profile} page ${style[this.state.visibilityState]}`}>
				<div className={style.heading}>
					<div className={style.pic} ref={pic => this.pic = pic} style={`background-image: url(${friendData.pic})`} />
					<div className={style.name}>
						<div className='mdc-typography--display1'>{friendData['first_name']}</div>
						<div className='mdc-typography--headline'>{friendData['last_name']}</div>
					</div>
				</div>
			</div>
		);
	}
}
