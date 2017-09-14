const React = require('react')

class Filter extends React.Component{

    constructor(props){
        super(props);
        this.props = props;
    }

    render(){
        return (
            <form style={{display:'inline'}} className="pull-right" onSubmit={(event) => this.props.filterFunction(event,this.searchString.value)}>
                <input type="text" ref={(input) => this.searchString = input}/>
                <button className="btn btn-primary" type="submit">Search</button>
            </form>
        );
    }
}

module.exports = Filter;