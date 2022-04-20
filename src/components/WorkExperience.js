import React, { Component } from 'react';
import './WorkExperience.css';

class ExperienceHistoryRow extends Component {
  removeWorkExperience = (e) => this.props.removeWorkExperience(e.target);
  render() {
    const { modes, work } = this.props;
    let button;
    if (modes.appMode.isEdit) {
      button = <button type="submit" onClick={this.removeWorkExperience}>
      X
    </button>;
    } else button = null;
    return (
      <div>
        <div>
          <p>
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
  }
}

class AddExperienceForm extends Component {
  changeComponentMode = (e) => {
    e.preventDefault();
    this.props.changeComponentMode(this.props.componentModeName, false);
  };
  handleInputChange = (e) => {
    let target = e.target.name;
    let inputText = e.target.value;
    this.props.handleInputChange(this.props.componentInputName, target, inputText);
  };
  addNewExperience = (e) => {
    e.preventDefault();
    this.props.addNewExperience();
  };
  render() {
    const {
      inputCompanyName,
      inputCompanyCity,
      inputCompanyFrom,
      inputCompanyTo,
      inputCompanyRole,
      inputCompanyJobDescription
    } = this.props.workExperienceComponentInput;
    return (
      <form>
        <input
          type="text"
          placeholder="Company Name"
          autoComplete="off"
          name="inputCompanyName"
          value={inputCompanyName}
          onChange={this.handleInputChange}
        ></input>
        <input
          type="text"
          placeholder="City"
          autoComplete="off"
          name="inputCompanyCity"
          value={inputCompanyCity}
          onChange={this.handleInputChange}
        ></input>
        <input
          type="text"
          placeholder="From"
          autoComplete="off"
          name="inputCompanyFrom"
          value={inputCompanyFrom}
          onChange={this.handleInputChange}
        ></input>
        <input
          type="text"
          placeholder="To"
          autoComplete="off"
          name="inputCompanyTo"
          value={inputCompanyTo}
          onChange={this.handleInputChange}
        ></input>
        <input
          type="text"
          placeholder="Role"
          autoComplete="off"
          name="inputCompanyRole"
          value={inputCompanyRole}
          onChange={this.handleInputChange}
        ></input>
        <textarea
          rows="5"
          cols="30"
          name="inputCompanyJobDescription"
          placeholder="Job Description & Achievements"
          value={inputCompanyJobDescription}
          onChange={this.handleInputChange}
        ></textarea>
        <button type="submit" onClick={this.changeComponentMode}>
          Cancel
        </button>
        <button type="submit" onClick={this.addNewExperience}>
          + Add
        </button>
      </form>
    );
  }
}

class AddExperienceBtn extends Component {
  changeComponentMode = () => this.props.changeComponentMode(this.props.componentModeName, true);
  render() {
    return (
      <button onClick={this.changeComponentMode}>+ Experience</button>
    );
  }
}

class WorkExperience extends Component {
  constructor(props) {
    super(props);
    this.componentModeName = 'workExperienceMode';
    this.componentInputName = 'workExperienceComponentInput';
  }
  changeComponentMode = (component, boolean) => {
    this.props.changeComponentMode(component, boolean);
  };
  handleInputChange = (component, componentProp, inputText) =>
    this.props.handleInputChange(component, componentProp, inputText);
  addNewExperience = () => this.props.addNewExperience();
  removeWorkExperience = (element) => this.props.removeWorkExperience(element);
  render() {
    const {
      modes,
      workExperienceComponentInput,
      componentsArray,
    } = this.props;
    const workExperienceArray = componentsArray.workExperienceArray;
    const rows = workExperienceArray.map((work) => (
      <ExperienceHistoryRow
        modes={modes}
        work={work}
        key={work.id}
        removeWorkExperience={this.removeWorkExperience}
      />
    ));
    let element;
    if (!modes.appMode.isEdit) {
      element = null;
    }
    if (modes.appMode.isEdit && !modes.workExperienceMode.isEdit) {
      element = (
        <AddExperienceBtn
        componentModeName={this.componentModeName}
        changeComponentMode={this.changeComponentMode}
        />
      );
    }
    if (modes.appMode.isEdit && modes.workExperienceMode.isEdit) {
      element = (
        <AddExperienceForm
          workExperienceComponentInput={workExperienceComponentInput}
          componentModeName={this.componentModeName}
          componentInputName={this.componentInputName}
          changeComponentMode={this.changeComponentMode}
          handleInputChange={this.handleInputChange}
          addNewExperience={this.addNewExperience}
          removeWorkExperience={this.removeWorkExperience}
        />
      );
    }
    return (
      <div>
        <h2>Experiences</h2>
        <ul className='experienceContainer'>
        {rows}
        </ul>
        {element}
      </div>
    );
  }
}

export default WorkExperience;
