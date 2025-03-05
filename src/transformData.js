
/**
 * @param {Object} param
 * @param {WinLossResults} param.data
 * @param {string} param.level1KeyString
 * @param {string} param.level2KeyString
 * @param {string} param.level3KeyString
 * @return {TransformedWinLossData}
 */
export function transformData({ data, level1KeyString, level2KeyString, level3KeyString }) {
	const result = [];

	const level1Data = data[level1KeyString] || [];
	const level2Data = data[level2KeyString] || [];
	const level3Data = data[level3KeyString] || [];

	// 使用 Map 结构加速查找
	const level2Map = new Map();
	const level3Map = new Map();

	// 预处理 Level 2 数据，按 "level1Key-level2Key" 组织
	for (const level2Item of level2Data) {
		const level1Key = level2Item[level1KeyString];
		const level2Key = level2Item[level2KeyString];
		const mapKey = `${level1Key}-${level2Key}`;

		if (!level2Map.has(mapKey)) {
			level2Map.set(mapKey, { key: level2Key, data: [], sum: Object.assign({},level2Item,{
				main:level2Item[level2KeyString],
				}) });
		}
	}

	// 预处理 Level 3 数据，按 "level1Key-level2Key-level3Key" 组织
	for (const level3Item of level3Data) {
		const level1Key = level3Item[level1KeyString];
		const level2Key = level3Item[level2KeyString];
		const level3Key = level3Item[level3KeyString];
		const mapKey = `${level1Key}-${level2Key}-${level3Key}`;

		if (!level3Map.has(mapKey)) {
			level3Map.set(mapKey, level3Item);
		}

		// 将 Level 3 数据归类到 Level 2 里
		const parentKey = `${level1Key}-${level2Key}`;
		if (level2Map.has(parentKey)) {
			level2Map.get(parentKey).data.push(Object.assign({},level3Item,{
				main:level3Item[level3KeyString],
			}));
		}
	}

	// 构建最终的结果
	for (const level1Item of level1Data) {
		const level1Key = level1Item[level1KeyString];
		const level1Entry = {
			key: level1Key,
			data: [],
			sum: Object.assign(level1Item,{
				main:"Total"
			})
		};

		for (const [level2Key, level2Entry] of level2Map.entries()) {
			if (level2Key.startsWith(level1Key + "-")) {
				level1Entry.data.push(level2Entry);
			}
		}

		result.push(level1Entry);
	}

	return result;
}
