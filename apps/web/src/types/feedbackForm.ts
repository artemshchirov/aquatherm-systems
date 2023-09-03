import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form';

export type FeedbackInputs = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

export interface IFeedbackInput {
  register: UseFormRegister<FeedbackInputs>;
  errors: Productial<FieldErrorsImpl<FeedbackInputs>>;
  darkModeClass?: string;
}
