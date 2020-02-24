import React, { useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'

const ANIMATION_TIME = 500 // ms
const TOAST_TIME = 2500 // ms
const BETWEEN_TOASTS = 20 // px

export function Toast({ text, number, show }) {
    const divRef = useRef()

    // Fade in animation
    useEffect(() => {
        divRef.current.style.transform = `translateY(calc(${100 * number}% + ${BETWEEN_TOASTS * (number + 1)}px))`
        divRef.current.style.opacity = 1
        divRef.current.style.left = `${document.documentElement.clientWidth/2 - divRef.current.offsetWidth/2}px`
    }, [number])

    // Fade out animation
    useEffect(() => {
        if (!show) {
            divRef.current.style.transform = `translateY(${100 * number - 100}%)`
            divRef.current.style.opacity = 0
        }
    }, [show, number])

    return (
        <div
            ref={divRef}
            style={{
                position: 'fixed',
                top: 0,
                // right: 20,
                padding: '10px 20px',
                backgroundColor: 'white',
                border: 'solid 3px black',
                boxShadow: '0 10px 10px rgba(0,0,0,.3)',
                transform: 'translateY(-100%)',
                opacity: 0,
                zIndex: 999,
                transition: `all ${ANIMATION_TIME/1000}s ease-in-out`
            }}
        >
            {text}
        </div>
    )
}

function ToastContainer({ toasts }) {
    return (
        <>
            {toasts.map((toast, i) => <Toast key={toast.id} text={toast.text} number={i} show={toast.show}/>)}
        </>
    )
}

// container for toasts in doom
const container = document.createElement('div')
document.body.appendChild(container)

// toasts store
let toastsArr = []

export default function toast(text) {
    // toast model
    const newToast = {
        text,
        id: Math.trunc(Date.now() * Math.random()),
        show: true
    } 
    toastsArr.push(newToast)

    ReactDOM.render(<ToastContainer toasts={toastsArr}/>, container)

    // first timeout for signal to Toast Fade out animation
    setTimeout(() => {
        toastsArr = toastsArr.map(toast => {
            if (toast.id === newToast.id) {
                toast.show = false
                return toast
            }
            return toast
        })
        ReactDOM.render(<ToastContainer toasts={toastsArr}/>, container)

        // second timeout for deleting Toast after Fade out animation
        setTimeout(() => {
            toastsArr = toastsArr.filter(toast => toast.show)
            ReactDOM.render(<ToastContainer toasts={toastsArr}/>, container)
        }, ANIMATION_TIME)
    }, TOAST_TIME + ANIMATION_TIME)
}