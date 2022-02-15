import React, { Component } from 'react';
import { observer } from "mobx-react";
import { observable } from "mobx";
import { getReactFormValidation } from './Validation/CustomFormValidation';
import MobxReactForm, { Field } from 'mobx-react-form';

const fields: Field[] = [{
  name: 'email',
  label: 'Email',
  placeholder: 'Insert Email',
  rules: 'required|email|string|between:5,25',
}
  , {
  name: 'password',
  label: 'Password',
  placeholder: 'Insert Password',
  rules: 'required|string|between:5,25',
}];



@observer
class App extends Component {
  @observable form: MobxReactForm = getReactFormValidation(fields, () => null)

  onSubmit = (e): void => {
    e.preventDefault();
    this.form.submit({
      onSuccess: () => {
        alert("successfull");
      },
      onError: error => console.log(error),
    });
  };

  render() {
    return (
      <form>
        <label>
          {this.form.$('email').label}
        </label>
        <input {...this.form.$('email').bind()} />
        <p style={{ color: 'red' }}>{this.form.$('email').error}</p>
        <label>
          {this.form.$('password').label}
        </label>
        <input {...this.form.$('password').bind()} />
        <p style={{ color: 'red' }}>{this.form.$('password').error}</p>
        <button type="submit" onClick={(e) => this.onSubmit(e)}>Submit</button>
        <p>{this.form.error}</p>
      </form>
    );
  }
}

export default App;
