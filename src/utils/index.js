import { startEndFetching, deleteRoutine } from '../redux/actionCreators'
import store from '../redux/store'
import toast from '../components/toast'

export function createFormattedDate() {
    const created = new Date()
    created.setHours(0)
    created.setMinutes(0)
    created.setSeconds(0)
    created.setMilliseconds(0)

    return created.toString()
}

export function routineHistory(routine) {
    // routine.created must be string date like 'Feb 21 2020 GMT+0300'
    // (without time or setted hours, minutes, seconds and milliseconds to 0)
    const date = new Date(routine.created)

    // function with main app logic
    // setFn/getFn - binded to 'date' methods, which are set/get part of date (.setMonth(), .setDate(), ...)
    function core(setFn, getFn, routineValue, date) {
        const today = new Date()
        const arr = []

        // every cycle, 'date' will be increased by 'routineValue'
        // and cheched is not 'date' more than 'today'.
        // if 'routine.done' array has 'date', then will be added object with 'done' field setted to true,
        // if 'routine.done' array has not 'date', then will be added object with 'done' field setted to false
        while (date.getTime() <= today.getTime()) {
            if (routine.done.find(item => new Date(item).getTime() === date.getTime())) {
                arr.push({date: date.toString(), done: true})
            } else {
                arr.push({date: date.toString(), done: false})
            }

            // increase
            setFn(getFn() + routineValue)
        }

        return arr
    }

    // '1m' is one month
    if (routine.value === '1m') {
        return core(date.setMonth.bind(date), date.getMonth.bind(date), 1, date)
    }

    const days = parseInt(routine.value)
    if (Number.isNaN(days)) throw new Error('Wrong Routine Value')

    return core(date.setDate.bind(date), date.getDate.bind(date), days, date)
}

export async function updateRoutinesData(routinesFetched) {
    store.dispatch(startEndFetching(true))

    try {
        const response = await fetch('/routines')
        const parsedResponse = await response.json()

        store.dispatch(startEndFetching(false))

        if (parsedResponse.message) {
            toast(parsedResponse.message.text, parsedResponse.message.type)
        }

        if (parsedResponse.routines) {
            routinesFetched(parsedResponse.routines)
        }
    } catch (err) {
        store.dispatch(startEndFetching(false))

        toast('Some Network problems...', 'error')
    }
}

export async function deleteRoutineFetch(id) {
    store.dispatch(startEndFetching(true))

    try {
        const response = await fetch('/routines', {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ routineId: id })
        })
        
        const data = await response.json()

        store.dispatch(startEndFetching(false))

        if (data.message) {
            toast(data.message.text, data.message.type)
        }

        if (data.routineId) {
            return data.routineId
        }

    } catch (err) {
        store.dispatch(startEndFetching(false))
        toast('Some Network problems...', 'error')
    }
}