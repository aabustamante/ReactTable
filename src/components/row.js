const React = require('react')

var Row = ({data, characterId, columns, onChangeCellData}) => {
    return(
        <tr>
            <td><input type="text" value={data.house} onChange={(evt) => onChangeCellData(characterId, columns.house, evt.target.value)}/></td>
            <td><input type="text" value={data.name} onChange={(evt) => onChangeCellData(characterId, columns.name, evt.target.value)}/></td>
						<td><input type="text" value={data.death} onChange={(evt) => onChangeCellData(characterId, columns.death, evt.target.value)}/></td>
        </tr>
    );
}

module.exports = Row;