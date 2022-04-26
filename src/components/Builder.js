import React, { Component } from 'react';
import UserInfo from './UserInfo';
// import WorkExperience from './WorkExperience';
// import Education from './Education';
import './Builder.css';

class Builder extends Component {
  changeModeToEdit = (componentMode) => this.props.changeModeToEdit(componentMode);
  changeModeToNonEdit = (componentMode) => this.props.changeModeToNonEdit(componentMode);
  render() {
    const {
      modes,
      componentsArray,
      inputs,
      textDisplay
    } = this.props;
    return (
      <main>
        <UserInfo
          modes={modes}
          componentsArray={componentsArray}
          inputs={inputs}
          textDisplay={textDisplay}
          changeModeToEdit={this.changeModeToEdit}
          changeModeToNonEdit={this.changeModeToNonEdit}
        />
        {/* <WorkExperience
          modes={modes}
          componentsArray={componentsArray}
          inputs={inputs}
          changeModeToEdit={this.changeModeToEdit}
          changeModeToNonEdit={this.changeModeToNonEdit}
        />
        <Education
          modes={modes}
          componentsArray={componentsArray}
          inputs={inputs}
          changeModeToEdit={this.changeModeToEdit}
          changeModeToNonEdit={this.changeModeToNonEdit}
        /> */}
      </main>
    );
  }
}

export default Builder;
