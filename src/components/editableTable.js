var React = require('react')
var Row = require('./Row')

class EditableTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        characters:[
          {family:"Lannister", name: "joffrey", death: "Season 4"},
          {family:"Lannister", name: "Cersei", death: "-"},
          {family:"clagein", name: "mountain", death: "Season 5"}
        ]
    }
    this.onChangeCell = this.onChangeCell.bind(this);
  }

  onChangeCell(rowindex,key, newValue) {
    console.log(this);
    var newCharacters = this.state.characters;
    newCharacters[rowindex][key] = newValue;
    this.setState({characters:newCharacters});
  }

  render() {
    return(
      <table className="table">
        <thead>
          <tr>
            <th>family</th>
            <th>name</th>
            <th>date of death</th>
          </tr>
        </thead>
        <tbody>
         <Row data={this.state.characters[0]} characterId={0} event={this.onChangeCell}/>
         <Row data={this.state.characters[1]} characterId={1} event={this.onChangeCell}/> 
         <Row data={this.state.characters[2]} characterId={2} event={this.onChangeCell}/>          
        </tbody>
      </table>
    )
  }
}

module.exports = EditableTable