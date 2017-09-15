var React = require('react')
var Row = require('./row')
var DefaultState = require('../data/defaultState')
const options = require('../data/options')
var Filter = require('./filter')


class EditableTable extends React.Component {
  constructor(props){
    super(props);
    const {data, elementsPerPage} = this.props
    DefaultState.elementCounter = data.length
    DefaultState.data = data
    DefaultState.config.elementsPerPage = elementsPerPage

    options.columns = this.props.columns

    this.state = DefaultState

    this.handleOnChangeCellData = this.handleOnChangeCellData.bind(this)
    this.deletedata = this.deletedata.bind(this)
    this.handleOnChangePage = this.handleOnChangePage.bind(this)
    this.filterMethod = this.filterMethod.bind(this);
    this.getFilteredTable = this.getFilteredTable.bind(this);
    this.onAddElement = this.onAddElement.bind(this);
  }

  handleOnChangeCellData(dataId, key, newValue) {
    var newdata = this.state.data;

    newdata.find(data => data.id == dataId)[key] = newValue;
    
    this.setState({data:newdata});
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

    state.data = state.data.sort((a, b) => {
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

  deletedata(data) {
    const newdata = this.state.data
    var index = newdata.indexOf(data);
    newdata.splice(index, 1)
    this.setState({data: newdata})
  }

  filterMethod(event, value) {
    event.preventDefault();
    this.setState({filterString:value});
    const newConfig = this.state.config
    newConfig.actualPage = 1
    this.setState({config: newConfig});    
  }

  getFilteredTable() {
    const value = this.state.filterString.toLowerCase();
    return (value === "") ? this.state.data : this.state.data.filter(data => data.house.toLowerCase().includes(value) || data.name.toLowerCase().includes(value) || data.death.toLowerCase().includes(value));
  }

  onAddElement() {
    debugger
    const newdata = this.state.data;
    var newConfig = this.state.config; 
    var index = this.state.elementCounter + 1; 
    newdata.push({id:index});
    newConfig.actualPage = newdata.length / this.state.config.elementsPerPage;    
    this.setState({data: newdata})
    this.setState({elementCounter: index})
    this.setState({config: newConfig})
  }

  render() {
    //TODO: make prettier
    const data = this.getFilteredTable();

		const elemPerPage = this.state.config.elementsPerPage
		const pagesNumber = data.length / elemPerPage
    const pagesList = []
    
		for (var index = 0; index < pagesNumber; index++) {
			pagesList.push(index + 1);
    }
    
    const visibleElements = []
    const posibleEndRange = this.state.config.actualPage * elemPerPage
    const endRange = posibleEndRange > data.length ? data.length : posibleEndRange;
    const startRange = posibleEndRange - elemPerPage

		for (var index = startRange; index < endRange; index++) {
			visibleElements.push(data[index])
		}
    return(
			<div style={{margin:"2em"}}>
        <span>
          <button className="btn btn-primary"  onClick={() => this.onAddElement()} data-toggle="tooltip" title="Add Row">Add row</button>
        </span>
        <span><Filter filterFunction={this.filterMethod}/></span>
        
				<div>
					<table className="table table-striped">
						<thead>
							<tr>
                {options.columns.map((column, index) => <th key={index} onClick={() => this.sortBy(column)}>{column}</th>)}
                <th>Operations</th>
							</tr>
						</thead>
						<tbody>
						{
							visibleElements.map((data) => {
								return <Row key={data.id} data={data} dataId={data.id} columns={options.columns} onDeleteElement={this.deletedata} onChangeCellData={this.handleOnChangeCellData}/>
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
