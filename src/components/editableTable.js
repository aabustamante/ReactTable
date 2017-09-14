var React = require('react')
var Row = require('./Row')
var Filter = require('./Filter')

class EditableTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        characters:[
          {id:0, family:"Lannister", name: "joffrey", death: "Season 4"},
          {id:1, family:"Lannister", name: "Cersei", death: "-"},
          {id:2, family:"clagein", name: "mountain", death: "Season 4"}
        ],
        filter:""
    }
    this.onChangeCell = this.onChangeCell.bind(this);
    this.filterMethod = this.filterMethod.bind(this);
    
  }

  onChangeCell(rowindex,key, newValue) {
    console.log(this);
    var newCharacters = this.state.characters;
    newCharacters[rowindex][key] = newValue;
    this.setState({characters:newCharacters});
  }

  filterMethod(event, value) {
    debugger;
    event.preventDefault();
    var newCharacters = this.state.characters.filter(character => character.family == value || character.name == value || character.death == value);
    this.setState({characters:newCharacters});
  }

  render() {
    return(
      <div>
        <Filter filterFunction={this.filterMethod}/>
        <table className="table">
          <thead>
            <tr>
              <th>family</th>
              <th>name</th>
              <th>date of death</th>
            </tr>
          </thead>
          <tbody>
            {this.state.characters.map(character => <Row data={character} characterId={character.id} event={this.onChangeCell}/>)}
          {/* <Row data={this.state.characters[0]} characterId={0} event={this.onChangeCell}/>
          <Row data={this.state.characters[1]} characterId={1} event={this.onChangeCell}/> 
          <Row data={this.state.characters[2]} characterId={2} event={this.onChangeCell}/>           */}
          </tbody>
        </table>
      </div>
    )
  }
}

module.exports = EditableTable
