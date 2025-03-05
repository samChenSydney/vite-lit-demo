import './win-loss-table.js';
import '/data.js';
import {transformData} from "./transformData.js";
import './search-bar.js'
import './casino-date-picker.js'
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
