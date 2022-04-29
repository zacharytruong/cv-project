import React, { useState } from 'react';
import uniqid from 'uniqid';
import UserInfo from './UserInfo';
import WorkExperience from './WorkExperience';
import Education from './Education';
import Skills from './Skills';
import './../styles/App.css';

const App = () => {
  const [modes, setModes] = useState({
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
  });

  const [componentsArray, setComponenetsArray] = useState({
    workExperienceArray: [],
    educationArray: [],
    skillsArray: []
  });

  const [inputs, setInputs] = useState({
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
  });

  const [textDisplay, setTextDisplay] = useState({
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
  });

  const changeAppMode = (component, boolean) => {
    const tempModes = { ...modes };
    tempModes[component].isEdit = boolean;
    setModes(tempModes);
  };

  const changeAllModesToNonEditExceptApp = () => {
    const tempModes = { ...modes };
    for (const property in tempModes) {
      if (property !== 'appMode') {
        tempModes[property].isEdit = false;
      }
    }
    setModes(tempModes);
  };

  const changeInfoRowToEditMode = (element) => {
    changeAllModesToNonEditExceptApp();
    const target = element.target.closest('li').getAttribute('datakey');
    const tempTextDisplay = { ...textDisplay };
    const textUserInfoComponent = tempTextDisplay.textUserInfoComponent;
    const tempObj = { ...textUserInfoComponent };
    for (const info in tempObj) {
      target === info
        ? (tempObj[target].isEdit = true)
        : (tempObj[info].isEdit = false);
    }
    setTextDisplay(tempTextDisplay);
  };

  const handleInputChange = (component, componentProp, inputText) => {
    const tempInputs = { ...inputs };
    tempInputs[component][componentProp] = inputText;
    setInputs(tempInputs);
  };

  const handleUserInfoUpdateBtn = (element) => {
    const datakey = element.closest('form').getAttribute('datakey');
    const tempTextDisplay = { ...textDisplay };
    const textUserInfoComponent = tempTextDisplay.textUserInfoComponent;
    const tempObj = { ...textUserInfoComponent };
    const tempInputs = { ...inputs };
    const inputUserInfo = tempInputs.userInfoComponentInput.inputUserInfo;
    tempObj[datakey].text = inputUserInfo;
    tempObj[datakey].isEdit = false;
    tempInputs.userInfoComponentInput.inputUserInfo = '';
    setTextDisplay(tempTextDisplay);
    setInputs(tempInputs);
  };

  const changeUserInfoModeNonEdit = () => {
    const tempTextDisplay = { ...textDisplay };
    const textUserInfoComponent = tempTextDisplay.textUserInfoComponent;
    for (const property in textUserInfoComponent) {
      textUserInfoComponent[property].isEdit = false;
    }
    setTextDisplay(tempTextDisplay);
  };

  const changeComponentMode = (component, boolean) => {
    const tempModes = { ...modes };
    const tempInputs = { ...inputs };
    changeAllModesToNonEditExceptApp();
    changeUserInfoModeNonEdit();
    tempModes[component].isEdit = boolean;
    for (const property in tempInputs[component]) {
      tempInputs[component][property] = '';
    }
    setModes(tempModes);
  };

  const addNewExperience = () => {
    const tempArr = { ...componentsArray };
    const tempModes = { ...modes };
    const tempInputs = { ...inputs };
    const {
      inputCompanyName,
      inputCompanyCity,
      inputCompanyFrom,
      inputCompanyTo,
      inputCompanyRole,
      inputCompanyJobDescription
    } = inputs.workExperienceComponentInput;
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
    setComponenetsArray(tempArr);
    setModes(tempModes);
    setInputs(tempInputs);
  };

  const addNewEducation = () => {
    const tempArr = { ...componentsArray };
    const tempModes = { ...modes };
    const tempInputs = { ...inputs };
    const {
      inputSchool,
      inputSchoolCity,
      inputSchoolFromYear,
      inputSchoolToYear,
      inputSchoolDegree
    } = inputs.educationComponentInput;
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
    setComponenetsArray(tempArr);
    setModes(tempModes);
    setInputs(tempInputs);
  };

  const addNewSkill = () => {
    const tempArr = { ...componentsArray };
    const tempModes = { ...modes };
    const tempInputs = { ...inputs };
    const { inputSkillName } = inputs.skillsComponentInput;
    const skill = {
      id: uniqid(),
      textSkillName: inputSkillName
    };
    tempArr.skillsArray.push(skill);
    tempModes.skillsMode.isEdit = false;
    for (const property in tempInputs.skillsComponentInput) {
      tempInputs.skillsComponentInput[property] = '';
    }
    setComponenetsArray(tempArr);
    setModes(tempModes);
    setInputs(tempInputs);
  };

  const removeClickedTarget = (element, target, arrName) => {
    const index = Array.from(element.closest(`.${target}`).children).indexOf(
      element.parentNode
    );
    const tempArr = { ...componentsArray };
    tempArr[arrName].splice(index, 1);
    setComponenetsArray(tempArr);
  };

  return (
    <div>
      <nav>
        <button onClick={changeAppMode.bind(this, 'appMode', true)}>
          EDIT MODE
        </button>
        <button onClick={changeAppMode.bind(this, 'appMode', false)}>
          VIEW MODE
        </button>
      </nav>
      <div className="appContainer">
        <UserInfo
          modes={modes}
          inputs={inputs.userInfoComponentInput.inputUserInfo}
          textDisplay={textDisplay}
          changeInfoRowToEditMode={changeInfoRowToEditMode}
          handleInputChange={handleInputChange}
          handleUserInfoUpdateBtn={handleUserInfoUpdateBtn}
        />
        <hr />
        <WorkExperience
          modes={modes}
          componentsArray={componentsArray}
          workExperienceComponentInput={inputs.workExperienceComponentInput}
          handleInputChange={handleInputChange}
          changeComponentMode={changeComponentMode}
          addNewExperience={addNewExperience}
          removeClickedTarget={removeClickedTarget}
        />
        <hr />
        <Education
          modes={modes}
          componentsArray={componentsArray}
          educationComponentInput={inputs.educationComponentInput}
          handleInputChange={handleInputChange}
          changeComponentMode={changeComponentMode}
          addNewEducation={addNewEducation}
          removeClickedTarget={removeClickedTarget}
        />
        <hr />
        <Skills
          modes={modes}
          componentsArray={componentsArray}
          inputs={inputs.skillsComponentInput.inputSkillName}
          handleInputChange={handleInputChange}
          changeComponentMode={changeComponentMode}
          addNewSkill={addNewSkill}
          removeClickedTarget={removeClickedTarget}
        />
      </div>
    </div>
  );
};

export default App;
