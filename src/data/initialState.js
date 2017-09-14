var initialState = {
	characters:[
		{family:"Payne", name: "Ilyn Payne", death: "-"},
		{family:"-", name: "Melisandre", death: "-"},
		{family:"Dondarrion", name: "Beric Dondarrion", death: "-"},
		{family:"-", name: "Thoros of Myr", death: "Season 7"},
		{family:"-", name: "Poliver", death: "Season 2"},
		{family:"Baratheon", name: "Joffrey", death: "Season 4"},
		{family:"-", name: "Rorge", death: "Season 4"},
		{family:"Clegane", name: "Gregor \"The Mountain\" Clegane", death: "-"},
		{family:"Clegane", name: "Sandor \"The Hound\" Clegane", death: "-"},
		{family:"Lannister", name: "Tywin", death: "Season 4"},
		{family:"Trant", name: "Meryn Trant", death: "Season 5"},
		{family:"Frey", name: "Walder", death: "Season 7"}
	],
	config: {
		sortedBy:'family',
		order:'asc'
	}
}

module.exports = initialState