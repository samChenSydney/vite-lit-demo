v = {
	isOne: true,
	searchAccount: "agent",
	columnDefinitions: [{
		type: "userId",
		data: {
			text: "User Id",
			key: "userId"
		}
	}, {
		type: "switchable",
		data: [{
			key: "validTurnover",
			text: "Valid Turnover"
		}, {
			key: "grossComm",
			text: "Gross Comm."
		}
		]
	},
		{
			type: "switchable",
			data: [{
				key: "activePlayer",
				text: "Active Player"
			}, {
				key: "validBetCount",
				text: "Valid Bet Count"
			}
			]
		},
		{
			type: "group",
			data: {
				parent: {
					text: "Member",
					className: "ct Member"
				},
				children: [{
					key: "memberWinLoss",
					text: "Win/loss",
					className: "Member"
				}, {
					key: "memberComm",
					text: "Comm.",
					className: "Member"
				}]
			}
		},
		{
			type: "group",
			data: {
				showMode: "ONLY_ONE",
				parent: {
					text: "Direct Downlines",
					className: "ct Agent collapse-box-line",
				},
				children: [{
					key: "directDownLineWinLoss",
					text: "PT Win/Loss",
					className: "Agent"
				}, {
					key: "directDownLineComm",
					text: "Comm.",
					className: "Agent"
				}]
			}
		},
		{
			type: "group",
			data: {
				parent: {
					text: "Self",
					className: "MA",
				},
				children: [{
					key: "selfWinLoss",
					text: "PT Win/Loss",
					className: "MA"
				}, {
					key: "selfComm",
					text: "Comm.",
					className: "MA"
				}]
			}
		},
		{
			type: "normal",
			data: {
				showMode: "ONLY_NOT_ONE",
				text: "Company",
				key: "company",
				className: "ct Company"
			}
		},
	]
}
