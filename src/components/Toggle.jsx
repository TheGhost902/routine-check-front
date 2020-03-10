import React from 'react'

function Toggle({ toggleFn = () => {}, active = false, preLabel = '', postLabel = ''}) {
    function changeActive() {
        toggleFn()
    }

    return (
        <div
            type="button"
            className="toggle"
        >
            <p className="toggle__label">
                {preLabel}
            </p>

            <button
                type="button"
                className="toggle__button"
                onClick={changeActive}
            >
                <div className="toggle__rail">
                    <div className={`toggle__switch ${active ? 'toggle__switch_active' : ''}`}></div>
                </div>
            </button>

            <p className="toggle__label">
                {postLabel}
            </p>
        </div>
    )
}

export default Toggle