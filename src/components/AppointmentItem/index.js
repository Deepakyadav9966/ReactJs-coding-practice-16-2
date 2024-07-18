// Write your code here
import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsLiked} = props
  const {id, title, date, isActive} = appointmentDetails
  const starImage = isActive
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const onChangeStar = () => {
    toggleIsLiked(id)
  }
  const appointmentDate = date
    ? format(new Date(date), 'dd MMMM yyyy, EEEE')
    : ''
  return (
    <li className="AppointmentItem">
      <div className="appointment-heading">
        <p className="title">{title}</p>
        <button
          type="button"
          onClick={onChangeStar}
          className="star-btn"
          data-testid="star"
        >
          <img src={starImage} className="starImage" alt="star" />
        </button>
      </div>
      <p className="date">Date: {appointmentDate}</p>
    </li>
  )
}

export default AppointmentItem
