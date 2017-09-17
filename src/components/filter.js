const React = require('react')

const Filter = ({onChangeFilterInput, filterMethod}) => {
	return(
		<div className="col-md-6">
			<div className="input-group">
				<input type="text" className="form-control" onChange={(evt) => onChangeFilterInput(evt.target.value)} onKeyUp={(event) => { return (event.keyCode === 13) ? filterMethod():'' }}/>
				<span className="input-group-btn">
					<button className="btn btn-primary" onClick={() => filterMethod()}>Search</button>
				</span>
			</div>
		</div>
	);
}

module.exports = Filter;