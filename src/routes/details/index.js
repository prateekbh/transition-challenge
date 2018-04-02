import { h, Component } from 'preact';
import {route} from 'preact-router';
import Icon from 'preact-material-components/Icon';
import List from 'preact-material-components/List';
import Fab from 'preact-material-components/Fab';
import StockCard from '../../components/stock';
import data from '../stocks.json';
import friends from '../friends.json';
import 'preact-material-components/Fab/style.css';
import 'preact-material-components/List/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';

export default class Details extends Component {

	componentDidMount() {
		this.props.getRouter()
			.runAnimation(this.stockcard.base.getBoundingClientRect())
			.then(this.completeHandoff)
			.catch(this.completeHandoff);
	}

	componentWillLeave() {
		const element = this.sharedElement ? this.sharedElement: this.stockcard.base;
		const ghostCard =  element.cloneNode(true);
		if (!this.sharedElement) {
			ghostCard.className = 'mdc-card';
		}
		const clientRects = element.getBoundingClientRect();
		this.props.getRouter().addSharedElement(ghostCard, clientRects);
		this.setState({
			visibilityState: 'leaving'
		});
	}

	completeHandoff = () => {
		window.scrollTo(0,0);
		this.setState({
			visibilityState: 'visible'
		});
	}

	goToProfile = (e, index) => {
		this.sharedElement = e.target.closest(`.${style.customlistitem}`).querySelector(`.${style.pic}`);
		route(`/profile/${index}`);
	}

	render(props) {
		const cardData = data[props.cardindex];
		return (
			<div class={`${style.details} page ${style[this.state.visibilityState]}`}>
				<div className={`${style.detailsheader} ${style[this.state.route]}`} />
				<StockCard ref={card => this.stockcard = card} className={style.card} stock={cardData} />
				<div className={style.infodetails}>
					<div className={`${style.info} mdc-typography--subheading1`}>
						<div className={`${style.startdate}`}>Launch date: 31 May 2007</div>
						<div className={`${style.stats}`}><Icon>expand_less</Icon> 1.54%</div>
					</div>
					<div className="mdc-typography--caption">Equity - Mid Cap</div>
				</div>
				{this.state.visibilityState === 'visible' && <div>
					<List className={style.infolist}>
						{
							friends.map((friend, index) => {
								return (
									<List.Item className={style.customlistitem}
										style={`animation-delay: ${(index+1) * 100}ms`}
										onClick={e=> this.goToProfile(e,index)}>
										<span role="presentation" class={`mdc-list-item__graphic ${style.pic}`}
											style={`background-image:url(${friend.pic})`}/>
										<List.TextContainer>
											<List.PrimaryText>{friend.first_name}</List.PrimaryText>
											<List.SecondaryText>{friend.last_name}</List.SecondaryText>
										</List.TextContainer>
										<List.ItemMeta>navigate_next</List.ItemMeta>
									</List.Item>
								);
							})
						}
					</List>
				</div>}
				<Fab className={style.fablike}>
					<Fab.Icon>favorite_border</Fab.Icon>
				</Fab>
				<Fab className={style.fabwallet}>
					<Fab.Icon>account_balance_wallet</Fab.Icon>
				</Fab>
			</div>
		);
	}
}
