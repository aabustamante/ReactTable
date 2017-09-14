const React = require('react')

var Row = ({data, columns, onChangeCellData, onDeleteElement}) => {
    return(
        <tr>
            <td><input type="text" value={data.house} onChange={(evt) => onChangeCellData(data.id, columns.house, evt.target.value)}/></td>
            <td><input type="text" value={data.name} onChange={(evt) => onChangeCellData(data.id, columns.name, evt.target.value)}/></td>
						<td><input type="text" value={data.death} onChange={(evt) => onChangeCellData(data.id, columns.death, evt.target.value)}/></td>
            <td><button className="btn btn-danger" onClick={() => onDeleteElement(data)} data-toggle="tooltip" title="Delete character">X</button></td>
        </tr>
    );
}

module.exports = Row;