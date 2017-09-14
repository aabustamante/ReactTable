const React = require('react')

class Filter extends React.Component{

    constructor(props){
        super(props);
        this.props = props;
    }

    render(){
        return (
            <form onSubmit={(event) => this.props.filterFunction(event,this.searchString.value)}>
                <input type="text" ref={(input) => this.searchString = input}/>
                <button type="submit">Search</button>
            </form>
        );
    }
}

module.exports = Filter;