import React from 'react';
import './../styles/WorkExperience.css';

const ExperienceHistoryRow = (props) => {
  const { modes, work, target, arrName } = props;
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
        <p className="companyName">
          {work.textCompanyName}, {work.textCompanyCity}
        </p>
      </div>
      <div>
        <p>
          {work.textCompanyFromYear} - {work.textCompanyToYear}
        </p>
        <p>{work.textCompanyRole}</p>
        <p>{work.textCompanyRoleDescription}</p>
      </div>
      {button}
    </div>
  );
};

const AddExperienceForm = (props) => {
  const {
    inputCompanyName,
    inputCompanyCity,
    inputCompanyFrom,
    inputCompanyTo,
    inputCompanyRole,
    inputCompanyJobDescription
  } = props.workExperienceComponentInput;
  const changeComponentMode = (e) => {
    e.preventDefault();
    props.changeComponentMode(props.componentModeName, false);
  };
  const handleInputChange = (e) => {
    let target = e.target.name;
    let inputText = e.target.value;
    props.handleInputChange(props.componentInputName, target, inputText);
  };
  const addNewExperience = (e) => {
    e.preventDefault();
    props.addNewExperience();
  };
  return (
    <form>
      <input
        type="text"
        placeholder="Company Name"
        autoComplete="off"
        name="inputCompanyName"
        value={inputCompanyName}
        onChange={handleInputChange}
      ></input>
      <input
        type="text"
        placeholder="City"
        autoComplete="off"
        name="inputCompanyCity"
        value={inputCompanyCity}
        onChange={handleInputChange}
      ></input>
      <input
        type="text"
        placeholder="From"
        autoComplete="off"
        name="inputCompanyFrom"
        value={inputCompanyFrom}
        onChange={handleInputChange}
      ></input>
      <input
        type="text"
        placeholder="To"
        autoComplete="off"
        name="inputCompanyTo"
        value={inputCompanyTo}
        onChange={handleInputChange}
      ></input>
      <input
        type="text"
        placeholder="Role"
        autoComplete="off"
        name="inputCompanyRole"
        value={inputCompanyRole}
        onChange={handleInputChange}
      ></input>
      <textarea
        rows="5"
        cols="30"
        name="inputCompanyJobDescription"
        placeholder="Job Description & Achievements"
        value={inputCompanyJobDescription}
        onChange={handleInputChange}
      ></textarea>
      <button type="submit" onClick={changeComponentMode}>
        Cancel
      </button>
      <button type="submit" onClick={addNewExperience}>
        + Add
      </button>
    </form>
  );
};

const AddExperienceBtn = (props) => {
  const changeComponentMode = () =>
    props.changeComponentMode(props.componentModeName, true);
  return <button onClick={changeComponentMode}>+ Experience</button>;
};

const WorkExperience = (props) => {
  const componentModeName = 'workExperienceMode';
  const componentInputName = 'workExperienceComponentInput';
  const arrName = 'workExperienceArray';
  const target = 'experienceContainer';
  const changeComponentMode = (component, boolean) => {
    props.changeComponentMode(component, boolean);
  };
  const handleInputChange = (component, componentProp, inputText) =>
    props.handleInputChange(component, componentProp, inputText);
  const addNewExperience = () => props.addNewExperience();
  const removeClickedTarget = (element, target, arr) =>
    props.removeClickedTarget(element, target, arr);
  const { modes, workExperienceComponentInput, componentsArray } = props;
  const workExperienceArray = componentsArray.workExperienceArray;
  const rows = workExperienceArray.map((work) => (
    <ExperienceHistoryRow
      modes={modes}
      target={target}
      arrName={arrName}
      work={work}
      key={work.id}
      removeClickedTarget={removeClickedTarget}
    />
  ));
  let element;
  if (!modes.appMode.isEdit) {
    element = null;
  }
  if (modes.appMode.isEdit && !modes.workExperienceMode.isEdit) {
    element = (
      <AddExperienceBtn
        componentModeName={componentModeName}
        changeComponentMode={changeComponentMode}
      />
    );
  }
  if (modes.appMode.isEdit && modes.workExperienceMode.isEdit) {
    element = (
      <AddExperienceForm
        workExperienceComponentInput={workExperienceComponentInput}
        componentModeName={componentModeName}
        componentInputName={componentInputName}
        changeComponentMode={changeComponentMode}
        handleInputChange={handleInputChange}
        addNewExperience={addNewExperience}
      />
    );
  }
  return (
    <div className="container experience">
      <h2>Experiences</h2>
      <ul className={target}>{rows}</ul>
      {element}
    </div>
  );
};

export default WorkExperience;
