var options = require('./options')
var initialState = {
	data:[],
	config: {
		sortedBy: '',
		order: '',
		actualPage: 1,
		elementsPerPage: 3
	},
  filterString:"",
  elementCounter:13
}

module.exports = initialState
