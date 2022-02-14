import dvr from 'mobx-react-form/lib/validators/DVR';
import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';
import { FormEvent } from 'react';
import { reaction } from 'mobx';

function getFormValidation(fields, successHandler = (form?: FormEvent) => null, errorHandler = () => null) {
  const hooks: any = {};

  const plugins: any = {
    dvr: dvr({
      package: validatorjs,
      extend: ({ validator }) => {
        const messages = validator.getMessages('en');
        messages.between = 'The :attribute length must be between :min and :max characters.';
        validator.setMessages('en', messages);
      },
    }),
  };

  const formOptions: any = {
    validateOnChange: true,
  };

  if (successHandler) {
    hooks.onSuccess = successHandler;
  }

  if (errorHandler) {
    hooks.onError = errorHandler;
  }

  hooks.onInit = (form: MobxReactForm) => {
    reaction(
      () => form.values(),
      () => form.validate(),
    );
  };

  return new MobxReactForm({ fields }, { plugins, hooks, formOptions });
}

export {
  getFormValidation,
};