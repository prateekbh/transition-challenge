import {h, Component} from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import style from './style';

export default class StockCard extends Component {
	render(props) {
		return (
			<Card className={`${style.stockcard} ${props.class} ${props.className}`} {...props}>
				<div>
					<h2 class={`${style.title} mdc-typography--title`}>{props.stock.company_name}</h2>
				</div>
				<div className={style.stock_details}>
          <div className={`${style.stock_details_header} mdc-typography--caption`}>
            <div className={style.stock_details_cost}>Cost</div>
            <div className={style.stock_details_date}>Date</div>
            <div className={style.stock_details_sym}>Symbol</div>
          </div>
          <div className={style.stock_details_values}>
            <div className={`${style.stock_details_cost} mdc-typography--title`}>{props.stock.stock_price}</div>
            <div className={style.stock_details_date}>{props.stock.date}</div>
            <div className={style.stock_details_sym}>{props.stock.symbol}</div>
          </div>
        </div>
			</Card>
		);
	}
}