package dummies

// Data for test only
const Data = `const mapData = {
	map: {width: 100, height: 100}, 
	npc: {
		cities: [
			{
				id: 1,
				name: 'city1',
				nodes: [{x:1, y:1}, {x:1, y:2}, {x:2, y:1}, {x:2, y:2}, {x:2, y:3}, {x:1, y:3}, {x:1, y:4}, {x:2, y:4}, {x:3, y:1}, {x:3, y:2}]
			},
			{
				id: 2,
				name: 'city2',
				nodes: [{x:3, y:3}, {x:3, y:4}, {x:4, y:3}, {x:4, y:4}, {x:4, y:5}, {x:3, y:5}, {x:3, y:6}, {x:4, y:6}, {x:5, y:3}, {x:5, y:4}]
			},
		],
		villages: [
			{
				id: 1,
				name: 'village1',
				nodes: [{x:4, y:7}, {x:4, y:8}, {x:5, y:7}, {x:5, y:8}, {x:6, y:7}, {x:6, y:8}]
			},
			{
				id: 2,
				name: 'city2',
				nodes: [{x:9, y:9}, {x:9, y:10}, {x:10, y:9}]
			}
		]
	},
	resources: [
		{id:0, name: 'wood', pos: {x:1, y:1}, amount: 90},
		{id:1, name: 'wood', pos: {x:3, y:3}, amount: 91},
		{id:2, name: 'wood', pos: {x:4, y:8}, amount: 92},
		{id:3, name: 'iron', pos: {x:9, y:10}, amount: 93},
		{id:4, name: 'iron', pos: {x:19, y:9}, amount: 94}
	]
}`
