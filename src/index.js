import './win-loss-table.js';
import '/data.js';
import {transformData} from "./transformData.js";
import './search-bar.js'

console.log(window.demoData)
const level1KeyString = "currency";
const level2KeyString = "tableCountry";
const level3KeyString = "tableId";
console.log(transformData({
	data: window.demoData.winLossResults,
	level1KeyString,
	level2KeyString,
	level3KeyString
}))
let winLossTable = document.querySelector('win-loss-table');
winLossTable.columns = [{
	"type": "main",
	"data": {"text": `${level2KeyString}/${level3KeyString}`, "key": "main"}
}, {
	"type": "normal",
	"data": {"key": "turnover", "text": "Valid Turnover"}
}, {
	"type": "switchable",
	"data": [{"key": "activePlayer", "text": "Active Player"}, {
		"key": "betCount",
		"text": "Valid Bet Count"
	}]
},
	{
	"type": "group",
	"data": {
		"parent": {"text": "Member", "className": "ct Member"},
		"children": [{
			"key": "playerWinLoss",
			"text": "Win/loss",
			"className": "Member"
		}]
	}
},
	{
	"type": "group",
	"data": {
		"parent": {"text": "Direct Downlines", "className": "ct Agent collapse-box-line"},
		"children": [{
			"key": "shWinLoss",
			"text": "PT Win/Loss",
			"className": "Agent"
		}]
	}
}, {
	"type": "group",
	"data": {
		"parent": {"text": "Self", "className": "MA"},
		"children": [{"key": "oneWinLoss", "text": "PT Win/Loss", "className": "MA"}]
	}
}
// , {
// 	"type": "normal",
// 	"data": { "text": "Company", "key": "company", "className": "ct Company"}
// }
];
winLossTable.data = transformData({
	data: window.demoData.winLossResults,
	level1KeyString: "currency",
	level2KeyString: "tableCountry",
	level3KeyString: "tableId"
})
const searchBar = document.querySelector("search-bar");

// **动态传入查询项**
searchBar.filters = [
	{
		id: "searchId",
		type: "input",
		placeholder: "User ID"
	},
	{
		id: "isInternal",
		type: "select",
		options: [
			{ value: "-1", label: "ALL" },
			{ value: "1", label: "Internal" },
			{ value: "0", label: "Not Internal", selected: true }
		]
	},
	{
		id: "hoursSetting",
		type: "select",
		options: [
			{ value: "12:00:00", label: "12:00:00 - 12:00:00", selected: true },
			{ value: "08:00:00", label: "08:00:00 - 08:00:00" },
			{ value: "00:00:00", label: "00:00:00 - 00:00:00" }
		]
	},
	{
		id: "currencies",
		type: "checkboxGroup",
		label: "Currency",
		icon: "icon-currency",
		options: [
			{ value: "USD", label: "USD" },
			{ value: "EUR", label: "EUR" },
			{ value: "CNY", label: "CNY" }
		]
	},
	{
		id: "websites",
		type: "checkboxGroup",
		label: "Website",
		icon: "icon-website",
		options: [
			{ value: "Google", label: "Google" },
			{ value: "Bing", label: "Bing" },
			{ value: "Yahoo", label: "Yahoo" }
		]
	}
];

// **监听 search 事件**
searchBar.addEventListener("search", (e) => {
	console.log("搜索参数：", e.detail);
});
