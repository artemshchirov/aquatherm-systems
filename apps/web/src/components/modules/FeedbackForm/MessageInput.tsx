import { IFeedbackInput } from '@/types/feedbackForm';
import styles from '@/styles/feedbackForm/index.module.scss';

const MessageInput = ({ register, errors, darkModeClass }: IFeedbackInput) => (
  <label className={`${styles.feedback_form__form__label} ${darkModeClass}`}>
    <textarea
      className={`${styles.feedback_form__form__textarea} ${darkModeClass}`}
      placeholder="Enter your message (20 to 300 characters)"
      {...register('message', {
        required: 'Enter your message',
        minLength: 20,
        maxLength: 300,
      })}
    />
    {errors.message && <span className={styles.error_alert}>{errors.message?.message}</span>}
    {errors.message && errors.message.type === 'minLength' && (
      <span className={styles.error_alert}>Minimum 20 characters</span>
    )}
    {errors.message && errors.message.type === 'maxLength' && (
      <span className={styles.error_alert}>No more than 300 characters</span>
    )}
  </label>
);

export default MessageInput;
