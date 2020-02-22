import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = ({ fetching }) => ({ fetching })

function LoadingWheel({ fetching }) {
    return (
        <div
            style={{
                width: 100,
                height: 35,
                fontSize: 20,
                position: 'fixed',
                display: fetching? 'flex' : 'none',
                backgroundColor: 'black',
                color: 'white',
                right: 10,
                top: 10,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            Loading...
        </div>
    )
}

export default connect(mapStateToProps, null)(LoadingWheel)