var options = require('./options')
var initialState = {
	characters:[],
	config: {
		sortedBy: '',
		order: '',
		actualPage: 1,
		elementsPerPage: 3
	},
	filterString:""
}

module.exports = initialState
