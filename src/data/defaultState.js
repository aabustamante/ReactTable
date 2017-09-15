var options = require('./options')
var initialState = {
	data:[],
	config: {
		sortedBy: '',
		order: 'asc',
		actualPage: 1,
	},
	filterString:"",
	searchString:""
}

module.exports = initialState
