import React, { useEffect } from 'react';
import './../styles/UserInfo.css';

const InfoRowForm = (props) => {
  const { info, inputs, handleInputChange, handleUserInfoUpdateBtn } = props;
  const handleFormInputValue = (e) => {
    handleInputChange(
      'userInfoComponentInput',
      'inputUserInfo',
      e.target.value
    );
  }
  const updateUserInfoOnUpdate = (e) => {
    e.preventDefault();
    handleUserInfoUpdateBtn( e.target);
  }
  return (
    <form datakey={info}>
      <input
        type="text"
        autoComplete="off"
        value={inputs}
        onChange={handleFormInputValue}
      ></input>
      <button type="submit" onClick={updateUserInfoOnUpdate}>
        Update
      </button>
    </form>
  );
};

const InfoRow = (props, e) => {
  const {
    modes,
    inputs,
    changeInfoRowToEditMode,
    handleInputChange,
    handleUserInfoUpdateBtn,
    value,
    info
  } = props;

  useEffect(() => {
    
  }, [modes])

  let element;
  if (modes.appMode.isEdit) {
    if (value.isEdit) {
      element = (
        <InfoRowForm
          inputs={inputs}
          info={info}
          handleInputChange={handleInputChange}
          handleUserInfoUpdateBtn={handleUserInfoUpdateBtn}
        />
      );
    } else {
      element = (
        <li datakey={info}>
          {value.text} <span onClick={changeInfoRowToEditMode.bind(e)}>✎</span>
        </li>
      );
    }
  } else {
    element = <li>{value.text}</li>;
  }
  return element;
};

const ExtendedUserInfo = (props) => {
  const {
    modes,
    inputs,
    userInfoText,
    changeInfoRowToEditMode,
    handleInputChange,
    handleUserInfoUpdateBtn
  } = props;

  const rows = [];
  let element;

  for (const [info, value] of Object.entries(userInfoText)) {
    if (info === 'textFirstName' || info === 'textLastName') {
      continue;
    } else {
      element = (
        <InfoRow
          key={value.id}
          value={value}
          info={info}
          modes={modes}
          inputs={inputs}
          changeInfoRowToEditMode={changeInfoRowToEditMode}
          handleInputChange={handleInputChange}
          handleUserInfoUpdateBtn={handleUserInfoUpdateBtn}
        />
      );
      rows.push(element);
    }
  }
  return (
    <div className="col colRight">
      <ul>{rows}</ul>
    </div>
  );
};

const BasicUserInfo = (props) => {
  const {
    modes,
    inputs,
    userInfoText,
    changeInfoRowToEditMode,
    handleInputChange,
    handleUserInfoUpdateBtn
  } = props;

  const rows = [];
  let el;
  for (const [info, value] of Object.entries(userInfoText)) {
    if (info === 'textFirstName' || info === 'textLastName') {
      el = (
        <InfoRow
          key={value.id}
          value={value}
          info={info}
          modes={modes}
          inputs={inputs}
          changeInfoRowToEditMode={changeInfoRowToEditMode}
          handleInputChange={handleInputChange}
          handleUserInfoUpdateBtn={handleUserInfoUpdateBtn}
        />
      );
      rows.push(el);
    }
  }

  return (
    <div className="col colLeft">
      <ul>{rows}</ul>
    </div>
  );
};

const UserInfo = (props) => {
  const {
    modes,
    inputs,
    textDisplay,
    changeInfoRowToEditMode,
    handleInputChange,
    handleUserInfoUpdateBtn
  } = props;

  return (
    <div className="container userInfo">
      <BasicUserInfo
        modes={modes}
        inputs={inputs}
        userInfoText={textDisplay.textUserInfoComponent}
        changeInfoRowToEditMode={changeInfoRowToEditMode}
        handleInputChange={handleInputChange}
        handleUserInfoUpdateBtn={handleUserInfoUpdateBtn}
      />
      <ExtendedUserInfo
        modes={modes}
        inputs={inputs}
        userInfoText={textDisplay.textUserInfoComponent}
        changeInfoRowToEditMode={changeInfoRowToEditMode}
        handleInputChange={handleInputChange}
        handleUserInfoUpdateBtn={handleUserInfoUpdateBtn}
      />
    </div>
  );
};

export default UserInfo;
