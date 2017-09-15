const React = require('react')

var Row = ({data, columns, onChangeCellData, onDeleteElement}) => {
    return(
        <tr>
          {
            columns.map((column, index) => <td><input key={index} type="text" value={data[column]} onChange={(evt) => onChangeCellData(data.id, column, evt.target.value)}/></td>)
          }
            <td><button className="btn btn-danger" onClick={() => onDeleteElement(data)} data-toggle="tooltip" title="Delete element">X</button></td>
        </tr>
    );
}

module.exports = Row;