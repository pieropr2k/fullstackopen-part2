import '../App.css';

const Notification = ({ message, isError }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={'error '+ (isError ? 'redAlert' : 'greenAlert')}>
        {message}
      </div>
    )
}
export default Notification;