import {html, LitElement} from "lit";
import './flatpickr-datepicker.js'
class SearchBar extends LitElement {
	static properties = {
		currencyList: {state: true},
		websiteList: {state: true},
		isOne: {state: true},
	};

	constructor() {
		super();
		this.currencyList = [];
		this.websiteList = [];
		this.isOne = false;
	}

	createRenderRoot() {
		return this;
	}

	render() {
		return html`
			<div class="page-body pt-0">
				<div class="sel-multbox">
					${this.renderCurrencyList()}
					<br>
					${this.renderWebsiteList()}
					<br>
				</div>
				<div class="search-form">
					<div class="form-edit w-auto">
						<div class="form-group w-150px">
							<input class="inputL" type="text" id="searchId" placeholder="User ID"
								maxlength="20">
						</div>
						<div class="form-group w-150px">
							<select class="form-select" id="isInternal">
								<option value="-1">
									ALL
								</option>
								<option value="1">
									Internal
								</option>
								<option value="0" selected="">
									Not Internal
								</option>
							</select>
						</div>
						<div class="form-group">
							<select class="form-select" id="hoursSetting">
								<option selected value="12:00:00">12:00:00 - 12:00:00</option>
								<option value="08:00:00">08:00:00 - 08:00:00</option>
								<option value="00:00:00">00:00:00 - 00:00:00</option>
							</select>
						</div>
					</div>
					<div class="form-edit w-auto">
						<flatpickr-datepicker></flatpickr-datepicker>
						<div class="form-group btn-group">
							<a class="btn btn-primary" href="javascript:void(0)" @click="${()=>this.search()}">
								Search
							</a>
							<div class="btn-group">
								${this.renderPeriodButtons()}
							</div>
						</div>
					</div>
				</div>
				<div class="search-result">
					<a class="btn-o float-R" href="javascript:void(0)" id="excelDownload"
						title="download Win Loss Report">
						<i class="icon-download"></i>
					</a>
				</div>
			</div>
		`
	}
	// **渲染日期范围按钮**
	renderPeriodButtons() {
		const periods = [
			{ label: "Today", value: "today" },
			{ label: "Yesterday", value: "yesterday" },
			{ label: "This Week", value: "thisWeek" },
			{ label: "Last Week", value: "lastWeek" },
			{ label: "This Month", value: "thisMonth" },
			{ label: "Last Month", value: "lastMonth" }
		];

		return periods.map(period => html`
			<a class="btn period" href="javascript:void(0)" @click="${() => {this.setDateRangeAndSearch(period.value)}}">
				${period.label}
			</a>
		`);
	}
	setDateRangeAndSearch(period){
		this.querySelector("flatpickr-datepicker").setDateRange(period);
		this.search();
	}
	renderCurrencyList() {
		return html`
			<ul class="sel-multbox-ul edit">
				<li>
					<a class="sel-allbtn checked" href="javascript:void(0)" id="currencies">
						<span class="icon icon-currency"></span>
						<span class="game-type-txt">Currency</span>
					</a>
				</li>
				${this.currencyList.map(currency => html`
					<li>
						<label class="inputCheckbox">
							<input type="checkbox" id="${currency}">
							<span>${currency}</span>
						</label>
					</li>
				`)}
			</ul>
		`;
	}
	renderWebsiteList() {
		return html`
			<ul class="sel-multbox-ul edit">
				<li>
					<a class="sel-allbtn
					checked" href="javascript:void(0)" id="webSiteTypes">
						<span class="icon icon-website"></span>
						<span class="game-type-txt">WebSite</span>
					</a>
				</li>
				${this.websiteList.map(website => html`
					<li>
						<label class="inputCheckbox">
							<input type="checkbox" id="${website}">
							<span>${website}</span>
						</label>
					</li>
				`)}
			</ul>
		`;
	}
	// **点击搜索时获取当前选中的值**
	search() {
		const isInternal = this.querySelector("#isInternal").value;
		const hoursSetting = this.querySelector("#hoursSetting").value;

		// 读取选中的 currency
		const selectedCurrencies = Array.from(this.querySelectorAll('input[id^="currency-"]:checked'))
			.map(input => input.id.replace("currency-", ""));

		// 读取选中的 website
		const selectedWebsites = Array.from(this.querySelectorAll('input[id^="website-"]:checked'))
			.map(input => input.id.replace("website-", ""));
		let dateQuery = this.querySelector("flatpickr-datepicker").getDate();
		// 触发自定义事件，发送当前搜索条件
		this.dispatchEvent(new CustomEvent("search", {
			detail: {
				isInternal,
				hoursSetting,
				selectedCurrencies,
				selectedWebsites,
				date: dateQuery
			}
		}));
	}
}
customElements.define("search-bar", SearchBar);
