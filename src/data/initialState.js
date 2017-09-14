var options = require('./options')
var initialState = {
	characters:[
		{house: "-", name: "Rorge", death: "Season 4"},
		{house: "-", name: "Thoros of Myr", death: "Season 7"},
		{house: "-", name: "Poliver", death: "Season 2"},
		{house: "-", name: "Melisandre", death: "-"},
		{house: "Baratheon", name: "Joffrey", death: "Season 4"},
		{house: "Clegane", name: "Gregor \"The Mountain\" Clegane", death: "-"},
		{house: "Clegane", name: "Sandor \"The Hound\" Clegane", death: "-"},
		{house: "Dondarrion", name: "Beric Dondarrion", death: "-"},
		{house: "Frey", name: "Walder", death: "Season 7"},
		{house: "Lannister", name: "Tywin", death: "Season 4"},
		{house: "Payne", name: "Ilyn Payne", death: "-"},
    {house: "Trant", name: "Meryn Trant", death: "Season 5"}
    
	],
	config: {
		sortedBy: options.columns.house,
		order: options.order.asc,
		actualPage: 1,
		elementsPerPage: 2
	},
	filterString:""
}

module.exports = initialState