import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import './../styles/Education.css';

const EducationHistoryRow = (props) => {
  const { modes, education, target, arrName } = props;
  const removeClickedTarget = (e) =>
    props.removeClickedTarget(e.target, target, arrName);

  let button;
  if (modes.appMode.isEdit) {
    button = (
      <button type="submit" onClick={removeClickedTarget}>
        X
      </button>
    );
  } else button = null;
  return (
    <div>
      <div>
        <p className="schoolName">
          {education.textSchoolName}, {education.textSchoolCity}
        </p>
        <p>
          {education.textSchoolFromYear} - {education.textSchoolToYear}
        </p>
      </div>
      <div>
        <p>{education.textSchoolDegree}</p>
      </div>
      {button}
    </div>
  );
};

const AddEducationForm = (props) => {
  const {
    inputSchool,
    inputSchoolCity,
    inputSchoolFromYear,
    inputSchoolToYear,
    inputSchoolDegree
  } = props.educationComponentInput;
  const changeComponentMode = (e) => {
    e.preventDefault();
    props.changeComponentMode(props.componentModeName, false);
  };
  const handleInputChange = (e) => {
    let target = e.target.name;
    let inputText = e.target.value;
    props.handleInputChange(props.componentInputName, target, inputText);
  };
  const addNewEducation = (e) => {
    e.preventDefault();
    props.addNewEducation();
  };

  const formRef = useRef();
  const formEle = gsap.utils.selector(formRef);
  useEffect(() => {
    gsap.fromTo([formEle('input')], { scaleX: 0 }, { scaleX: 1, duration: 0.35, stagger: .15 });
  }, []);

  return (
    <form ref={formRef}>
      <input
        type="text"
        placeholder="School Name"
        autoComplete="off"
        name="inputSchool"
        value={inputSchool}
        onChange={handleInputChange}
      ></input>
      <input
        type="text"
        placeholder="City"
        autoComplete="off"
        name="inputSchoolCity"
        value={inputSchoolCity}
        onChange={handleInputChange}
      ></input>
      <input
        type="text"
        placeholder="From"
        autoComplete="off"
        name="inputSchoolFromYear"
        value={inputSchoolFromYear}
        onChange={handleInputChange}
      ></input>
      <input
        type="text"
        placeholder="To"
        autoComplete="off"
        name="inputSchoolToYear"
        value={inputSchoolToYear}
        onChange={handleInputChange}
      ></input>
      <input
        type="text"
        placeholder="Degree"
        autoComplete="off"
        name="inputSchoolDegree"
        value={inputSchoolDegree}
        onChange={handleInputChange}
      ></input>
      <button type="submit" onClick={changeComponentMode}>
        Cancel
      </button>
      <button type="submit" onClick={addNewEducation}>
        + Add
      </button>
    </form>
  );
};

const AddEducationBtn = (props) => {
  const changeComponentMode = () =>
    props.changeComponentMode(props.componentModeName, true);

  return <button onClick={changeComponentMode}>+ Education</button>;
};

const Education = (props) => {
  const componentModeName = 'educationMode';
  const componentInputName = 'educationComponentInput';
  const arrName = 'educationArray';
  const target = 'educationContainer';

  const changeComponentMode = (component, boolean) => {
    props.changeComponentMode(component, boolean);
  };
  const handleInputChange = (component, componentProp, inputText) =>
    props.handleInputChange(component, componentProp, inputText);
  const addNewEducation = () => props.addNewEducation();
  const removeClickedTarget = (element, target, arr) =>
    props.removeClickedTarget(element, target, arr);

  const { modes, componentsArray, educationComponentInput } = props;
  const educationArray = componentsArray.educationArray;
  const rows = educationArray.map((education) => (
    <EducationHistoryRow
      modes={modes}
      target={target}
      arrName={arrName}
      education={education}
      key={education.id}
      removeClickedTarget={removeClickedTarget}
    />
  ));
  let element;
  if (!modes.appMode.isEdit) {
    element = null;
  }
  if (modes.appMode.isEdit && !modes.educationMode.isEdit) {
    element = (
      <AddEducationBtn
        componentModeName={componentModeName}
        changeComponentMode={changeComponentMode}
      />
    );
  }
  if (modes.appMode.isEdit && modes.educationMode.isEdit) {
    element = (
      <AddEducationForm
        educationComponentInput={educationComponentInput}
        componentModeName={componentModeName}
        componentInputName={componentInputName}
        changeComponentMode={changeComponentMode}
        handleInputChange={handleInputChange}
        addNewEducation={addNewEducation}
      />
    );
  }
  return (
    <div className="container education">
      <h2>Education</h2>
      <ul className={target}>{rows}</ul>
      {element}
    </div>
  );
};

export default Education;
