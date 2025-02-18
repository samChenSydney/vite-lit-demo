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
			isOne: {type:Boolean},
			columnDefinitions:{type:Array},
			switchableGroups: {state: true},
			isHideAll: {state: true},
		}
	}

	constructor() {
		super()
		this.isOne=false;
		this.currency = "";
		/**
		 * @type {TableColumnDefinition[]}
		 */
		this.columnDefinitions=[];
		this.expandAllText = "Expand All";
		this.hideAllText = "Hide All";
		this.switchableGroups = {};
		this.isHideAll=true;
	}

	render() {
		return html`
			<table id="newContent" class="tb-mult tb-report">
				${this.renderThead1()}
				${this.renderThead2()}
				${this.renderTBody()}
			</table>
		`
	}

	renderThead1() {
		const classes = Object.assign(this.getAgentOrPlayerClasses(),{"bg-none":true})
		return html`
			<thead  class=${classMap(classes)}>
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
				${this.columnDefinitions.map((columnDefinition)=>{
					switch (columnDefinition.type){
						case "userId":
							return html`<th class="lt show-level-tag" rowspan="2" width="10%">
								<span class="textLevelSec">${this.isOne?"AG":"PL"}</span>User ID
							</th>`
						case "switchable":
							return this.renderSwitchableTh(columnDefinition.data)
						case "group":
							let groupClassName = columnDefinition.data.parent.className;
							if(columnDefinition.data.parent.isShownWhenOne&&!this.isOne){
								groupClassName+=" hide"
							}
							return html`
								<th class="${groupClassName}"  colspan="${columnDefinition.data.children.length}">${columnDefinition.data.parent.text}</th>
							`
						case "normal":
							let normalClassName = (this.isOne&&columnDefinition.data.isShownWhenOne)?"hide":"";
							return html`<th rowspan="2">${columnDefinition.data.text}</th>`
					}
				})}
				<th class="lt show-level-tag" rowspan="2" width="10%">
					<span class="textLevelSec">${this.isOne?"AG":"PL"}</span>User ID
				</th>
				${this.renderSwitchableTh([
					{key:"validTurnover",text:"Valid Turnover"},
					{key:"grossComm",text:"Gross Comm."}
				])}
				${this.renderSwitchableTh([
					{key:"betCountSW",text:"Valid Bet Count"},
					{key:"activePlayerSW",text:"Active Player"}
				])}
				<th data-type="member" class="ct Member" id="thMember" colspan="2">Member
				</th>
				<th data-type="downline" class="ct Agent collapse-box-line" colspan="2">
					Direct Downlines
				</th>
				<th data-type="self" data-title="selfTitle" class="ct MA" colspan="2">
					Self
					<span class="tb-mult-tag">one</span></th>
				<th data-type="company" rowspan="2" class="ct Company" style="display: none;">Company
				</th>
			</tr>
			<tr>
				<!--Member-->
				<th class="Member" data-type="member">Win/loss
				</th>
				<th class="Member" data-type="member">Comm.
				</th>

				<!--downline-->
				<th class="Agent" data-type="downline">PT Win/Loss
				</th>
				<th class="Agent" data-type="downline">Comm.
				</th>
				<!--self-->
				<th class="MA" data-type="self">PT Win/Loss
				</th>
				<th class="MA" data-type="self">Comm.
				</th>
			</tr>
			</thead>`
	}
	renderTBody(){
		return html`<tbody class="${classMap(this.getAgentOrPlayerClasses())}"><tr  class="trTitle pg-level-1" style="">
			<td class="site" style="display: none;" id="webSite"></td>
			<td class="setFlex-alignCenter">
				<a id="signplus" class="btnOpen" href="javascript:void(0)"></a>
				<a id="titleUseID" class="textBtn" >caerus</a>
			</td>
			${this.renderSwitchableTd([{
				key:"validTurnover",
				data:"44.00"
			},{
				key:"grossComm",
				data:"0.00"
			}])}
			${this.renderSwitchableTd([{
				key:"betCountSW",
				data:"8"
			},
			{
				key:"activePlayerSW",
				data:"2"
			}
			])}
			<!--Member-->
			<td data-type="member" id="userTotalPlWinloss"><span class="textRed">-22.55</span></td>
			<td data-type="member" id="userTotalPlComm">0.00</td>
			<!--downline-->
			<td data-type="downline" id="userTotaldownlineWinloss">0.00</td>
			<td data-type="downline" id="userTotaldownlineComm">0.00</td>
			<!--self-->
			<td data-type="self" id="userTotalselfWinloss">1.12</td>
			<td data-type="self" id="userTotalselfComm">0.00</td>
			<!--Company-->
			<td data-type="company" id="userTotalCompany" class="" style="display: none;">0.00</td>
		</tr>
		<tr  class="trTotal-body caerus pg-level-2" style="display: none;">
			<td class="site" style="display: none;"></td>
			<td id="gameName" class="lt">Baccarat</td>
			${this.renderSwitchableTd([{
				key:"validTurnover",
				data:"44.00"
			},{
				key:"grossComm",
				data:"0.00"
			}])}
			${this.renderSwitchableTd([{
				key:"betCountSW",
				data:"8"
			},
				{
					key:"activePlayerSW",
					data:"2"
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
		</tr><tr style="" class="trTotal pg-total">
			<td class="site" style="display: none;"></td>
			<td id="totalAndCurrency" class="align-R">Total</td>
			${this.renderSwitchableTd([{
				key:"validTurnover",
				data:"44.00"
			},{
				key:"grossComm",
				data:"0.00"
			}])}
			${this.renderSwitchableTd([{
				key:"betCountSW",
				data:"8"
			},
				{
					key:"activePlayerSW",
					data:"2"
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
		</tr></tbody>
		`;
	}

	/**
	 *
	 * @param {Record<string,number>}data
	 */
	renderColumns(data){
		return this.columns.map((column)=>{
			switch (column.type) {
				case "userId":
					return html`<th>${data[column.key]}</th>`
				case "switchable":
					let keys = column.key.split('-');
					let switchableTdDatas = keys.map(key => {
						return {
							key,
							data: data[key]
						}
					});
					return this.renderSwitchableTd(switchableTdDatas)
				case "normal":
					return html`<th>${data[column.key]}</th>`
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
	renderUserIdTh(){
		return html`<th class="lt show-level-tag" rowspan="2" width="10%">
			<span class="textLevelSec">AG</span>User ID
		</th>`
	}
	switchTh(groupKey, index) {
		let newShownIndex = index+1;
		this.switchableGroups[groupKey] = this.switchableGroups[groupKey].map((_, i) => {
			return i !== newShownIndex%this.switchableGroups[groupKey].length;
		});
		this.requestUpdate();
	}

	renderSwitchableTd(switchableTdDatas) {
		const groupKey = switchableTdDatas.map(switchableTdData => switchableTdData.key).join('-');
		return html`
			<td>
				${switchableTdDatas.map((switchableTdData,index) => {
					const classes = {
						'hide': this.switchableGroups[groupKey][index]
					}
					return html`
						<span data-type="${switchableTdData.key}" class=${classMap(classes)}>${switchableTdData.data}</span>`
				})}
			</td>
		`;
	}
	renderTFoot(){
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

	static get styles() {
		return css`
          .hide {
            display: none;
          }
		`
	}
}

window.customElements.define('win-loss-table', WinLossTable)
