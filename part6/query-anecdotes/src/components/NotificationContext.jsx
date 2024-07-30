import { useReducer, createContext, useContext } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return action.message
        case "DEL":
            return ""
        default:
            return state
    }
}

const NotificationContext = createContext(undefined)

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, "")

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]} >
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const counterAndDispatch = useContext(NotificationContext)
    return counterAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const counterAndDispatch = useContext(NotificationContext)
    return counterAndDispatch[1]
}