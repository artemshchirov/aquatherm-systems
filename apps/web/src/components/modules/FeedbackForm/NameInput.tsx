import { IFeedbackInput } from '@/types/feedbackForm';
import styles from '@/styles/feedbackForm/index.module.scss';

const NameInput = ({ register, errors, darkModeClass }: IFeedbackInput) => (
  <label className={`${styles.feedback_form__form__label} ${darkModeClass}`}>
    <span>Name *</span>
    <input
      className={styles.feedback_form__form__input}
      type="text"
      placeholder="Lior"
      {...register('name', {
        required: 'Enter your name',
        pattern: {
          value: /^[а-яА-Яa-zA-ZёЁ]*$/,
          message: 'Invalid value',
        },
        minLength: 2,
        maxLength: 15,
      })}
    />
    {errors.name && <span className={styles.error_alert}>{errors.name?.message}</span>}
    {errors.name && errors.name.type === 'minLength' && (
      <span className={styles.error_alert}>Minimum 2 characters</span>
    )}
    {errors.name && errors.name.type === 'maxLength' && (
      <span className={styles.error_alert}>No more than 15 characters</span>
    )}
  </label>
);

export default NameInput;
