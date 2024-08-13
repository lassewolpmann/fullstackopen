interface Props {
  notification: string | null,
  status: string | null
}

const Notification = (props: Props) => {
  const { notification, status } = props;

  const style = {
    background: status === 'error' ? 'rgba(255,0,0,0.5)' : 'rgba(0,255,0,0.5)',
    padding: '10px',
    margin: '10px 0',
    border: 'none',
    borderRadius: '10px',
    fontWeight: 'bold'
  };

  if (notification && status) {
    return (
      <div style={style}>{notification}</div>
    );
  } else {
    return null;
  }
};

export default Notification;