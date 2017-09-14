const React = require('react')

var Row = ({data, characterId, event}) => {
    return(
        <tr>
            <td><input type="text" value={data.family} onChange={(evt) => event(characterId, 'family', evt.target.value)}/></td>
            <td><input type="text" value={data.name} onChange={(evt) => event(characterId, 'name', evt.target.value)}/></td>
						<td><input type="text" value={data.death} onChange={(evt) => event(characterId, 'death', evt.target.value)}/></td>
        </tr>
    );
}

module.exports = Row;