import { h, Component, cloneElement } from 'preact';
import { route } from 'preact-router';
import Match from 'preact-router/match';
import Card from 'preact-material-components/Card';
import StockCard from '../../components/stock';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';
import data from '../stocks.json';
export default class Home extends Component {
	constructor() {
		super();
		this.state = {
			chosenIndex: -1,
		};
		this.startLeave = this.startLeave.bind(this);
	}
	componentDidMount() {
		requestAnimationFrame(() => {
			this.page.classList.remove(style.leave);
		});
	}
	startLeave(e, index) {
		this.props.onNavigateRequest('/details');
		const card = e.target.closest('.mdc-card');
		const ghostCard = card.cloneNode(true);
		const clientRects = card.getClientRects()[0];
		const travelDistance = clientRects.top - 50;
		ghostCard.style.top = `${clientRects.top - 16}px`;
		ghostCard.addEventListener('transitionend',() => {
			route(`/details/${index}`);
		}, { once: true });
		ghostCard.style.transitionDuration = '500ms';
		this.props.animateToDetails(ghostCard);
		requestAnimationFrame(() => {
			ghostCard.style.transform = `translateY(-${travelDistance}px)`;
		});
		this.setState({
			chosenIndex: index
		});
		this.page.classList.add(style.leave);
	}
	render() {
		return (
			<div class={style.home} ref={page => this.page = page}>
				{data.map((stock, index) => (
					<StockCard
						className={`${style.card} ${index === this.state.chosenIndex? style.noshow: ''}`}
						onClick={e => this.startLeave(e, index)} stock={stock}
						style={`transition-delay:${(index%10) * 5}ms`}
					/>))
				}
			</div>
		);
	}
}
