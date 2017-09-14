var React = require('react')
var Row = require('./row')
const InitialState = require('../data/initialState')
const options = require('../data/options')

class EditableTable extends React.Component {
  constructor(props){
    super(props);
    this.state = InitialState
		this.handleOnChangeCellData = this.handleOnChangeCellData.bind(this)
		this.sortByFamily = this.sortBy.bind(this, options.columns.house)
		this.sortByName = this.sortBy.bind(this, options.columns.name)
		this.sortByDeath = this.sortBy.bind(this, options.columns.death)
  }

  handleOnChangeCellData(rowindex,key, newValue) {
    var newCharacters = this.state.characters;
    newCharacters[rowindex][key] = newValue;
    this.setState({characters:newCharacters});
  }

  sortBy(valor){
		var state = this.state
		var order = 1;
		if (this.state.config.sortedBy == valor) {
			if (this.state.config.order == options.order.asc) {
				order = -1
				state.config.order = options.order.desc
			} else {
				order = 1
				state.config.order = options.order.asc
			}
		} else {
			order = 1;
			state.config.order = options.order.asc
			state.config.sortedBy = valor
		}

    state.characters = state.characters.sort((a, b) => {
      const valueA = a[valor]
      const valueB = b[valor]
      if (valueA.toLowerCase() < valueB.toLowerCase())
        return -1 * order;
      if (valueA.toLowerCase() > valueB.toLowerCase())
        return 1 * order;
      return 0;
		})
		this.setState(state)
  }

  render() {
    return(
      <table className="table">
        <thead>
          <tr>
            <th onClick={this.sortByFamily}>House</th>
            <th onClick={this.sortByName}>Name</th>
            <th onClick={this.sortByDeath}>Dies in season...</th>
          </tr>
        </thead>
        <tbody>
         {
					 this.state.characters.map((character, index) => {
						 return <Row key={index} data={character} characterId={index} columns={options.columns} onChangeCellData={this.handleOnChangeCellData}/>
					 })
				 }
        </tbody>
      </table>
    )
  }
}

module.exports = EditableTable
