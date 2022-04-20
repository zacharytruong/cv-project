import React, { Component } from 'react';
import './Skills.css';

class SkillList extends Component {
  removeSkill = (e) => this.props.removeSkill(e.target);
  render() {
    const { modes, skill } = this.props;
    let removeBtn;
    if (!modes.appMode.isEdit) {
      removeBtn = null;
    } else {
      removeBtn = <span onClick={this.removeSkill}>X</span>;
    }
    return (
      <li>
        {skill.textSkillName} {removeBtn}
      </li>
    );
  }
}

class AddSkillForm extends Component {
  handleInputChange = (e) => {
    let target = e.target.name;
    let inputText = e.target.value;
    this.props.handleInputChange(this.props.componentInputName, target, inputText);
  };
  addNewSkill = (e) => {
    e.preventDefault();
    this.props.addNewSkill();
  };
  render() {
    return (
      <form>
        <input
          type="text"
          autoComplete="off"
          name="inputSkillName"
          value={this.props.inputs}
          onChange={this.handleInputChange}
        ></input>
        <button type="submit" onClick={this.addNewSkill}>
          Add
        </button>
      </form>
    );
  }
}

class AddSkillBtn extends Component {
  changeComponentMode = () => this.props.changeComponentMode(this.props.componentModeName, true);
  render() {
    return <button onClick={this.changeComponentMode}>+ Skill</button>;
  }
}

class Skills extends Component {
  constructor(props) {
    super(props);
    this.componentModeName = 'skillsMode';
    this.componentInputName = 'skillsComponentInput';
  }
  changeComponentMode = (component, boolean) => {
    this.props.changeComponentMode(component, boolean);
  };
  addNewSkill = () => this.props.addNewSkill();
  removeSkill = (element) => this.props.removeSkill(element);
  handleInputChange = (component, componentProp, inputText) =>
    this.props.handleInputChange(component, componentProp, inputText);
  render() {
    const { modes, componentsArray, inputs } = this.props;
    const skillsArray = componentsArray.skillsArray;
    const rows = skillsArray.map((skill) => (
      <SkillList
        modes={modes}
        skill={skill}
        key={skill.id}
        removeSkill={this.removeSkill}
      />
    ));
    let element;
    if (!modes.appMode.isEdit) {
      element = null;
    }
    if (modes.appMode.isEdit && !modes.skillsMode.isEdit) {
      element = (
        <AddSkillBtn
        componentModeName={this.componentModeName}
        changeComponentMode={this.changeComponentMode}
        />
      );
    }
    if (modes.appMode.isEdit && modes.skillsMode.isEdit) {
      element = (
        <AddSkillForm
          inputs={inputs}
          componentModeName={this.componentModeName}
          componentInputName={this.componentInputName}
          handleInputChange={this.handleInputChange}
          addNewSkill={this.addNewSkill}
        />
      );
    }
    return (
      <div>
        <h2>Skills</h2>
        <ul className="skillContainer">
          {rows}
        </ul>
        {element}
      </div>
    );
  }
}

export default Skills;
