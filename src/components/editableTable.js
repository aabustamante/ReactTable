var React = require('react')
var Row = require('./row')
const InitialState = require('../data/initialState')
const options = require('../data/options')
var Filter = require('./Filter')


class EditableTable extends React.Component {
  constructor(props){
    super(props);
    this.state = InitialState
    
    this.handleOnChangeCellData = this.handleOnChangeCellData.bind(this)
		this.sortByHouse = this.sortBy.bind(this, options.columns.house)
		this.sortByName = this.sortBy.bind(this, options.columns.name)
    this.sortByDeath = this.sortBy.bind(this, options.columns.death)
    this.deleteCharacter = this.deleteCharacter.bind(this)
    this.handleOnChangePage = this.handleOnChangePage.bind(this)
    this.filterMethod = this.filterMethod.bind(this);
    this.getFilteredTable = this.getFilteredTable.bind(this);
    this.onAddElement = this.onAddElement.bind(this);
  }

  handleOnChangeCellData(characterId, key, newValue) {
    debugger;
    var newCharacters = this.state.characters;

    newCharacters.find(character => character.id == characterId)[key] = newValue;
    
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

  deleteCharacter(character) {
    const newCharacters = this.state.characters
    debugger;
    var index = newCharacters.indexOf(character);
    newCharacters.splice(index, 1)
    this.setState({characters: newCharacters})
  }

  filterMethod(event, value) {
    event.preventDefault();
    this.setState({filterString:value});
    const newConfig = this.state.config
    newConfig.actualPage = 1
    this.setState({config: newConfig});    
  }

  getFilteredTable() {
    debugger;
    const value = this.state.filterString.toLowerCase();
    return (value === "") ? this.state.characters : this.state.characters.filter(character => character.house.toLowerCase().includes(value) || character.name.toLowerCase().includes(value) || character.death.toLowerCase().includes(value));
  }

  onAddElement() {
    const newCharacters = this.state.characters;
    var newConfig = this.state.config; 
    var index = this.state.elementCounter + 1; 
    newCharacters.push({id:index});
    newConfig.actualPage = newCharacters.length / this.state.config.elementsPerPage;    
    this.setState({characters: newCharacters})
    this.setState({elementCounter: index})
    this.setState({config: newConfig})
  }

  render() {
    //TODO: make prettier
    const characters = this.getFilteredTable();

		const elemPerPage = this.state.config.elementsPerPage
		const pagesNumber = characters.length / elemPerPage
    const pagesList = []
    
		for (var index = 0; index < pagesNumber; index++) {
			pagesList.push(index + 1);
    }
    
    const visibleElements = []
    const posibleEndRange = this.state.config.actualPage * elemPerPage
    const endRange = posibleEndRange > characters.length ? characters.length : posibleEndRange;
    const startRange = posibleEndRange - elemPerPage

		for (var index = startRange; index < endRange; index++) {
			visibleElements.push(characters[index])
		}
    return(
			<div style={{margin:"2em"}}>
        <span>
          <button className="btn btn-primary"  onClick={() => this.onAddElement()} data-toggle="tooltip" title="Add Row">Add Button</button>
        </span>
        <span><Filter filterFunction={this.filterMethod}/></span>
        
				<div>
					<table className="table table-striped">
						<thead>
							<tr>
								<th onClick={this.sortByHouse}>House</th>
								<th onClick={this.sortByName}>Name</th>
								<th onClick={this.sortByDeath}>Dies in season...</th>
                <th>Operations</th>
							</tr>
						</thead>
						<tbody>
						{
							visibleElements.map((character) => {
                debugger;
								return <Row key={character.id} data={character} characterId={character.id} columns={options.columns} onDeleteElement={this.deleteCharacter} onChangeCellData={this.handleOnChangeCellData}/>
							})
						}
						</tbody>
					</table>
				</div>
				<div>
					<div className="btn-group" role="group">
						{
							//TODO: verify if can be avoid value - innerHTML to avoid repetition
							pagesList.map((page) => <button key={page} 
                                              className={(page == this.state.config.actualPage) ? "btn btn-primary" : "btn btn-default"} 
                                              onClick={(evt) => {this.handleOnChangePage(evt.target.value)}} 
                                              value={page}>{page}</button>) 
						}
					</div>
				</div>
			</div>

    )
  }
}

module.exports = EditableTable
