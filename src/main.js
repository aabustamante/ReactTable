$ = JQuery = require('jquery')
var React = require('react')
var ReactDOM = require('react-dom')
var EditableTable = require('./components/editableTable')
var DefaultState = require('./data/defaultState')
var Data = require('./data/realData')

ReactDOM.render(<EditableTable data={Data} elementsPerPage='5'/>, document.getElementById('app'))
