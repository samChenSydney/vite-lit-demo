import {css, html, LitElement} from 'lit'
import {classMap} from 'lit/directives/class-map.js';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class WinLossTable extends LitElement {
	static get properties() {
		return {
			currency: {},
			isOne: {type: Boolean},
			searchAccount:{},
			columns: {type: Array},
			data:{type:Object},
			switchableGroups: {state: true},
			isHideAll: {state: true},
			transferredList:{state:true}
		}
	}

	constructor() {
		super()
		this.isOne = false;
		this.currency = "";
		this.searchingAccount = "agent"; //或player
		/**
		 * @type {TableColumnDefinition[]}
		 */
		this.columns = [];
		this.expandAllText = "Expand All";
		this.hideAllText = "Hide All";
		this.switchableGroups = {};
		this.transferredList=[];
		this.isHideAll = true;
	}
	willUpdate(_changedProperties) {
		super.willUpdate(_changedProperties);
		if (_changedProperties.has("columns")) {
			let switchableColumns = this.columns.filter(columnDefinition => columnDefinition.type === "switchable");
			switchableColumns.forEach(switchableColumn => {
				let groupKey = switchableColumn.data.map(switchableThData => switchableThData.key).join('-');
				if (this.switchableGroups[groupKey] === undefined) {
					this.switchableGroups[groupKey] = switchableColumn.data.map((_, index) => {
						return index !== 0;
					});
				}
			});
		}else if(_changedProperties.has("data")){
			let result = [];
			let data = this.data;
			for (const currencyKey in data) {
				const currencyData = data[currencyKey]; // 获取 currency 下的 sh 列表
				let currencyTotal = 0; // 当前 currency 的总和

				for (const sh of currencyData) {
					let shTotal = 0; // 计算当前 sh 下所有 game 的总和

					// 插入 sh 分组行
					result.push({ type: "shHeader", key: sh.key, sum: 0 });

					for (const game of sh.data) {
						// 计算当前 game 的总和
						const gameTotal = game.data.reduce((sum, txn) => sum + txn.amount, 0);
						shTotal += gameTotal;
						result.push({ type: "game", key: game.key, sum: gameTotal });
					}

					// 更新 sh 总计，并修改 shHeader 里对应的 sum 值
					result[result.length - sh.data.length - 1].sum = shTotal;
					currencyTotal += shTotal;
				}

				// 插入 currency 统计行
				result.push({ type: "currencyHeader", key: currencyKey, sum: currencyTotal });
				currencySum += currencyTotal;
			}
		}
	}

	render() {
		return html`
			<table id="newContent" class="tb-mult tb-report">
				${this.renderThead1()}
				${this.renderThead2()}
				
			</table>
		`
	}

	renderThead1() {
		const classes = Object.assign(this.getAgentOrPlayerClasses(), {"bg-none": true})
		return html`
			<thead class=${classMap(classes)}>
			<tr class="tb-mult-topbar">
				<th colspan="16" class="lt">
					<div class="tit" id="title">${this.currency}</div>
					<a class="btnCMain-S" href="javascript:void(0)">${this.hideAllText}
					</a>
					<span class="pos-rt">
                         <span class="txt-time" id="showSearchTime" style="display: none;">
                    <i class="icon icon-clock"></i>
                </span>
                     </span>
				</th>
			</tr>
			</thead>
		`
	}

	renderThead2() {
		return html`
			<thead class="${classMap(this.getAgentOrPlayerClasses())}">
			<tr>
				${this.columns.map((columnDefinition) => {
					switch (columnDefinition.type) {
						case "userId":
							return html`
								<th class="lt show-level-tag" rowspan="2" width="10%">
									<span class="textLevelSec">${this.searchingAccount==="agent" ? "AG" : "PL"}</span>User ID
								</th>`
						case "switchable":
							return this.renderSwitchableTh(columnDefinition.data)
						case "group":
							let groupClassName = columnDefinition.data.parent.className;
							if (this.isShouldHide(columnDefinition.data.showMode)) {
								groupClassName += " hide"
							}
							return html`
								<th class="${groupClassName}"
									colspan="${columnDefinition.data.children.length}">
									${columnDefinition.data.parent.text}
								</th>
							`
						case "normal":
							let normalClassName = columnDefinition.data.className+this.isShouldHide(columnDefinition.data.showMode) ? " hide" : "";
							return html`
								<th rowspan="2" class="${normalClassName}">${columnDefinition.data.text}</th>`
					}
				})}
			</tr>
			<tr>
				${this.columns.filter(columnDefinition => columnDefinition.type === "group").map(columnDefinition => {
					return columnDefinition.data.children.map(child => {
						return html`
							<th class="${child.className}">${child.text}</th>`
					})
				})}
			</tr>
			</thead>`
	}

	renderTBody() {
		return html`
			<tbody class="${classMap(this.getAgentOrPlayerClasses())}">
			<tr class="trTitle pg-level-1" style="">
				
			</tr>
			<tr class="trTotal-body caerus pg-level-2" style="display: none;">
				<td class="site" style="display: none;"></td>
				<td id="gameName" class="lt">Baccarat</td>
				${this.renderSwitchableTd([{
					key: "validTurnover",
					data: "44.00"
				}, {
					key: "grossComm",
					data: "0.00"
				}])}
				${this.renderSwitchableTd([{
					key: "betCountSW",
					data: "8"
				},
					{
						key: "activePlayerSW",
						data: "2"
					}
				])}
				<!--Member-->
				<td data-type="member" id="PlWinloss" class=""><span class="textRed">-22.55</span></td>
				<td data-type="member" id="PlComm">0.00</td>
				<!--downline-->
				<td data-type="downline" id="downlineWinloss">21.42</td>
				<td data-type="downline" id="downlineComm">0.00</td>
				<!--self-->
				<td data-type="self" id="selfWinloss" class="">1.12</td>
				<td data-type="self" id="selfComm">0.00</td>
				<!--Company-->
				<td data-type="company" id="company" class="" style="display: none;">0.00</td>
			</tr>
			<tr style="" class="trTotal pg-total">
				<td class="site" style="display: none;"></td>
				<td id="totalAndCurrency" class="align-R">Total</td>
				${this.renderSwitchableTd([{
					key: "validTurnover",
					data: "44.00"
				}, {
					key: "grossComm",
					data: "0.00"
				}])}
				${this.renderSwitchableTd([{
					key: "betCountSW",
					data: "8"
				},
					{
						key: "activePlayerSW",
						data: "2"
					}
				])}
				<!--Member-->
				<td data-type="member" id="tPWinloss" class=""><span class="textRed">-22.55</span></td>
				<td data-type="member" id="tPComm">0.00</td>
				<!--downline-->
				<td data-type="downline" id="tdownlineWinloss">21.42</td>
				<td data-type="downline" id="tdownlineComm">0.00</td>
				<!--self-->
				<td data-type="self" id="tselfWinloss">1.12</td>
				<td data-type="self" id="tselfComm">0.00</td>
				<!--Company-->
				<td data-type="company" id="tCompany" class="" style="display: none;">0.00</td>
			</tr>
			</tbody>
		`;
	}

	/**
	 *
	 * @param {Record<string,number>}data
	 */
	renderDataColumns(data) {
		return this.columns.map((column) => {
			switch (column.type) {
				case "userId":
					return html`
						<td class="setFlex-alignCenter">
							<a id="signplus" class="btnOpen" href="javascript:void(0)"></a>
							<a id="titleUseID" class="textBtn">${data[column.data.key]}</a>
						</td>`
				case "switchable":
					return this.renderSwitchableTd(column.data)
				case "group":
					let shouldHide = this.isShouldHide(column.data.showMode);
					return html`
						${column.data.children.map(child => {
							return html`
								<td class="${child.className}${shouldHide ? " hide" : ""}">${data[child.key]}</td>`
						})}`
				case "normal":
					return html`
						<td>${data[column.data.key]}</td>`
			}
		})
	}

	renderSwitchableTh(switchableThDatas) {
		let groupKey = switchableThDatas.map(switchableThData => switchableThData.key).join('-');
		if (this.switchableGroups[groupKey] === undefined) {
			//返回一个数组，数组第一个元素是false，其他元素都是true，表示是否hide
			this.switchableGroups[groupKey] = switchableThDatas.map((_, index) => {
				return index !== 0;
			});
		}
		return html`
			<th rowspan=${switchableThDatas.length}>
				${switchableThDatas.map(((switchableThData, index) => {
					const classes = {
						'hide': this.switchableGroups[groupKey][index],
						'btn-txt-switch': true
					}
					return html`
						<a data-type="${switchableThData.key}" class=${classMap(classes)}
							@click="${() => this.switchTh(groupKey, index)}"
							href="javascript:void(0);">${switchableThData.text}</a>`
				}))}
			</th>
		`;
	}

	switchTh(groupKey, index) {
		let newShownIndex = index + 1;
		this.switchableGroups[groupKey] = this.switchableGroups[groupKey].map((_, i) => {
			return i !== newShownIndex % this.switchableGroups[groupKey].length;
		});
		this.requestUpdate();
	}

	renderSwitchableTd(switchableTdDatas) {
		const groupKey = switchableTdDatas.map(switchableTdData => switchableTdData.key).join('-');
		return html`
			<td>
				${switchableTdDatas.map((switchableTdData, index) => {
					const classes = {
						'hide': this.switchableGroups[groupKey][index]
					}
					return html`
						<span data-type="${switchableTdData.key}"
							class=${classMap(classes)}>${switchableTdData.data}</span>`
				})}
			</td>
		`;
	}

	renderTFoot() {
		return html`
			<thead class="style-empty">
			</thead>`
	}

	getAgentOrPlayerClasses() {
		return {
			"style-agent": this.isOne,
			"style-player": !this.isOne,
		};
	}

	/**
	 *
	 * @param {ShowMode} showMode
	 * @return {boolean}
	 */
	isShouldHide(showMode){
		return (showMode === "ONLY_ONE" && !this.isOne) || (showMode === "ONLY_NOT_ONE" && this.isOne);
	}
	static get styles() {
		return css`
          .hide {
            display: none;
          }
		`
	}
}

window.customElements.define('win-loss-table', WinLossTable)
