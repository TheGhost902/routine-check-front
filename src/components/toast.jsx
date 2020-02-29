import React, { useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'

const ANIMATION_TIME = 500 // ms
const TOAST_TIME = 5500 // ms
const BETWEEN_TOASTS = 20 // px

export function Toast({ text, placeNumber, id, deleteToast }) {
    const divRef = useRef()
    const placeNumberRef = useRef(placeNumber)

    placeNumberRef.current = placeNumber

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
                border: 'solid 3px black',
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
}

function ToastContainer({ toasts, deleteToast }) {
    return toasts.map((toast, i) =>
        <Toast
            key={toast.id}
            text={toast.text}
            placeNumber={i}
            id={toast.id}
            deleteToast={deleteToast}
        />
    )
}

// container for toasts in dom
const container = document.createElement('div')
document.body.appendChild(container)

// toasts store
let toastId = 0
let toastsArr = []

function deleteToast(id) {
    toastsArr = toastsArr.filter(toast => toast.id !== id)
    ReactDOM.render(<ToastContainer toasts={toastsArr} deleteToast={deleteToast} />, container)
}

export default function toast(text) {
    // toast model
    const newToast = {
        text,
        id: toastId++
    } 
    toastsArr.push(newToast)

    ReactDOM.render(<ToastContainer toasts={toastsArr} deleteToast={deleteToast}/>, container)
}