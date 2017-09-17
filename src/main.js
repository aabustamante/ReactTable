$ = JQuery = require('jquery')
var React = require('react')
var ReactDOM = require('react-dom')
var EditableTable = require('./components/editableTable')
var DefaultState = require('./data/defaultState')
var {Data, Columns} = require('./data/realData') //TODO change capitalize

ReactDOM.render(<EditableTable data={Data} columns={Columns} elementsPerPage='3'/>, document.getElementById('app'))
