const React = require('react')

var Cell = ({content, event}) => {
    return(
        <td>
            <input type="text" value={content} onChange={(evt) => event(evt.target.value)}/>
        </td>
    );
}

module.exports = Cell;