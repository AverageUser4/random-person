import React, { useState, useRef } from 'react';
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa'

const url = 'https://randomuser.me/api/';

export default function Person() {
  const [isError, setIsError] = useState(false);
  const [person, setPerson] = useState({
    name: 'Rose Morris',
    email: 'rose.morris@example.com',
    age: 77,
    street: '9726 Port Hills Road',
    phone: '(597)-055-1777',
    password: 'bob123',
    imageURL: 'https://randomuser.me/api/portraits/women/19.jpg'
  });
  const [currentData, setCurrentData] = useState('name');

  const lastFetchTimeForRace = useRef(0);
  const lastFetchTimeForThrottle = useRef(0);

  function changeCurrentData(event) {
    setCurrentData(event.currentTarget.name);
  }

  async function fetchPersonData() {
    try {
      const now = Date.now();

      if(now - lastFetchTimeForThrottle.current < 500)
        return;

      lastFetchTimeForThrottle.current = now;

      setIsError(false);

      const data = await fetch(url);
      const json = await data.json();

      const person = json.results[0];

      const name = `${person.name.first} ${person.name.last}`;
      const { email, phone } = person;
      const age = person.dob.age;
      const street = `${person.location.street.number} ${person.location.street.name}`;
      const password = person.login.password;
      const imageURL = person.picture.large;

      if(now < lastFetchTimeForRace.current)
        return;

      lastFetchTimeForRace.current = now;
      setPerson({name, email, phone, age, street, password, imageURL});
      setCurrentData('name');

    } catch(e) {
      console.error(e);
      setIsError(true);
    }
  }

  if(isError)
    return (
      <div className="error">
        <h1 className="error__heading">Something went wrong...</h1>
        <button 
          className="button"
          onClick={fetchPersonData}
          >Try again</button>
      </div>
    );


  return (
    <article className="person">

      <div className="person__top">

        <img className="person__image" src={person.imageURL}/>

      </div>

      <div className="person__bottom">

        <span className="person__info">My {currentData} is</span>

        <span className="person__info-value">{person[currentData]}</span>

        <ul className="person__list">

          <li>
            <button 
              className="person__list-button"
              name="name"
              onMouseEnter={changeCurrentData}
              onClick={changeCurrentData}
              onFocus={changeCurrentData}
            >
              <FaUser/>
            </button>
          </li>

          <li>
            <button 
              className="person__list-button"
              name="email"
              onMouseEnter={changeCurrentData}
              onClick={changeCurrentData}
              onFocus={changeCurrentData}
            >
              <FaEnvelopeOpen/>
            </button>
          </li>

          <li>
            <button 
              className="person__list-button"
              name="age"
              onMouseEnter={changeCurrentData}
              onClick={changeCurrentData}
              onFocus={changeCurrentData}
            >
              <FaCalendarTimes/>
            </button>
          </li>

          <li>
            <button 
              className="person__list-button"
              name="street"
              onMouseEnter={changeCurrentData}
              onClick={changeCurrentData}
              onFocus={changeCurrentData}
            >
              <FaMap/>
            </button>
          </li>

          <li>
            <button 
              className="person__list-button"
              name="phone"
              onMouseEnter={changeCurrentData}
              onClick={changeCurrentData}
              onFocus={changeCurrentData}
            >
              <FaPhone/>
            </button>
          </li>

          <li>
            <button 
              className="person__list-button"
              name="password"
              onMouseEnter={changeCurrentData}
              onClick={changeCurrentData}
              onFocus={changeCurrentData}
            >
              <FaLock/>
            </button>
          </li>

        </ul>

        <button 
          className="button"
          onClick={fetchPersonData}
        >Random user</button>

      </div>

    </article>
  );
}