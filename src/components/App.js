import React from 'react';
import uniqid from 'uniqid';
import UserInfo from './UserInfo';
import WorkExperience from './WorkExperience';
import Education from './Education';
import Skills from './Skills';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modes: {
        appMode: {
          isEdit: true
        },
        workExperienceMode: {
          isEdit: false
        },
        educationMode: {
          isEdit: false
        },
        skillsMode: {
          isEdit: false
        }
      },
      componentsArray: {
        workExperienceArray: [
          {
            id: uniqid(),
            textCompanyName: 'Side',
            textCompanyCity: 'SF',
            textCompanyFromYear: '2019',
            textCompanyToYear: 'Present',
            textCompanyRole: 'WSE',
            textCompanyRoleDescription: 'Build websites.'
          },
          {
            id: uniqid(),
            textCompanyName: 'OBM',
            textCompanyCity: 'Cleveland',
            textCompanyFromYear: '2015',
            textCompanyToYear: '2017',
            textCompanyRole: 'IT',
            textCompanyRoleDescription: 'Build IT.'
          }
        ],
        educationArray: [
          {
            id: uniqid(),
            textSchoolName: 'CTU',
            textSchoolCity: 'Colorado',
            textSchoolFromYear: '2017',
            textSchoolToYear: '2021',
            textSchoolDegree: 'PHD'
          },
          {
            id: uniqid(),
            textSchoolName: 'ITT',
            textSchoolCity: 'Cleveland',
            textSchoolFromYear: '2011',
            textSchoolToYear: '2015',
            textSchoolDegree: 'BCS'
          }
        ],
        skillsArray: [
          {
            id: uniqid(),
            textSkillName: 'html'
          },
          {
            id: uniqid(),
            textSkillName: 'css'
          },
          {
            id: uniqid(),
            textSkillName: 'javascript'
          }
        ]
      },
      inputs: {
        userInfoComponentInput: {
          inputUserInfo: ''
        },
        workExperienceComponentInput: {
          inputCompanyName: '',
          inputCompanyCity: '',
          inputCompanyFrom: '',
          inputCompanyTo: '',
          inputCompanyRole: '',
          inputCompanyJobDescription: ''
        },
        educationComponentInput: {
          inputSchool: '',
          inputSchoolCity: '',
          inputSchoolFromYear: '',
          inputSchoolToYear: '',
          inputSchoolDegree: ''
        },
        skillsComponentInput: {
          inputSkillName: ''
        }
      },
      textDisplay: {
        textUserInfoComponent: {
          textFirstName: {
            text: 'First Name',
            id: uniqid(),
            isEdit: false
          },
          textLastName: {
            text: 'Last Name',
            id: uniqid(),
            isEdit: false
          },
          textAddress1: {
            text: 'Address 1',
            id: uniqid(),
            isEdit: false
          },
          textAddress2: {
            text: 'Address 2',
            id: uniqid(),
            isEdit: false
          },
          textPhone: {
            text: '☎️',
            id: uniqid(),
            isEdit: false
          },
          textEmail: {
            text: '📧',
            id: uniqid(),
            isEdit: false
          },
          textGithub: {
            text: '❤️ (URL):',
            id: uniqid(),
            isEdit: false
          }
        }
      }
    };
  }

  changeAppMode = (component, boolean) => {
    const tempModes = { ...this.state.modes };
    tempModes[component].isEdit = boolean;
    this.setState({
      modes: tempModes
    });
  };

  changeAllModesToNonEditExceptApp = () => {
    const tempModes = { ...this.state.modes };
    for (const property in tempModes) {
      if (property !== 'appMode') {
        tempModes[property].isEdit = false;
      }
    }
    this.setState({
      modes: tempModes
    });
  };

  changeInfoRowToEditMode = (element) => {
    this.changeAllModesToNonEditExceptApp();
    const target = element.closest('li').getAttribute('datakey');
    const textUserInfoComponent = this.state.textDisplay.textUserInfoComponent;
    const tempObj = { ...textUserInfoComponent };
    for (const info in tempObj) {
      target === info
        ? (tempObj[target].isEdit = true)
        : (tempObj[info].isEdit = false);
    }
    this.setState({
      textDisplay: {
        textUserInfoComponent: tempObj
      }
    });
  };

  changeUserInfoModeNonEdit = () => {
    const textDisplay = { ...this.state.textDisplay };
    const textUserInfoComponent = textDisplay.textUserInfoComponent;
    for (const property in textUserInfoComponent) {
      textUserInfoComponent[property].isEdit = false;
    }
    this.setState({
      textDisplay: textDisplay
    });
  };

  handleInputChange = (component, componentProp, inputText) => {
    const tempObj = { ...this.state.inputs };
    tempObj[component][componentProp] = inputText;
    this.setState({
      inputs: tempObj
    });
  };

  handleUserInfoUpdateBtn = (element) => {
    const datakey = element.closest('form').getAttribute('datakey');
    const textUserInfoComponent = this.state.textDisplay.textUserInfoComponent;
    const tempObj = { ...textUserInfoComponent };
    const inputUserInfo =
      this.state.inputs.userInfoComponentInput.inputUserInfo;
    tempObj[datakey].text = inputUserInfo;
    tempObj[datakey].isEdit = false;
    const tempInputs = { ...this.state.inputs };
    tempInputs.userInfoComponentInput.inputUserInfo = '';
    this.setState({
      [textUserInfoComponent]: tempObj,
      inputs: tempInputs
    });
  };

  changeComponentMode = (component, boolean) => {
    const tempModes = { ...this.state.modes };
    const tempInputs = { ...this.state.inputs };
    this.changeAllModesToNonEditExceptApp();
    this.changeUserInfoModeNonEdit();
    tempModes[component].isEdit = boolean;
    for (const property in tempInputs[component]) {
      tempInputs[component][property] = '';
    }
    this.setState({
      modes: tempModes
    });
  };

  addNewExperience = () => {
    const tempArr = { ...this.state.componentsArray };
    const tempModes = { ...this.state.modes };
    const tempInputs = { ...this.state.inputs };
    const {
      inputCompanyName,
      inputCompanyCity,
      inputCompanyFrom,
      inputCompanyTo,
      inputCompanyRole,
      inputCompanyJobDescription
    } = this.state.inputs.workExperienceComponentInput;
    const work = {
      id: uniqid(),
      textCompanyName: inputCompanyName,
      textCompanyCity: inputCompanyCity,
      textCompanyFromYear: inputCompanyFrom,
      textCompanyToYear: inputCompanyTo,
      textCompanyRole: inputCompanyRole,
      textCompanyRoleDescription: inputCompanyJobDescription
    };
    tempArr.workExperienceArray.push(work);
    tempModes.workExperienceMode.isEdit = false;
    for (const property in tempInputs.workExperienceComponentInput) {
      tempInputs.workExperienceComponentInput[property] = '';
    }
    this.setState({
      componentsArray: tempArr,
      modes: tempModes,
      inputs: tempInputs
    });
  };

  addNewEducation = () => {
    const tempArr = { ...this.state.componentsArray };
    const tempModes = { ...this.state.modes };
    const tempInputs = { ...this.state.inputs };
    const {
      inputSchool,
      inputSchoolCity,
      inputSchoolFromYear,
      inputSchoolToYear,
      inputSchoolDegree
    } = this.state.inputs.educationComponentInput;
    const education = {
      id: uniqid(),
      textSchoolName: inputSchool,
      textSchoolCity: inputSchoolCity,
      textSchoolFromYear: inputSchoolFromYear,
      textSchoolToYear: inputSchoolToYear,
      textSchoolDegree: inputSchoolDegree
    };
    tempArr.educationArray.push(education);
    tempModes.educationMode.isEdit = false;
    for (const property in tempInputs.educationComponentInput) {
      tempInputs.educationComponentInput[property] = '';
    }
    this.setState({
      componentsArray: tempArr,
      modes: tempModes,
      inputs: tempInputs
    });
  };

  addNewSkill = () => {
    const tempArr = { ...this.state.componentsArray };
    const tempModes = { ...this.state.modes };
    const tempInputs = { ...this.state.inputs };
    const {
      inputSkillName
    } = this.state.inputs.skillsComponentInput;
    const skill = {
      id: uniqid(),
      textSkillName: inputSkillName
    };
    tempArr.skillsArray.push(skill);
    tempModes.skillsMode.isEdit = false;
    for (const property in tempInputs.skillsComponentInput) {
      tempInputs.skillsComponentInput[property] = '';
    }
    this.setState({
      componentsArray: tempArr,
      modes: tempModes,
      inputs: tempInputs
    });
  }

  removeClickedTarget = (element, target, arrName) => {
    const index = Array.from(element.closest(target).children).indexOf(element.parentNode);
    const tempArr = { ...this.state.componentsArray };
    tempArr[arrName].splice(index, 1);
    this.setState({
      componentsArray: tempArr
    });
  };

  removeWorkExperience = (element) => {
    const index = Array.from(element.closest('.experienceContainer').children).indexOf(element.parentNode);
    const tempArr = { ...this.state.componentsArray };
    tempArr.workExperienceArray.splice(index, 1);
    this.setState({
      componentsArray: tempArr
    });
  };

  removeEducation = (element) => {
    const index = Array.from(element.closest('.educationContainer').children).indexOf(element.parentNode);
    const tempArr = { ...this.state.componentsArray };
    tempArr.educationArray.splice(index, 1);
    this.setState({
      componentsArray: tempArr
    });
  };

  removeSkill = (element) => {
    const index = Array.from(element.closest('.skillContainer').children).indexOf(element.parentNode);
    const tempArr = { ...this.state.componentsArray };
    tempArr.skillsArray.splice(index, 1);
    this.setState({
      componentsArray: tempArr
    });
  };

  render() {
    const { modes, componentsArray, inputs, textDisplay } = this.state;
    return (
      <div className="appContainer">
        <nav>
          <button onClick={() => this.changeAppMode('appMode', true)}>
            EDIT MODE
          </button>
          <button onClick={() => this.changeAppMode('appMode', false)}>
            VIEW MODE
          </button>
        </nav>
        <UserInfo
          modes={modes}
          inputs={inputs.userInfoComponentInput.inputUserInfo}
          textDisplay={textDisplay}
          changeInfoRowToEditMode={this.changeInfoRowToEditMode}
          handleInputChange={this.handleInputChange}
          handleUserInfoUpdateBtn={this.handleUserInfoUpdateBtn}
        />
        <WorkExperience
          modes={modes}
          componentsArray={componentsArray}
          workExperienceComponentInput={inputs.workExperienceComponentInput}
          handleInputChange={this.handleInputChange}
          changeComponentMode={this.changeComponentMode}
          addNewExperience={this.addNewExperience}
          removeClickedTarget={this.removeClickedTarget}
          // removeWorkExperience={this.removeWorkExperience}
        />
        <Education
          modes={modes}
          componentsArray={componentsArray}
          educationComponentInput={inputs.educationComponentInput}
          handleInputChange={this.handleInputChange}
          changeComponentMode={this.changeComponentMode}
          addNewEducation={this.addNewEducation}
          removeClickedTarget={this.removeClickedTarget}
          // removeWorkExperience={this.removeWorkExperience}
        />
        <Skills
          modes={modes}
          componentsArray={componentsArray}
          inputs={inputs.skillsComponentInput.inputSkillName}
          handleInputChange={this.handleInputChange}
          changeComponentMode={this.changeComponentMode}
          addNewSkill={this.addNewSkill}
          removeClickedTarget={this.removeClickedTarget}
          // removeWorkExperience={this.removeWorkExperience}
        />
      </div>
    );
  }
}

export default App;