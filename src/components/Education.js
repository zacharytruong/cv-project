import React, { Component } from 'react';
import './Education.css';

class EducationHistoryRow extends Component {
  removeClickedTarget = (e) =>
    this.props.removeClickedTarget(
      e.target,
      this.props.target,
      this.props.arrName
    );
  // removeWorkExperience = (e) => this.props.removeWorkExperience(e.target);
  render() {
    const { modes, education } = this.props;
    let button;
    if (modes.appMode.isEdit) {
      button = (
        <button type="submit" onClick={this.removeEducation}>
          X
        </button>
      );
    } else button = null;
    return (
      <div>
        <div>
          <p>
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
  }
}

class AddEducationForm extends Component {
  changeComponentMode = (e) => {
    e.preventDefault();
    this.props.changeComponentMode(this.props.componentModeName, false);
  };
  handleInputChange = (e) => {
    let target = e.target.name;
    let inputText = e.target.value;
    this.props.handleInputChange(
      this.props.componentInputName,
      target,
      inputText
    );
  };
  addNewEducation = (e) => {
    e.preventDefault();
    this.props.addNewEducation();
  };
  render() {
    const {
      inputSchool,
      inputSchoolCity,
      inputSchoolFromYear,
      inputSchoolToYear,
      inputSchoolDegree
    } = this.props.educationComponentInput;
    return (
      <form>
        <input
          type="text"
          placeholder="Company Name"
          autoComplete="off"
          name="inputSchool"
          value={inputSchool}
          onChange={this.handleInputChange}
        ></input>
        <input
          type="text"
          placeholder="City"
          autoComplete="off"
          name="inputSchoolCity"
          value={inputSchoolCity}
          onChange={this.handleInputChange}
        ></input>
        <input
          type="text"
          placeholder="From"
          autoComplete="off"
          name="inputSchoolFromYear"
          value={inputSchoolFromYear}
          onChange={this.handleInputChange}
        ></input>
        <input
          type="text"
          placeholder="To"
          autoComplete="off"
          name="inputSchoolToYear"
          value={inputSchoolToYear}
          onChange={this.handleInputChange}
        ></input>
        <input
          type="text"
          placeholder="Degree"
          autoComplete="off"
          name="inputSchoolDegree"
          value={inputSchoolDegree}
          onChange={this.handleInputChange}
        ></input>
        <button type="submit" onClick={this.changeComponentMode}>
          Cancel
        </button>
        <button type="submit" onClick={this.addNewEducation}>
          + Add
        </button>
      </form>
    );
  }
}

class AddEducationBtn extends Component {
  changeComponentMode = () =>
    this.props.changeComponentMode(this.props.componentModeName, true);
  render() {
    return <button onClick={this.changeComponentMode}>+ Education</button>;
  }
}

class Education extends Component {
  constructor(props) {
    super(props);
    this.componentModeName = 'educationMode';
    this.componentInputName = 'educationComponentInput';
    this.arrName = 'educationArray';
    this.target = 'educationContainer';
  }
  changeComponentMode = (component, boolean) => {
    this.props.changeComponentMode(component, boolean);
  };
  handleInputChange = (component, componentProp, inputText) =>
    this.props.handleInputChange(component, componentProp, inputText);
  addNewEducation = () => this.props.addNewEducation();
  removeClickedTarget = (element, target, arr) =>
    this.props.removeClickedTarget(element, target, arr);
  // removeWorkExperience = (element) => this.props.removeWorkExperience(element);
  render() {
    const { modes, componentsArray, educationComponentInput } = this.props;
    const educationArray = componentsArray.educationArray;
    const rows = educationArray.map((education) => (
      <EducationHistoryRow
        modes={modes}
        target={this.target}
        arrName={this.arrName}
        education={education}
        key={education.id}
        removeClickedTarget={this.removeClickedTarget}
        // removeWorkExperience={this.removeWorkExperience}
      />
    ));
    let element;
    if (!modes.appMode.isEdit) {
      element = null;
    }
    if (modes.appMode.isEdit && !modes.educationMode.isEdit) {
      element = (
        <AddEducationBtn
          componentModeName={this.componentModeName}
          changeComponentMode={this.changeComponentMode}
        />
      );
    }
    if (modes.appMode.isEdit && modes.educationMode.isEdit) {
      element = (
        <AddEducationForm
          educationComponentInput={educationComponentInput}
          componentModeName={this.componentModeName}
          componentInputName={this.componentInputName}
          changeComponentMode={this.changeComponentMode}
          handleInputChange={this.handleInputChange}
          addNewEducation={this.addNewEducation}
          // removeEducation={this.removeEducation}
        />
      );
    }
    return (
      <div>
        <h2>Education</h2>
        <ul className={this.target}>{rows}</ul>
        {element}
      </div>
    );
  }
}

export default Education;
