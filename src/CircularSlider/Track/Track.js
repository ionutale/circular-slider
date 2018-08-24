import React from 'react'

const Track = ({ width, color }) => {
    return (
        <div id="track"
            style={{
                width: '100%',
                height: '100%',
                border: `${width}px solid ${color}`,
                borderRadius: '100%',
                position: 'absolute',
                left:`${-width / 1.5}px`,
                top:`${-width / 1.5}px`
            }}
        />
    )
}

export default Track
