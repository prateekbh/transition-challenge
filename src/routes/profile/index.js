import { h, Component } from 'preact';
import Icon from 'preact-material-components/Icon';
import List from 'preact-material-components/List';
import StockCard from '../../components/stock';
import data from '../stocks.json';
import 'preact-material-components/List/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';

export default class Profile extends Component {
	componentDidMount() {
		this.props.removeGhost();
	}

	componentWillUnmount() {
		this.props.animateToHome(this.stockcard.base.cloneNode(true));
	}

	render(props) {
		const cardData = data[props.cardindex];
		return (
			<div class={style.profile}>
				<StockCard ref={card => this.stockcard = card} className={style.card} stock={cardData} />
				<div className={style.infodetails}>
					<div className={`${style.info} mdc-typography--subheading1`}>
						<div className={`${style.startdate}`}>Launch date: 31 May 2007</div>
						<div className={`${style.stats}`}><Icon>expand_less</Icon> 1.54%</div>
					</div>
					<div className='mdc-typography--caption'>Equity - Mid Cap</div>
				</div>
				<div>
					<List className={style.infolist}>
						<List.Item className={style.customlistitem} style="animation-delay:100ms">
							<List.TextContainer>
								<List.PrimaryText>March Stats</List.PrimaryText>
								<List.SecondaryText>Gain 15%</List.SecondaryText>
							</List.TextContainer>
							<List.ItemMeta>navigate_next</List.ItemMeta>
						</List.Item>
						<List.Item className={style.customlistitem} style="animation-delay:200ms">
							<List.TextContainer>
								<List.PrimaryText>Feb Stats</List.PrimaryText>
								<List.SecondaryText>Loss 1%</List.SecondaryText>
							</List.TextContainer>
							<List.ItemMeta>navigate_next</List.ItemMeta>
						</List.Item>
						<List.Item className={style.customlistitem} style="animation-delay:300ms">
							<List.TextContainer>
								<List.PrimaryText>Jan Stats</List.PrimaryText>
								<List.SecondaryText>Gain 5%</List.SecondaryText>
							</List.TextContainer>
							<List.ItemMeta>navigate_next</List.ItemMeta>
						</List.Item>
					</List>
				</div>
			</div>
		);
	}
}
