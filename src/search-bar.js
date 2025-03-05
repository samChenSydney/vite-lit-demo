import {html, LitElement} from "lit";

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
						<div class="form-group date-group">
							<input type="date">
							<input type="date">
						</div>
						<div class="form-group btn-group">
							<a class="btn btn-primary" href="javascript:void(0)">
								Search
							</a>
							<div class="btn-group">
								<a class="btn period" href="javascript:void(0)">
									Today
								</a>
								<a class="btn period" href="javascript:void(0)">
									Yesterday
								</a>
								<a class="btn period" href="javascript:void(0)">
									This Week
								</a>
								<a class="btn period" href="javascript:void(0)">
									Last Week
								</a>
								<a class="btn period" href="javascript:void(0)">
									This Month
								</a>
								<a class="btn period" href="javascript:void(0)">
									Last Month
								</a>
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
}
customElements.define("search-bar", SearchBar);
