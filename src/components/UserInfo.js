import React, { Component } from 'react';
import './../styles/UserInfo.css';

class InfoRowForm extends Component {
  handleInputChange = (e) => {
    this.props.handleInputChange(
      'userInfoComponentInput',
      'inputUserInfo',
      e.target.value
    );
  };
  handleUserInfoUpdateBtn = (e) => {
    e.preventDefault();
    this.props.handleUserInfoUpdateBtn( e.target);
  };
  render() {
    return (
      <form datakey={this.props.info}>
        <input
          type="text"
          autoComplete="off"
          value={this.props.inputs}
          onChange={this.handleInputChange}
        ></input>
        <button type="submit" onClick={this.handleUserInfoUpdateBtn}>
          Update
        </button>
      </form>
    );
  }
}

class InfoRow extends Component {
  changeInfoRowToEditMode = (e) => this.props.changeInfoRowToEditMode(e.target);
  handleInputChange = (component, componentProp, inputText) =>
    this.props.handleInputChange(component, componentProp, inputText);
  handleUserInfoUpdateBtn = (element) =>
    this.props.handleUserInfoUpdateBtn(element);
  render() {
    const { modes, info, value, inputs } = this.props;
    let element;
    if (modes.appMode.isEdit) {
      if (value.isEdit) {
        element = (
          <InfoRowForm
            inputs={inputs}
            info={info}
            handleInputChange={this.handleInputChange}
            handleUserInfoUpdateBtn={this.handleUserInfoUpdateBtn}
          />
        );
      } else {
        element = (
          <li datakey={info}>
            {value.text} <span onClick={this.changeInfoRowToEditMode}>✎</span>
          </li>
        );
      }
    } else {
      element = <li>{value.text}</li>;
    }
    return element;
  }
}

class BasicUserInfo extends Component {
  changeInfoRowToEditMode = (element) =>
    this.props.changeInfoRowToEditMode(element);
  handleInputChange = (component, componentProp, inputText) =>
    this.props.handleInputChange(component, componentProp, inputText);
  handleUserInfoUpdateBtn = (element) =>
    this.props.handleUserInfoUpdateBtn(element);
  render() {
    const { modes, inputs, userInfoText } = this.props;
    const rows = [];
    let element;
    for (const [info, value] of Object.entries(userInfoText)) {
      if (info === 'textFirstName' || info === 'textLastName') {
        element = (
          <InfoRow
            key={value.id}
            value={value}
            info={info}
            modes={modes}
            inputs={inputs}
            changeInfoRowToEditMode={this.changeInfoRowToEditMode}
            handleInputChange={this.handleInputChange}
            handleUserInfoUpdateBtn={this.handleUserInfoUpdateBtn}
          />
        );
        rows.push(element);
      }
    }
    return (
      <div className='col colLeft'>
        <ul>{rows}</ul>
      </div>
    );
  }
}

class ExtendedUserInfo extends Component {
  changeInfoRowToEditMode = (element) =>
    this.props.changeInfoRowToEditMode(element);
  handleInputChange = (component, componentProp, inputText) =>
    this.props.handleInputChange(component, componentProp, inputText);
  handleUserInfoUpdateBtn = (element) =>
    this.props.handleUserInfoUpdateBtn(element);
  render() {
    const { modes, inputs, userInfoText } = this.props;
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
            changeInfoRowToEditMode={this.changeInfoRowToEditMode}
            handleInputChange={this.handleInputChange}
            handleUserInfoUpdateBtn={this.handleUserInfoUpdateBtn}
          />
        );
        rows.push(element);
      }
    }
    return (
      <div className='col colRight'>
        <ul>{rows}</ul>
      </div>
    );
  }
}

class UserInfo extends Component {
  changeInfoRowToEditMode = (element) =>
    this.props.changeInfoRowToEditMode(element);
  handleInputChange = (component, componentProp, inputText) =>
    this.props.handleInputChange(component, componentProp, inputText);
  handleUserInfoUpdateBtn = (element) =>
    this.props.handleUserInfoUpdateBtn(element);
  render() {
    const { modes, inputs, textDisplay } = this.props;

    return (
      <div className="container userInfo">
        <BasicUserInfo
          modes={modes}
          inputs={inputs}
          userInfoText={textDisplay.textUserInfoComponent}
          changeInfoRowToEditMode={this.changeInfoRowToEditMode}
          handleInputChange={this.handleInputChange}
          handleUserInfoUpdateBtn={this.handleUserInfoUpdateBtn}
        />
        <ExtendedUserInfo
          modes={modes}
          inputs={inputs}
          userInfoText={textDisplay.textUserInfoComponent}
          changeInfoRowToEditMode={this.changeInfoRowToEditMode}
          handleInputChange={this.handleInputChange}
          handleUserInfoUpdateBtn={this.handleUserInfoUpdateBtn}
        />
      </div>
    );
  }
}

export default UserInfo;
