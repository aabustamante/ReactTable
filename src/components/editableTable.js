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
    this.deleteCharacter = this.deleteCharacter.bind(this)
    this.handleOnChangePage = this.handleOnChangePage.bind(this)
  }

  handleOnChangeCellData(rowindex,key, newValue) {
    var newCharacters = this.state.characters;
    newCharacters[rowindex][key] = newValue;
    this.setState({characters:newCharacters});
	}

	handleOnChangePage(newSelectedPage) {
		var newConfig = this.state.config
		newConfig.actualPage = newSelectedPage
		this.setState({config: newConfig})
	}

  sortBy(valor){
		var state = this.state
		if (state.config.sortedBy == valor && state.config.order == options.order.asc) {
			var order = -1
			state.config.order = options.order.desc
		} else {
			var order = 1;
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

  deleteCharacter(characterId) {
    const newCharacters = this.state.characters
    newCharacters.splice(characterId, characterId + 1)
    this.setState({characters: newCharacters})
  }

  render() {
    //TODO: make prettier
    const characters = this.state.characters

		const elemPerPage = this.state.config.elementsPerPage
		const pagesNumber = characters.length / elemPerPage
    const pagesList = []
    
		for (var index = 0; index < pagesNumber; index++) {
			pagesList.push(index + 1);
    }
    
    const visibleElements = []
    const posibleEndRange = this.state.config.actualPage * elemPerPage
    const endRange = posibleEndRange > characters.length ? characters.length : this.state.config.actualPage * elemPerPage;
    const startRange = (this.state.config.actualPage * elemPerPage) - elemPerPage

		for (var index = startRange; index < endRange; index++) {
			visibleElements.push(characters[index])
		}
    return(
			<div>
				<div>
					<table className="table table-striped">
						<thead>
							<tr>
								<th onClick={this.sortByFamily}>House</th>
								<th onClick={this.sortByName}>Name</th>
								<th onClick={this.sortByDeath}>Dies in season...</th>
                <th>Operations</th>
							</tr>
						</thead>
						<tbody>
						{
							visibleElements.map((character, index) => {
								return <Row key={index} data={character} characterId={index} columns={options.columns} onDeleteElement={this.deleteCharacter} onChangeCellData={this.handleOnChangeCellData}/>
							})
						}
						</tbody>
					</table>
				</div>
				<div>
					<div className="btn-group" role="group">
						{
							//TODO: verify if can be avoid value - innerHTML to avoid repetition
							pagesList.map((page) => <button key={page} onClick={(evt) => {this.handleOnChangePage(evt.target.value)}} className="btn btn-default" value={page}>{page}</button>) 
						}
					</div>
				</div>
			</div>
    )
  }
}

module.exports = EditableTable
