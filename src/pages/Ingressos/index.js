import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import './styles.css';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer';
import api from '../../service/api';

import { faClock, faCalendarCheck, faCalendarXmark } from '@fortawesome/free-regular-svg-icons'
import { faLocationDot, faPrint } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function MeusEventos() {

  const [eventsData, setEventsData] = useState([])

  // TOKEM
  const accessToken = localStorage.getItem('accessToken')
  const username = localStorage.getItem('username')

  const headers = {
    'Authorization': `Bearer ${accessToken}`,
  };

  useEffect(() => {
    const fetchUserTickets = async () => {
      try {
        const userTicketsResponse = await api.get(`/api/ticket/v1/usertickets/${username}`, { headers });
        const userTickets = userTicketsResponse.data;
  
        const eventDetailsPromises = userTickets.map(ticket => {
          return api.get(`/api/ticket/v1/usertickets/${ticket.eventId}`, { headers });
        });
  
        const eventDetailsResponses = await Promise.all(eventDetailsPromises);
        const eventDetails = eventDetailsResponses.map(response => response.data);
  
        setEventsData(eventDetails);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchUserTickets();
  }, [username, headers]);

  return (
    <div>
      <Header />
      <div className="album py-5 bg-body-tertiary">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {

              eventsData.map(event => (

                <div className="col" key={event.id} >
                  <Link to={"/editar-evento/" + event.id} target="_blank" className="card" >
                    <div className="card-body">
                      <ul>
                        <li>
                          <h5 className="card-title">{event.eventName}</h5>
                        </li>
                       
                      </ul>

                    </div>

                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default MeusEventos