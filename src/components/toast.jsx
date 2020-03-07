import React, { useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'

// basic settings
const ANIMATION_TIME = 500 // ms
const TOAST_TIME = 3500 // ms
const BETWEEN_TOASTS = 20 // px
const toastType = { // message color
    basic: 'black',
    error: '#a83232',
    warning: '#FBD626',
    success: '#48AC2D'
}

// Toast component
const Toast = React.memo(function ({ text, placeNumber, id, type, deleteToast }) {
    const divRef = useRef()
    const placeNumberRef = useRef(placeNumber)

    placeNumberRef.current = placeNumber

    // Fade in animation, set timer for Fade out animation
    useEffect(() => {
        requestAnimationFrame(() => {
            divRef.current.style.opacity = 1
        })

        setTimeout(() => {
            function onTransition() {
                divRef.current.removeEventListener('transitionend', onTransition)
                deleteToast(id)
            }
            divRef.current.addEventListener('transitionend', onTransition)

            requestAnimationFrame(() => {
                divRef.current.style.transform = `translate(-50%, ${100 * placeNumberRef.current - 100}%)`
                divRef.current.style.opacity = 0
            })
        }, TOAST_TIME)
    }, [id, deleteToast])

    // Changes the Toast place number
    useEffect(() => {
        requestAnimationFrame(() => {
            divRef.current.style.transform = `translate(-50%, calc(${100 * placeNumber}% + ${BETWEEN_TOASTS * (placeNumber + 1)}px))`
        })
    }, [placeNumber])

    return (
        <div
            ref={divRef}
            style={{
                position: 'fixed',
                top: 0,
                left: '50%',
                padding: '10px 20px',
                backgroundColor: 'white',
                border: 'solid 4px ' + toastType[type],
                boxShadow: '0 10px 10px rgba(0,0,0,.3)',
                transform: 'translate(-50%, -100%)',
                opacity: 0,
                zIndex: 999,
                transition: `all ${ANIMATION_TIME}ms ease-in-out`
            }}
        >
            {text}
        </div>
    )
})

// React container for Toast components
function ToastContainer({ toasts, deleteToast }) {
    return toasts.map((toast, i) =>
        <Toast
            key={toast.id}
            text={toast.text}
            placeNumber={i}
            id={toast.id}
            type={toast.type}
            deleteToast={deleteToast}
        />
    )
}

// container for toasts in DOM
const container = document.createElement('div')
document.body.appendChild(container)

// toasts store
let toastId = 0
let toastsArr = []

// delete Toast function (must be outside the components)
function deleteToast(id) {
    toastsArr = toastsArr.filter(toast => toast.id !== id)
    ReactDOM.render(<ToastContainer toasts={toastsArr} deleteToast={deleteToast} />, container)
}

// main function to create a toast message
export default function toast(text, type = 'basic') {
    // toast model
    const newToast = {
        text,
        id: toastId++,
        type
    } 
    toastsArr.push(newToast)

    ReactDOM.render(<ToastContainer toasts={toastsArr} deleteToast={deleteToast}/>, container)
}