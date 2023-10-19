import './Home.scss';
import { useState, useEffect } from 'react';
let data = require('../../../data/schudule.json');

export default function Home() {
  let date = new Date();
  let day = date.getDay();
  let studyDays = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 1,
    6: 1,
    0: 1
  }
  const dayAsString = {
    0: 'Sunday',
    1: 'Monday',
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday"
  }

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const [dataError, setDataError] = useState('');

  const specialty = [
    { value: '', text: '--Choose a specialty--', disabled: true },
    { value: 'SIT', text: 'Software and Internet technologies' },
    { value: 'KST', text: 'Computer systems and technology' },
  ];

  const groups = [
    { value: '', text: '--Choose a group--', disabled: true },
    { value: 1, text: 'I' },
    { value: 2, text: 'II' },
    { value: 3, text: 'III' },
    { value: 4, text: 'IV' },
    { value: 5, text: 'V' },
  ];
  const courses = [
    { value: '', text: '--Choose a course--', disabled: true },
    { value: 1, text: '1' },
    { value: 2, text: '2' },
    { value: 3, text: '3' },
    { value: 4, text: '4' },
    { value: 5, text: '5' },
  ];

  const [selectedSpecialty, setSelectedSpecialty] = useState('SIT');
  const [selectedGroup, setSelectedGroup] = useState(2);
  const [selectedCourse, setSelectedCourse] = useState(2);

  const [collectData, setCollectedData] = useState({});
  const [todayLectures, setTodayLectures] = useState(
    []
  );

  const [tommorowLectures, setTommorowLectures] = useState(
    []
  );

  const handleChangeSpecialty = (event) => {
    setSelectedSpecialty(event.target.value);
  };
  const handleChangeGroup = (event) => {
    setSelectedGroup(event.target.value);
  };
  const handleChangeCourse = (event) => {
    setSelectedCourse(event.target.value);
  };

  function getLecture(updateData) {
    const updatedLectures = updateData.subjects?.map((element) => {
      let startHourAsString = element.start.split(':');
      let endHourAsString = element.end.split(':');

      let time = {
        startHour: Number(startHourAsString[0]),
        startMinutes: Number(startHourAsString[1]),
        endHour: Number(endHourAsString[0]),
        endMinutes: Number(endHourAsString[1]),
      };
      const now = new Date();

      const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), time.startHour, time.startMinutes);
      const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), time.endHour, time.endMinutes);






      let minutesAgo = 0;
      if (updateData.day === dayAsString[studyDays[day]]) {
        if (now.getHours() >= start.getHours()) {
          minutesAgo = (now.getHours() - start.getHours()) * 60 + (now.getMinutes() - start.getMinutes());
        }
      }

      let remainingTimeText = "";
      let remainingHours, remainingMinutes;
      if (now < start) {
        remainingHours = time.startHour - now.getHours();
        remainingMinutes = time.startMinutes - now.getMinutes();

        if (remainingMinutes < 0) {
          remainingMinutes += 60;
          remainingHours -= 1;
        }
        remainingTimeText = `Remaining ${remainingHours}h and ${remainingMinutes}m`;
      } else if (now > end) {
        remainingTimeText = "The lecture has already ended!"
      } else {
        remainingTimeText = `The lecture already starts before ${Math.floor(minutesAgo / 60)}h and ${minutesAgo % 60}m`;
      }

      if (updateData.day === dayAsString[studyDays]) {
      }
      return {
        ...element,
        remainingTimeText,
      };
    });
    setTodayLectures(updatedLectures);
  }
  function getLectureTommrow(updateData) {
    const updatedLectures = updateData.subjects?.map((element) => {
      let remainingTimeText = "";
      remainingTimeText = "You have time to next day!"
      return {
        ...element,
        remainingTimeText,
      };
    });
    setTommorowLectures(updatedLectures);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setHours(now.getHours());
      setMinutes(now.getMinutes());
    }, 60000); // Update time every minute (60,000 milliseconds)

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (collectData && collectData.subjects) {
      getLecture(collectData);

      const intervalRemainingTime = setInterval(() => {
        getLecture(collectData);
      }, 60000); // Update remaining time every minute (60,000 milliseconds)

      // Clean up the interval when the component unmounts or collectData changes
      return () => clearInterval(intervalRemainingTime);
    }
  }, [collectData]);
  const [visibilityDays, setVisibilityDays] = useState(false);
  function check(e) {
    e.preventDefault();
    if (!selectedSpecialty || !selectedGroup || !selectedCourse) {
      return;
    }
    let lectureForToday =
      data.specialty?.[selectedSpecialty]?.group?.[selectedGroup]?.course?.[
      selectedCourse
      ]?.[studyDays[day]];
    let lectureForTommorow = data.specialty?.[selectedSpecialty]?.group?.[selectedGroup]?.course?.[
      selectedCourse
    ]?.[studyDays[day + 1]];
    setTommorowLectures(lectureForTommorow);
    if (!lectureForToday) {
      document.querySelectorAll('.homeSection__lectureBox').forEach((elem) => {
        elem.style.display = 'none';
      });
      return setDataError('No schedule found!');
    }
    document.querySelectorAll('.homeSection__lectureBox').forEach((elem) => {
      elem.style.display = 'inline-block';
    });
    setDataError('');
    setCollectedData(lectureForToday);
    getLecture(lectureForToday);
    getLectureTommrow(lectureForTommorow)
    setVisibilityDays(true);
  }

  return (
    <section className="homeSection">
      <div className="homeSection__container">
        <h1 className="homeSection__nameContainer">
          Please fill in the fields
        </h1>
        <form action="" className="homeSection__formBox" onSubmit={check}>
          <div className="homeSection__selects">
            <span className="homeSection__selectsLables">
              <label htmlFor="" className="homeSection__labelsSelect">
                Specialty
              </label>
              <select
                value={selectedSpecialty}
                onChange={handleChangeSpecialty}
                className="homeSection__select"
              >
                {specialty.map((option) => (
                  <option
                    disabled={option.disabled}
                    key={option.value}
                    value={option.value}
                  >
                    {option.text}
                  </option>
                ))}
              </select>
            </span>
            <span className="homeSection__selectsLables">
              <label htmlFor="" className="homeSection__labelsSelect">
                Group
              </label>
              <select
                value={selectedGroup}
                onChange={handleChangeGroup}
                className="homeSection__select"
              >
                {groups.map((option) => (
                  <option
                    disabled={option.disabled}
                    key={option.value}
                    value={option.value}
                  >
                    {option.text}
                  </option>
                ))}
              </select>
            </span>
            <span className="homeSection__selectsLables">
              <label htmlFor="" className="homeSection__labelsSelect">
                Course
              </label>
              <select
                value={selectedCourse}
                onChange={handleChangeCourse}
                className="homeSection__select"
              >
                {courses.map((option) => (
                  <option
                    disabled={option.disabled}
                    key={option.value}
                    value={option.value}
                  >
                    {option.text}
                  </option>
                ))}
              </select>
            </span>
          </div>
          <div className="homeSection__sectionBtn">
            <button
              type="submit"
              className="homeSection__submitBtn"
              disabled={!selectedSpecialty || !selectedGroup || !selectedCourse}
            >
              {!selectedSpecialty || !selectedGroup || !selectedCourse
                ? 'fill fields'
                : 'Check'}
            </button>
          </div>
        </form>
      </div>
      <div className={visibilityDays ? "homeSection__container" : "hide"} >
        <span className="homeSection__dataError" >{dataError}</span>
        {!collectData ? (
          <h1>Empty</h1>
        ) : (
          <span className='homeSection__lectureContainer' >
            <span className="homeSection__lectureAndDay">
              <h1 hidden={!visibilityDays} className='homeSection__day'>Today - {dayAsString[studyDays[day]]}</h1>
              <span className="homeSection__lectureList">
                {todayLectures.map((key) => (
                  <span className="homeSection__lectureBox" key={key.subjectName}>
                    <h2>{key.subjectName}</h2>
                    <h2>
                      {key.start} - {key.end}
                    </h2>
                    <h2>{key.room}</h2>
                    <h2>{key.teacher}</h2>
                    <h3>{key.remainingTimeText}</h3>
                  </span>
                ))}
              </span>

            </span>
            <span className="homeSection__lectureAndDay">
              <h1 hidden={!visibilityDays} className='homeSection__day'>Next day - {dayAsString[studyDays[day + 1]]}</h1>
              <span className="homeSection__lectureList">
                {tommorowLectures && tommorowLectures.length > 0 ? (
                  tommorowLectures.map((key) => (
                    <span className="homeSection__lectureBox" key={key.subjectName}>
                      <h2>{key.subjectName}</h2>
                      <h2>
                        {key.start} - {key.end}
                      </h2>
                      <h2>{key.room}</h2>
                      <h2>{key.teacher}</h2>
                      <h3>{key.remainingTimeText}</h3>
                    </span>
                  ))
                ) : (console.log())}
              </span>
            </span>
          </span>
        )}
      </div>
    </section >
  );
}
