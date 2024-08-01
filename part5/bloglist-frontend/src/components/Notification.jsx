import { useSelector } from "react-redux"
import { styled } from "styled-components";

const NotificationDiv = styled.div`
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px 0;
    font-weight: bold;
    border-radius: 10px;
    box-shadow: #dedede 0 0 10px 1px;
    
    &.success {
        background: rgba(0, 255, 0, 0.5);
    }
    
    &.error {
        background: rgba(255, 0, 0, 0.5);
    }
`

const Notification = ({ message, className }) => {
  const notification = useSelector((state) => state.notification)

  if (notification === null) {
    return null;
  }

  return <NotificationDiv className={notification.status}>{notification.message}</NotificationDiv>;
};

export default Notification;
