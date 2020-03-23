import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addNewRoutine } from '../redux/actionCreators'
import toast from './toast'

const mapDispatchToProps = {
    addNewRoutine
}

function AddScreen({ addNewRoutine }) {
    const [radioValue, setRadioValue] = useState('1')
    const [customValue, setCustomValue] = useState('')
    const [titleValue, setTitleValue] = useState('')

    function radioButtonChange(e) {
        setRadioValue(e.target.value)
    }

    async function formSubmit(e) {
        e.preventDefault()

        const routineData = {
            title: titleValue,
            value: radioValue === 'custom' ? customValue : radioValue,
        }

        try {
            const response = await fetch('/routines/add', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(routineData)
            })
            const data = await response.json()

            if (data.message) toast(data.message.text, data.message.type)

            if (response.ok) addNewRoutine(data.routine)

            setRadioValue('1')
            setCustomValue('')
            setTitleValue('')
        } catch (err) {
            console.log(err)
            toast('Some Network Problems', 'error')            
        }
    }
    
    return (
        <form onSubmit={formSubmit} className="add-page">
            <h1 className="std-title">Add new Routine</h1>

            <hr/>
            
            <input
                type="text"
                className="add-page__input"
                placeholder="Routine title..."
                autoFocus={true}
                value={titleValue}
                onChange={e => setTitleValue(e.target.value)}
            />

            <fieldset className="add-page__fieldset">
                <legend>Repeat</legend>

                <div>
                    <input
                        type="radio"
                        name="repeat"
                        value="1"
                        id="repeat1"
                        checked={radioValue === '1'}
                        onChange={radioButtonChange}
                    />
                    <label htmlFor="repeat1">Every Day</label>
                </div>

                <div>
                    <input
                        type="radio"
                        name="repeat"
                        value="7"
                        id="repeat2"
                        checked={radioValue === '7'}
                        onChange={radioButtonChange}
                    />
                    <label htmlFor="repeat2">Every Week</label>
                </div>

                <div>
                    <input
                        type="radio"
                        name="repeat"
                        value="14"
                        id="repeat3"
                        checked={radioValue === '14'}
                        onChange={radioButtonChange}
                    />
                    <label htmlFor="repeat3">Every 2 Weeks</label>
                </div>

                <div>
                    <input
                        type="radio"
                        name="repeat"
                        value="1m"
                        id="repeat4"
                        checked={radioValue === '1m'}
                        onChange={radioButtonChange}
                    />
                    <label htmlFor="repeat4">Every Month</label>
                </div>

                <div>
                    <input
                        type="radio"
                        name="repeat"
                        value="custom"
                        id="repeat5"
                        checked={radioValue === 'custom'}
                        onChange={radioButtonChange}
                    />
                    <label htmlFor="repeat5">Custom</label>
                    {radioValue === 'custom' ? 
                        <input
                            type="text"
                            placeholder="Numbers of Day..."
                            autoFocus={true}
                            value={customValue}
                            onChange={e => setCustomValue(e.target.value)}
                        />
                        :
                        null
                    }
                    
                </div>
                        
            </fieldset>

            <button type="submit" className="std-button add-screen__submit-button">Add</button>
        </form>
    )
}

export default connect(null, mapDispatchToProps)(AddScreen)