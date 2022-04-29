import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import './../styles/Skills.css';

const SkillList = (props) => {
  const { modes, skill, target, arrName } = props;
  const removeClickedTarget = (e) =>
    props.removeClickedTarget(e.target, target, arrName);
  let removeBtn;
  if (!modes.appMode.isEdit) {
    removeBtn = null;
  } else {
    removeBtn = (
      <span onClick={removeClickedTarget} className="redX">
        X
      </span>
    );
  }
  return (
    <li className="skill">
      <span>{skill.textSkillName}</span> {removeBtn}
    </li>
  );
};

const AddSkillForm = (props) => {
  const handleInputChange = (e) => {
    let target = e.target.name;
    let inputText = e.target.value;
    props.handleInputChange(props.componentInputName, target, inputText);
  };
  const addNewSkill = (e) => {
    e.preventDefault();
    props.addNewSkill();
  };

  const formRef = useRef();
  const formEle = gsap.utils.selector(formRef);
  useEffect(() => {
    gsap.fromTo(formEle('input'), { scaleX: 0 }, { scaleX: 1, duration: .5 });
  }, []);

  return (
    <form ref={formRef}>
      <input
        type="text"
        autoComplete="off"
        name="inputSkillName"
        value={props.inputs}
        onChange={handleInputChange}
      ></input>
      <button type="submit" onClick={addNewSkill}>
        Add
      </button>
    </form>
  );
};

const AddSkillBtn = (props) => {
  const changeComponentMode = () =>
    props.changeComponentMode(props.componentModeName, true);

  return <button onClick={changeComponentMode}>+ Skill</button>;
};

const Skills = (props) => {
  const { modes, componentsArray, inputs } = props;
  const componentModeName = 'skillsMode';
  const componentInputName = 'skillsComponentInput';
  const arrName = 'skillsArray';
  const target = 'skillsContainer';

  const changeComponentMode = (component, boolean) => {
    props.changeComponentMode(component, boolean);
  };
  const addNewSkill = () => props.addNewSkill();
  const handleInputChange = (component, componentProp, inputText) =>
    props.handleInputChange(component, componentProp, inputText);
  const removeClickedTarget = (element, target, arr) =>
    props.removeClickedTarget(element, target, arr);

  const skillsArray = componentsArray.skillsArray;
  const rows = skillsArray.map((skill) => (
    <SkillList
      modes={modes}
      target={target}
      arrName={arrName}
      skill={skill}
      key={skill.id}
      removeClickedTarget={removeClickedTarget}
    />
  ));
  let element;
  if (!modes.appMode.isEdit) {
    element = null;
  }
  if (modes.appMode.isEdit && !modes.skillsMode.isEdit) {
    element = (
      <AddSkillBtn
        componentModeName={componentModeName}
        changeComponentMode={changeComponentMode}
      />
    );
  }
  if (modes.appMode.isEdit && modes.skillsMode.isEdit) {
    element = (
      <AddSkillForm
        inputs={inputs}
        componentModeName={componentModeName}
        componentInputName={componentInputName}
        handleInputChange={handleInputChange}
        addNewSkill={addNewSkill}
      />
    );
  }
  return (
    <div className="container skills">
      <h2>Skills</h2>
      <ul className={target}>{rows}</ul>
      {element}
    </div>
  );
};

export default Skills;
