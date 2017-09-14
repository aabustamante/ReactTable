const React = require('react')
const Cell = require('./cell')

var Row = ({data,characterId,event}) => {
    return(
        <tr>
            <Cell content={data.family} event={(newValue) => event(characterId, 'family', newValue)}/>
            <Cell content={data.name} event={(newValue) => event(characterId, 'name', newValue)}/>
            <Cell content={data.death} event={(newValue) => event(characterId, 'death', newValue)}/>
        </tr>
    );
}

module.exports = Row;