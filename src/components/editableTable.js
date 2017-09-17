var React = require('react')
var Row = require('./row')
var DefaultState = require('../data/defaultState')
const Options = require('../data/Options')
var Filter = require('./filter')


class EditableTable extends React.Component {
  constructor(props){
		super(props);
		this.state = DefaultState
		// TODO fix this state handling a possible use
		// A - Callbacks
		// B - Redux
		this.state.data = this.props.data
		
    this.state.elementCounter = DefaultState.data.length
		this.state.filteredData = this.state.data

		//TODO Why do we need to bind 'this' to these functions
		//TODO Why 'this' is undefined we dont bind 'this' here
    this.handleOnChangeCellData = this.handleOnChangeCellData.bind(this)
    this.deletedata = this.deletedata.bind(this)
    this.handleOnChangePage = this.handleOnChangePage.bind(this)
    this.filterMethod = this.filterMethod.bind(this)
    this.getFilteredTable = this.getFilteredTable.bind(this)
    this.onAddElement = this.onAddElement.bind(this)
  }

  handleOnChangeCellData(dataId, key, newValue) {
    var newData = this.state.data;
    newData.find(data => data.id == dataId)[key] = newValue;
    this.setState({data:newData});
	}

	handleOnChangePage(newSelectedPage) {
		var newConfig = this.state.config
		newConfig.actualPage = newSelectedPage
		this.setState({config: newConfig})
	}

  sortBy(valor){
		var state = this.state
		if (state.config.sortedBy == valor && state.config.order == Options.order.asc) {
			var order = -1
			state.config.order = Options.order.desc
		} else {
			var order = 1;
			state.config.order = Options.order.asc
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
    const newData = this.state.data
    var index = newData.indexOf(data);
    newData.splice(index, 1)
		this.setState({data: newData})
		this.setState({filteredData: this.getFilteredTable()})
  }

  filterMethod(value) {
    this.setState({filterString:value});
    const newConfig = this.state.config
    newConfig.actualPage = 1
		this.setState({config: newConfig});
		this.setState({filteredData: this.getFilteredTable()})
  }

  getFilteredTable() {
		const value = this.state.filterString.toLowerCase();
		return (value === "") ? this.state.data : this.state.data.filter(data => this.filterData(data, value));
	}
	
	filterData(data, value) {
		return this.props.columns.map((column) =>  (data[column]) ? data[column].toLowerCase().includes(value) : false).includes(true)
	}

  onAddElement() {
		let newIndex = this.state.elementCounter + 1;
		let newData = this.state.data;
		newData.push({id: newIndex});
		const numPages = (newData.length / this.props.elementsPerPage)

		if(numPages > Math.trunc(numPages)) {
			this.handleOnChangePage( Math.trunc(numPages) + 1)
		} else {
			this.handleOnChangePage( Math.trunc(numPages))
		}
		
    this.setState({data: newData})
    this.setState({elementCounter: newIndex})
  }

  render() {
    const data = this.state.filteredData;
		const elemPerPage = this.props.elementsPerPage
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
			<div className="editableTable">

        <div className="row">
					{/* <Filter onClick={this.onAddElement}/> */}

					<div className="col-md-6">
						<button className="btn btn-primary"  onClick={() => this.onAddElement()} data-toggle="tooltip" title="Add Row">Add row</button>
					</div>
					<div className="col-md-6">
						<div className="input-group">
							<input type="text" className="form-control" onChange={(evt) => this.setState({filterString: evt.target.value})} onKeyUp={(event) => { return (event.keyCode === 13) ? this.filterMethod(this.state.filterString):'' }}/>
							<span className="input-group-btn">
								<button className="btn btn-primary" onClick={() => this.filterMethod(this.state.filterString)}>Search</button>
							</span>
						</div>
					</div>

				</div>
        
				<div className="row">
					<table className="table table-striped">
						<thead>
							<tr>
                {this.props.columns.map((column, index) => <th key={index} onClick={() => this.sortBy(column)}>{column}</th>)}
                <th>Operations</th>
							</tr>
						</thead>
						<tbody>
						{
							visibleElements.map((data) => {
								return <Row key={data.id} data={data} dataId={data.id} columns={this.props.columns} onDeleteElement={this.deletedata} onChangeCellData={this.handleOnChangeCellData}/>
							})
						}
						</tbody>
					</table>
				</div>

				<div className="row">
					<div className="btn-group" role="group">
						{
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
