// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    title: '',
    date: '',
    isFilteredActive: false,
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isActive: !eachAppointment.isActive}
        }
        return eachAppointment
      }),
    }))
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newComment = {
      id: uuidv4(),
      title,
      date,
      isActive: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newComment],
      title: '',
      date: '',
    }))
  }

  onFilter = () => {
    const {isFilteredActive} = this.state
    this.setState({
      isFilteredActive: !isFilteredActive,
    })
    console.log(isFilteredActive)
  }

  getStaredAppointments = () => {
    const {appointmentList, isFilteredActive} = this.state
    if (isFilteredActive) {
      return appointmentList.filter(
        eachAppointment => eachAppointment.isActive === true,
      )
    }
    return appointmentList
  }

  render() {
    const {title, date, isFilteredActive} = this.state
    const addClassName = isFilteredActive ? 'sytled-btn' : ''
    const filterAppointmentList = this.getStaredAppointments()
    return (
      <>
        <div className="bg-container">
          <div className="card-container">
            <div className="container">
              <div className="first-part">
                <h1 className="heading">Add Appointment</h1>
                <form onSubmit={this.onSubmitForm}>
                  <label htmlFor="title" className="label">
                    TITLE
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="input-title"
                    value={title}
                    onChange={this.onChangeTitle}
                  />
                  <label htmlFor="date" className="label">
                    DATE
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={date}
                    className="input-title"
                    onChange={this.onChangeDate}
                  />
                  <button type="submit" className="button">
                    Add
                  </button>
                </form>
              </div>
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                  alt=" appointments"
                  className="image"
                />
              </div>
            </div>
            <hr className="line" />
            <div className="underLine-section">
              <h1 className="sub-heading">Appointments</h1>
              <button
                type="button"
                className={`stared-btn ${addClassName}`}
                onClick={this.onFilter}
              >
                Starred
              </button>
            </div>
            <ul className="ul-Appointment">
              {filterAppointmentList.map(eachAppointment => (
                <AppointmentItem
                  appointmentDetails={eachAppointment}
                  key={eachAppointment.id}
                  toggleIsLiked={this.toggleIsLiked}
                />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }
}

export default Appointments
