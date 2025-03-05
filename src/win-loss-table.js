import {html, LitElement} from 'lit'
import {styleMap} from 'lit/directives/style-map.js';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class WinLossTable extends LitElement {
	static get properties() {
		return {
			columns: {state: true},
			data: {state: true},
			switchableGroups: {state: true},
			isExpandAll: {state: true},
			expandedState: {state: true},
		}
	}

	createRenderRoot() {
		return this;
	}

	constructor() {
		super()
		/**
		 * @type {TableColumnDefinition[]}
		 */
		this.columns = [];
		this.expandAllText = "Expand All";
		this.hideAllText = "Hide All";
		/**
		 *
		 * @type {Map<string, boolean[]>}
		 */
		this.switchableGroups = new Map();
		/**
		 *
		 * @type {TransformedWinLossData}
		 */
		this.data = [];
		this.isExpandAll = false;
		this.expandedState = new Map();
	}

	willUpdate(_changedProperties) {
		super.willUpdate(_changedProperties);
		if (_changedProperties.has("columns")) {
			let switchableColumns = this.columns.filter(columnDefinition => columnDefinition.type === "switchable");
			switchableColumns.forEach(switchableColumn => {
				let groupKey = switchableColumn.data.map(switchableThData => switchableThData.key).join('-');
				if (!this.switchableGroups.has(groupKey)) {
					this.switchableGroups.set(groupKey, switchableColumn.data.map((_, index) => {
						return index !== 0;
					}));
				}
			});
		}
	}

	render() {
		return html`
			<table id="newContent" class="tb-mult tb-report">
				${this.data.map((item, level1Index) => {
					return html`
						<tr>
							${this.renderSection(item, level1Index)}
						</tr>
					`
				})}
			</table>
		`
	}

	/**
	 *
	 * @param {Level1Data} level1Data
	 * @param {number} level1Index
	 */
	renderSection(level1Data, level1Index) {
		return html`
			${this.renderThead1(level1Data.key)}
			${this.renderThead2()}
			${level1Data.data.length > 0 ? this.renderTBody(level1Data, level1Index) : this.renderNoData()}
			${this.renderTFoot(level1Data)}
		`
	}

	renderNoData() {
		return html`
			<tbody id="nodataBody">
			<tr>
				<td colspan="20" class="nodata-td">
					<div class="nodata-box">
						no data found
					</div>
				</td>
			</tr>
			</tbody>
		`
	}

	renderThead1(level1Key) {
		return html`
			<thead class="bg-none">
			<tr class="tb-mult-topbar">
				<th colspan="16" class="lt">
					<div class="tit" id="title">${level1Key}</div>
					<a class="btnCMain-S" href="javascript:void(0)"
						@click="${() => this.toggleAll()}">${this.isExpandAll ? this.hideAllText : this.expandAllText}
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
			<thead>
			<tr>
				${this.columns.map((columnDefinition) => {
					switch (columnDefinition.type) {
						case "main":
							return html`
								<th class="lt show-level-tag" rowspan="2" width="10%">
									${columnDefinition.data.text}
								</th>`
						case "switchable":
							return this.renderSwitchableTh(columnDefinition.data)
						case "group":
							let groupClassName = columnDefinition.data.parent.className;
							return html`
								<th class="${groupClassName}"
									colspan="${columnDefinition.data.children.length}">
									${columnDefinition.data.parent.text}
								</th>
							`
						case "normal":
							return html`
								<th rowspan="2" class="${columnDefinition.data.className}">
									${columnDefinition.data.text}
								</th>`
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

	/**
	 *
	 * @param {Level1Data} level1Data
	 * @param {number} level1Index
	 */
	renderTBody(level1Data, level1Index) {
		return html`
			<tbody>
			${level1Data.data.map((level2Data, level2Index) => {
				let rowKey = `${level1Index}-${level2Index}`;
				if (!this.expandedState.has(rowKey)) {
					this.expandedState.set(rowKey, false);
				}
				return html`
					<tr class="trTitle">
						${this.renderDataColumns(level2Data.sum, rowKey)}
					</tr>
					${level2Data.data.map((level3Data) => {
						let styles = {
							...(!this.expandedState.get(rowKey) && {
								'display': 'none'
							})
						}
						return html`
							<tr class="trTotal-body" style=${styleMap(styles)}>
								${this.renderDataColumns(level3Data)}
							</tr>`
					})}
				`
			})}
			<tr class="trTotal">
				${this.renderDataColumns(level1Data.sum)}
			</tr>
			</tbody>
		`;
	}


	/**
	 *
	 * @param {WinLossEntry}data
	 * @param {string?} rowKey
	 */
	renderDataColumns(data, rowKey) {
		return this.columns.map((column) => {
			switch (column.type) {
				case "main":
					let isExpanded = this.expandedState.get(rowKey);
					return html`
						<td class="setFlex-alignCenter">
							<a id="signplus" class="${isExpanded ? "btnClose" : "btnOpen"}"
								@click="${() => this.toggleRow(rowKey)}" href="javascript:void(0)"></a>
							<span>${data[column.data.key]}</span>
						</td>`
				case "switchable":
					return this.renderSwitchableTd(column.data, data)
				case "group":
					return html`
						${column.data.children.map(child => {
							return html`
								<td class="${child.className}">${data[child.key]}</td>`
						})}`
				case "normal":
					return html`
						<td>${data[column.data.key]}</td>`
			}
		})
	}

	renderSwitchableTh(switchableThDatas) {
		let groupKey = switchableThDatas.map(switchableThData => switchableThData.key).join('-');
		return html`
			<th rowspan=${switchableThDatas.length}>
				${switchableThDatas.map(((switchableThData, index) => {
					let styles = {
						...(this.switchableGroups.get(groupKey)[index] && {
							'display': 'none'
						})
					}
					return html`
						<a data-type="${switchableThData.key}" class='btn-txt-switch'
							style=${styleMap(styles)}
							@click="${() => this.switchTh(groupKey, index)}"
							href="javascript:void(0);">${switchableThData.text}</a>`
				}))}
			</th>
		`;
	}

	switchTh(groupKey, index) {
		let newShownIndex = index + 1;
		this.switchableGroups.set(groupKey, this.switchableGroups.get(groupKey).map((_, i) => {
			return i !== newShownIndex % this.switchableGroups.get(groupKey).length;
		}));
		this.requestUpdate();
	}

	renderSwitchableTd(switchableTdDatas, level3Data) {
		const groupKey = switchableTdDatas.map(switchableTdData => switchableTdData.key).join('-');
		return html`
			<td>
				${switchableTdDatas.map((switchableTdData, index) => {
					let styles = {
						...(this.switchableGroups.get(groupKey)[index] && {
							'display': 'none'
						})
					}
					return html`
						<span data-type="${switchableTdData.key}"
							style=${styleMap(styles)}>${level3Data[switchableTdData.key]}</span>`
				})}
			</td>
		`;
	}

	/**
	 *
	 * @param {Level1Data}level1Data
	 */
	renderTFoot(level1Data) {
		return html`
			<thead class="style-empty">
			<tr>
				<td colspan="${level1Data.sum.length}"></td>

			</tr>
			</thead>`
	}

	toggleRow(rowKey) {
		this.expandedState.set(rowKey, !this.expandedState.get(rowKey));
		this.requestUpdate()
	}

	toggleAll() {
		this.isExpandAll = !this.isExpandAll;
		this.expandedState.forEach((value, key) => {
			this.expandedState.set(key, this.isExpandAll);
		});
		this.requestUpdate()
	}
}

window.customElements.define('win-loss-table', WinLossTable)
