import React, { Component } from 'react';
import {Link} from 'react-router';
import moment from 'moment';

const Ndays = 10

// TODO: Oct 11 to March!!

// Schedule in Effect: June 21, 2016 to September 5, 2016 

let MTh_van2nb_1 = [
  ["7:25 AM", "8:10 AM", "8:55 AM"],
  ["9:40 AM", "10:25 AM", "10:35 AM"],
  ["2:15 PM", "3:15 PM", "3:25 PM"],
  ["3:45 PM", "4:55 PM", "5:05 PM"],
  ["4:30 PM", "5:15 PM", "5:25 PM"],
  ["5:50 PM", "6:40 PM", "6:50 PM"] // except sept 4 XXX
]
let TuWed_van2nb_1 = [
  ["7:25 AM", "8:10 AM", "8:55 AM"],
  ["9:40 AM", "10:25 AM", "10:35 AM"],
  ["2:15 PM", "3:15 PM", "3:25 PM"],
  ["3:45 PM", "4:55 PM", "5:05 PM"],
  ["5:50 PM", "6:40 PM", "6:50 PM"]
]
let Fri_van2nb_1 = [
  ["7:25 AM", "8:10 AM", "8:55 AM"],
  ["9:40 AM", "10:25 AM", "10:35 AM"],
  ["11:10 AM", "11:50 AM", "12:00 PM"],
  ["2:15 PM", "3:15 PM", "3:25 PM"],
  ["3:45 PM", "4:55 PM", "5:05 PM"],
  ["5:50 PM", "6:40 PM", "6:50 PM"]
] 
let Sat_van2nb_1 = [
  ["7:25 AM", "8:10 AM", "8:55 AM"],
  ["9:00 AM", "10:00 AM", "10:10 AM"],
  ["9:40 AM", "10:25 AM", "10:35 AM"],
  ["11:10 AM", "11:50 AM", "12:00 PM"],
  ["2:15 PM", "3:15 PM", "3:25 PM"],
  ["4:30 PM", "5:15 PM", "5:25 PM"],
  ["6:35 PM", "7:20 PM", "7:30 PM"]
] 
let Sun_van2nb_1 = [
  ["7:25 AM", "8:10 AM", "8:55 AM"],
  ["9:00 AM", "10:00 AM", "10:10 AM"],
  ["9:40 AM", "10:25 AM", "10:35 AM"],
  ["11:10 AM", "11:50 AM", "12:00 PM"],
  ["2:15 PM", "3:40 PM", "3:50 PM"],
  ["3:45 PM", "4:55 PM", "5:05 PM"],
  ["4:30 PM", "5:15 PM", "5:25 PM"],
  ["5:50 PM", "6:40 PM", "6:50 PM"]
] 
let MTuWeTh_van2nb_2 = [

]
let Fri_van2nb_2 = [

] 
let Sat_van2nb_2 = [
  
] 
let Sun_van2nb_2 = [

] 

let MTh_nb2van_1 = [
  ["7:45 AM", "7:55 AM", "8:30 AM"],
  ["10:10 AM", "10:20 AM", "10:50 AM"],
  ["12:00 PM", "12:10 PM", "12:30 PM"],
  ["3:25 PM", "3:35 PM", "4:45 PM"],
  ["5:05 PM", "5:15 PM", "5:30 PM"],
  ["6:50 PM", "7:00 PM", "7:35 PM"]
]

let TuWed_nb2van_1 = [
  ["7:30 AM", "7:40 AM", "8:30 AM"],
  ["10:10 AM", "10:20 AM", "10:50 AM"],
  ["12:00 PM", "12:10 PM", "1:05 PM"],
  ["3:25 PM", "3:35 PM", "4:45 PM"],
  ["6:10 PM", "6:40 PM", "6:55 PM"]
]

let Fri_nb2van_1 = [
  ["7:45 AM", "7:55 AM", "8:30 AM"],
  ["10:10 AM", "10:20 AM", "10:50 AM"],
  ["12:00 PM", "12:10 PM", "12:30 PM"],
  ["3:25 PM", "3:35 PM", "4:45 PM"],
  ["5:05 PM", "5:15 PM", "5:30 PM"],
  ["6:10 PM", "6:40 PM", "7:35 PM"]
]

let Sat_nb2van_1 = [
  ["7:45 AM", "7:55 AM", "8:30 AM"],
  ["10:10 AM", "10:20 AM", "10:50 AM"],
  ["12:00 PM", "12:10 PM", "12:30 PM"],
  ["5:05 PM", "5:15 PM", "5:30 PM"],
  ["6:10 PM", "6:40 PM", "7:35 PM"]
]

let Sun_nb2van_1 = [
  ["7:45 AM", "7:55 AM", "8:30 AM"],
  ["10:10 AM", "10:20 AM", "10:50 AM"],
  ["12:00 PM", "12:10 PM", "12:30 PM"],
  ["3:50 PM", "4:00 PM", "4:45 PM"],
  ["4:50 PM", "5:00 PM", "5:30 PM"],
  ["6:50 PM", "7:00 PM", "7:35 PM"]
]

