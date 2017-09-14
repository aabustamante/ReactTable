var options = require('./options')
var initialState = {
	characters:[
		{id:1, house: "-", name: "Rorge", death: "Season 4"},
		{id:2, house: "-", name: "Thoros of Myr", death: "Season 7"},
		{id:3, house: "-", name: "Poliver", death: "Season 2"},
		{id:4, house: "-", name: "Melisandre", death: "-"},
		{id:5, house: "Baratheon", name: "Joffrey", death: "Season 4"},
		{id:6, house: "Clegane", name: "Gregor \"The Mountain\" Clegane", death: "-"},
		{id:7, house: "Clegane", name: "Sandor \"The Hound\" Clegane", death: "-"},
		{id:8, house: "Dondarrion", name: "Beric Dondarrion", death: "-"},
		{id:9, house: "Frey", name: "Walder", death: "Season 7"},
		{id:10, house: "Lannister", name: "Tywin", death: "Season 4"},
		{id:11, house: "Payne", name: "Ilyn Payne", death: "-"},
    	{id:12, house: "Trant", name: "Meryn Trant", death: "Season 5"}
	],
	config: {
		sortedBy: options.columns.house,
		order: options.order.asc,
		actualPage: 1,
		elementsPerPage: 3
	},
	filterString:""
}

module.exports = initialState