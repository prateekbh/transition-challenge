import { h, Component } from 'preact';
import { route } from 'preact-router';
import Card from 'preact-material-components/Card';
import StockCard from '../../components/stock';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';
import data from '../stocks.json';
export default class Home extends Component {
	constructor() {
		super();
		this.startLeave = this.startLeave.bind(this);
	}
	startLeave(e) {
		this.props.onNavigateRequest('details');
		document.body.classList.add('lock');
		const card = e.target.closest('.mdc-card');
		card.addEventListener('transitionend',() => {
			route('/details');
		}, { once: true });
		const clientRects = card.getClientRects()[0];
		const travelDistance = clientRects.top - 50;
		card.classList.add(style.noleave);
		card.style.transitionDuration = `${travelDistance}ms`;
		card.style.transform = `translateY(-${travelDistance}px)`;
		this.page.classList.add(style.leave);
	}
	render() {
		return (
			<div class={style.home} ref={page => this.page = page}>
				{data.map((stock, index) => (
					<StockCard
						className={style.card}
						onClick={this.startLeave} stock={stock}
						style={`transition-delay:${index*5}ms`}
					/>))
				}
			</div>
		);
	}
}