// Schedule in Effect: September 6, 2016 to October 10, 2016 

let MTuWeTh_nb2van_2 = [
  ["7:40 AM", "7:50 AM", "8:25 AM"],
  ["10:00 AM", "10:10 AM", "10:25 AM"],
  ["11:55 AM", "12:05 PM", "12:35 PM"],
  ["12:25 PM", "12:35 PM", "2:45 PM"],
  ["3:10 PM", "3:40 PM", "4:50 PM"],
  ["6:10 PM", "6:20 PM", "6:50 PM"],
  ["6:50 PM", "7:00 PM", "8:45 PM"],
]

let Fri_nb2van_2 = [
  ["7:40 AM", "7:50 AM", "8:25 AM"],
  ["10:00 AM", "10:10 AM", "10:25 AM"],
  ["11:55 AM", "12:05 PM", "12:35 PM"],
  ["12:25 PM", "12:35 PM", "2:45 PM"],
  ["3:10 PM", "3:40 PM", "4:50 PM"],
  ["4:45 PM", "5:15 PM", "5:25 PM"], 
  ["6:10 PM", "6:20 PM", "6:50 PM"],
  ["6:50 PM", "7:35 PM", "8:45 PM"],
]

let Sat_nb2van_2 = [
  ["7:40 AM", "7:50 AM", "8:25 AM"],
  ["10:00 AM", "10:10 AM", "10:25 AM"],
  ["11:55 AM", "12:05 PM", "12:35 PM"],
  ["12:25 PM", "12:35 PM", "2:45 PM"],
  ["3:10 PM", "3:40 PM", "4:50 PM"],
  ["4:45 PM", "4:55 PM", "5:25 PM"], 
  ["6:10 PM", "6:20 PM", "6:50 PM"],
  ["6:50 PM", "7:00 PM", "8:45 PM"],
]

let Sun_nb2van_2 = [
  ["7:40 AM", "7:50 AM", "8:25 AM"],
  ["10:00 AM", "10:10 AM", "10:25 AM"],
  ["11:55 AM", "12:05 PM", "12:35 PM"],
  ["12:25 PM", "12:35 PM", "2:45 PM"],
  ["4:00 PM", "4:10 PM", "5:25 PM"], 
  ["6:10 PM", "6:20 PM", "6:50 PM"],
  ["6:50 PM", "7:00 PM", "8:45 PM"],
]

let data = 
{
  nb2van: [
    {
      'from': 'June 21, 2016',
      'to': 'September 5, 2016',
      'schedule': {
        monday: MTh_nb2van_1,
        tuesday: TuWed_nb2van_1,
        wednesday: TuWed_nb2van_1, 
        thursday: MTh_nb2van_1,
        friday: Fri_nb2van_1,
        saturday: Sat_nb2van_1, 
        sunday: Sun_nb2van_1,
        "September 5, 2016": Sun_nb2van_1
      }
    },
    {
      'from': 'September 6, 2016',
      'to': 'October 10, 2016',
      'schedule': {
        monday: MTuWeTh_nb2van_2,
        tuesday: MTuWeTh_nb2van_2,
        wednesday: MTuWeTh_nb2van_2,
        thursday: MTuWeTh_nb2van_2,
        friday: Fri_nb2van_2,
        saturday: Sat_nb2van_2, 
        sunday: Sun_nb2van_2,
        "October 10, 2016": Sun_nb2van_2
      }
    }
  ],
  van2nb: [
    {
      'from': 'June 21, 2016',
      'to': 'September 5, 2016',
      'schedule': {
        monday: MTh_van2nb_1,
        tuesday: TuWed_van2nb_1,
        wednesday: TuWed_van2nb_1, 
        thursday: MTh_van2nb_1,
        friday: Fri_van2nb_1,
        saturday: Sat_van2nb_1, 
        sunday: Sun_van2nb_1,
        "September 5, 2016": Sun_van2nb_1
      }
    },
    {
      'from': 'September 6, 2016',
      'to': 'October 10, 2016',
      'schedule': {
        monday: MTuWeTh_van2nb_2,
        tuesday: MTuWeTh_van2nb_2,
        wednesday: MTuWeTh_van2nb_2,
        thursday: MTuWeTh_van2nb_2,
        friday: Fri_van2nb_2,
        saturday: Sat_van2nb_2, 
        sunday: Sun_van2nb_2,
        "October 10, 2016": Sun_van2nb_2
      }
    }    
  ]
}


