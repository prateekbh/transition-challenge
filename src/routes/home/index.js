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
	constructor(props) {
		super();
		this.state = {
			chosenIndex: -1//this.props.appRouter.getPrevUrl()
		};
		this.startLeave = this.startLeave.bind(this);
	}
	componentDidMount() {
		// this.props.removeGhost();
		// if (this.entryCard) {
		// 	const entryCardDom = this.entryCard.base;
		// 	const clientRects = entryCardDom.getClientRects()[0];
		// 	const travelDistance = clientRects.top - 50;
		// 	entryCardDom.style.transform = `translateY(-${travelDistance}px)`;
		// 	entryCardDom.style.opacity = 1;
		// 	requestAnimationFrame(() => {
		// 		entryCardDom.style.transform = `translateY(${0}px)`;
		// 	});
		// }
		// requestAnimationFrame(() => {
		// 	this.page.classList.remove(style.leave);
		// });
	}
	startLeave(e, index) {
		const card = e.target.closest('.mdc-card');
		const ghostCard = card.cloneNode(true);
		const clientRects = card.getBoundingClientRect();
		this.setState({
			chosenIndex: index
		});
		this.props.getRouter().animateToDetails(ghostCard, clientRects, index);
	}
	render() {
		return (
			<div class={`page ${style.home}`} ref={page => this.page = page}>
				{data.map((stock, index) => (
					<StockCard
						key={index}
						ref={card => {
							if (index === this.state.chosenIndex) {
								this.entryCard = card;
							}
						}}
						className={`${style.card} ${index === this.state.chosenIndex? style.noshow: ''}`}
						onClick={e => this.startLeave(e, index)} stock={stock}
						style={`transition-delay:${(index%10) * 5}ms; animation-delay:${(index%10) * 70}ms`}
					/>))
				}
			</div>
		);
	}
}
