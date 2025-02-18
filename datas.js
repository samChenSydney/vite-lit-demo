isOne:true,
columns:[{
	type:"userId",
	data:{
		text:"User Id",
		key:"userId"
	}
},{
	type:"switchable",
	data:[{
		key:"validTurnover",
		text:"Valid Turnover"
	},{
		key:"grossComm",
		text:"Gross Comm."
	}
	]
},
{
	type:"switchable",
	data:[{
		key:"activePlayer",
		text:"Active Player"
	},{
		key:"validBetCount",
		text:"Valid Bet Count"
	}
	]
},
{
	type:"group",
	data:{
		parent:{
			text:"Member",
			classes:"ct Member"
		},
		children:[{
			key:"memberWinLoss",
			text:"Win/loss"
		},{
			key:"memberComm",
			text:"Comm."
		}]
	}
},
{
	type:"group",
	data:{
		parent:{
			text:"Direct Downlines",
			classes:"ct Agent collapse-box-line",
			isShownWhenOne:true
		},
		children:[{
			key:"directDownLineWinLoss",
			text:"PT Win/Loss"
		},{
			key:"directDownLineComm",
			text:"Comm."
		}]
	}
},
{
	type:"group",
	data:{
		parent:{
			text:"Self",
			classes:"ct Agent collapse-box-line",
		},
		children:[{
			key:"selfWinLoss",
			text:"PT Win/Loss"
		},{
			key:"selfComm",
			text:"Comm."
		}]
	}
},
]