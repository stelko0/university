import './Home.scss';
import { useState, useEffect } from 'react';
let data = require('../../../data/schudule.json');

export default function Home() {
  let date = new Date();
  let day = date.getDay();
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
  const [selectedCourse, setSelectedCourse] = useState(1);

  const [collectData, setCollectedData] = useState({});
  const [remainingTimeText, setRemainingTimeText] = useState('');
  const [lecturesWithRemainingTime, setLecturesWithRemainingTime] = useState(
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
      let hourAsString = element.start.split(':');
      let time = {
        hour: Number(hourAsString[0]),
        minute: Number(hourAsString[1]),
      };
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      let remainingHours, remainingMinutes;
      if (
        hours > time.hour ||
        (hours === time.hour && minutes >= time.minute)
      ) {
        remainingHours = 24 - (hours - time.hour);
      } else {
        remainingHours = time.hour - hours;
      }
      remainingMinutes = time.minute - minutes;
      if (remainingMinutes < 0) {
        remainingMinutes += 60;
        remainingHours -= 1;
      }
      const remainingTimeText = `Remaining ${remainingHours}h and ${remainingMinutes}m`;
      return {
        ...element,
        remainingTimeText,
      };
    });
    setLecturesWithRemainingTime(updatedLectures);
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

  function check(e) {
    e.preventDefault();
    if (!selectedSpecialty || !selectedGroup || !selectedCourse) {
      return;
    }
    let updateData =
      data.specialty?.[selectedSpecialty]?.group?.[selectedGroup]?.course?.[
        selectedCourse
      ]?.[day];
    if (!updateData) {
      document.querySelectorAll('.homeSection__lectureBox').forEach((elem) => {
        elem.style.display = 'none';
      });
      return setDataError('No schedule found!');
    }
    document.querySelectorAll('.homeSection__lectureBox').forEach((elem) => {
      elem.style.display = 'inline-block';
    });
    setDataError('');
    setCollectedData(updateData);
    getLecture(updateData);
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
      <div className="homeSection__container">
        <span className="homeSection__dataError">{dataError}</span>
        {!collectData ? (
          <h1>Empty</h1>
        ) : (
          <span className="homeSection__lectureList">
            {lecturesWithRemainingTime.map((key) => (
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
            {/* <span className="homeSection__lectureBox lect">
              <h2>Lekciq</h2>
              <h2>11:11 - 12:12</h2>
              <h2>123</h2>
              <h2>asd</h2>
              <h3>Remaining 1h and 1m</h3>
            </span>
            <span className="homeSection__lectureBox prac">
              <h2>Uprajnenie</h2>
              <h2>11:11 - 12:12</h2>
              <h2>123</h2>
              <h2>asd</h2>
              <h3>Remaining 1h and 1m</h3>
            </span> */}
          </span>
        )}
      </div>
    </section>
  );
}
// ПРОВЕРКА ДАЛИ СА МИНАЛИ ЛЕКЦИИТЕ ВЕЧЕ