class Table extends Component {
  render () {
    let direction = this.props.direction
    let day = this.props.day
    let date = this.props.date
    let dateMoment = moment(date, "LL")
    // Look for exceptional days
    let times; 
    // Loop through the data to find the schedule that includes the date
    // in question
    for (let sched = 0; sched < data[direction].length; sched++) {
      let schedule = data[direction][sched];
      // console.log(schedule);
      // console.log(dateMoment.format('ll'))
      // console.log(moment(schedule.from, 'LL').format('ll'))
      // console.log(moment(schedule.to, 'LL').format('ll'))
      // console.log("before", moment(schedule.from, 'LL').isSameOrBefore(dateMoment))
      // console.log("after", moment(schedule.to, 'LL').isSameOrAfter(dateMoment))
      if (moment(schedule.from, 'LL').isSameOrBefore(dateMoment) && 
          moment(schedule.to, 'LL').isSameOrAfter(dateMoment)) {
        let scheduleTimes = schedule.schedule
        if (scheduleTimes[date]) {
          times = scheduleTimes[date]
        } else {
          times = scheduleTimes[this.props.day.toLowerCase()]
        }
        break;
      }
    }
    if (! times) {
      console.log("COULDN'T FIND THE RIGHT SCHEDULE FOR", date)
      return
    }

    let start;
    if (direction === 'van2nb') {
      start = "Leave Horseshoe Bay"
    } else {
      start = "Leave New Brighton"
    }

    let rows = times.map(function(triple, index) {
      let start_bits = triple[1].split(' ')[0].split(':')
      let end_bits = triple[2].split(' ')[0].split(':')
      let startDate = new Date(0, 0, 0, start_bits[0], start_bits[1], 0);
      let endDate = new Date(0, 0, 0, end_bits[0], end_bits[1], 0);
      let diff = endDate.getTime() - startDate.getTime();
      let hours = Math.floor(diff / 1000 / 60 / 60);
      diff -= hours * 1000 * 60 * 60;
      let minutes = Math.floor(diff / 1000 / 60);
      let delay;
      if (minutes > 35) {
        delay = (
          <td className="is-icon">
            <i className="fa fa-clock-o"></i>
          </td>
        )
      } else {
        delay = (
          <td className="is-icon">
          </td>
        )
      }

      return (<tr key={index}>
        <td>{triple[0]}</td>
        <td>{triple[1]}</td>
        {delay}
        <td>{triple[2]}</td>
        </tr>)
    })
    return (
      <div>
          <h1 className="title">{day} {date}</h1>
          <table className="table">
            <thead>
              <tr>
                <th>{start}</th>
                <th>Arrive Langdale</th>
                <th></th>
                <th>Leave Langdale</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>{start}</th>
                <th>Arrive Langdale</th>
                <th></th>
                <th>Leave Langdale</th>
              </tr>
            </tfoot>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
    )
  }
}

export class Direction extends Component {
  render () {
    let direction = this.props.direction
    let nextNdays = []
    for (let i = 0; i < Ndays; i++) {
      nextNdays.push(moment().add(i, 'days'))
    }
    let days = nextNdays.map(function(m, idx) {
      let day = m.format('dddd');
      let date = m.format('LL'); // This has to match the format of the exception keys
      return <Table key={idx} day={day} date={date} direction={direction} />
    })

    return (
      <div className="container is-fluid">
        {days}
      </div>
    )
  }  
}

export class NB2Vancouver extends Component {
  render () {
    return (
      <Direction direction="nb2van" />
    )
  }
}

export class Vancouver2NB extends Component {
  render () {
    return (
      <Direction direction="van2nb" />
    )
  }
}

export class Ferry extends Component {
  constructor () {
    super()
    this.state = {direction: "van2nb"}
  }
  showToGambier () { 
    this.setState({direction: "van2nb"})
  }
  showToVancouver () { 
    this.setState({direction: "nb2van"})
  }
  render () {

    let infoNote = (
      <section className="section">
        <div className="container">
          <article className="message">
            <div className="message-header">
              Time & Money
            </div>
            <div className="message-body">
              <ul>
                <li>The clock <span className="icon is-small"><i className="fa fa-clock-o"></i>
                  </span> indicates a layover longer than 35 minutes.</li>
                <li>The ferry trip between Horseshoe Bay and Langdale takes 40 minutes, and is free going back to Horseshoe Bay.</li>
                <li>The <em>Stormaway</em> trip between Langdale and New Brighton takes 10 minutes or more, paid both ways.</li>
              </ul>
            </div>
          </article>
        </div>
      </section>
    )

    let directiontable, showingToGambierIsActive, showingToVancouverIsActive;
    if (this.state.direction === 'nb2van') {
      directiontable = (<NB2Vancouver />)
      showingToGambierIsActive = "" 
      showingToVancouverIsActive = "is-active" 
    } else {
      directiontable = (<Vancouver2NB />)
      showingToGambierIsActive = "is-active" 
      showingToVancouverIsActive = "" 
    }

    return (
    <div>
      <div className="hero is-medium is-danger is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              Ferry Information
            </h1>
            <h2 className="subtitle">
              Using <em>Ruby's Method</em>, for Gambier-Vancouver transits.
            </h2>
          </div>
        </div>
      </div>
      <section className="section">
        <div className="tabs is-medium is-centered is-toggle is-fullwidth">
          <ul>
            <li className={showingToGambierIsActive}><a onClick={this.showToGambier.bind(this)}>To Gambier</a></li>
            <li className={showingToVancouverIsActive}><a onClick={this.showToVancouver.bind(this)}>To Vancouver</a></li>
          </ul>
        </div>
        {directiontable}
        {infoNote}
      </section>
    </div>
    )
  }
}