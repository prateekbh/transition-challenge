import { h, Component, cloneElement } from 'preact';
import { route } from 'preact-router';
import StockCard from '../../components/stock';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';
import data from '../stocks.json';

export default class Home extends Component {
	constructor(props) {
		super();
		const prevUrl = props.getRouter().getPrevUrl() || '/-1';
		this.state = {
			exitCardIndex: -1,
			entryCardIndex: Number(prevUrl.substring(prevUrl.lastIndexOf('/') + 1))
		};
		this.startLeave = this.startLeave.bind(this);
	}
	completeHandoff = () => {
		this.setState({
			handoffDone: true
		});
	}
	componentDidMount() {
		if (!this.entryCard) {
			this.completeHandoff();
			return;
		}
		requestAnimationFrame(() => {
			this.props.getRouter()
				.runAnimation({
					top: this.entryCard.base.getBoundingClientRect().top
				})
				.then(this.completeHandoff)
				.catch(this.completeHandoff);
		});
	}
	startLeave(e, index) {
		const card = e.target.closest('.mdc-card');
		const ghostCard = card.cloneNode(true);
		const clientRects = card.getBoundingClientRect();
		this.setState({
			exitCardIndex: index
		});
		this.props.getRouter().addSharedElement(ghostCard, clientRects);
		route(`/details/${index}`);
	}
	render() {
		return (
			<div class={`page ${style.home} ${this.state.handoffDone?style.appear:''}`} ref={page => this.page = page}>
				{data.map((stock, index) => (
					<StockCard
						key={index}
						ref={card => {
							if (index === this.state.entryCardIndex) {
								this.entryCard = card;
							}
						}}
						className={`${style.card} ${index === this.state.exitCardIndex? style.noshow: ''}
								${index === this.state.entryCardIndex? style.entrycard: ''}`}
						onClick={e => this.startLeave(e, index)} stock={stock}
						style={`transition-delay:${(index%10) * 5}ms; animation-delay:${(index%10) * 70}ms`}
					/>))
				}
			</div>
		);
	}
}
