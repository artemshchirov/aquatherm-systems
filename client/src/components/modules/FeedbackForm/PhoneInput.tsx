import { IFeedbackInput } from '@/types/feedbackForm'
import styles from '@/styles/feedbackForm/index.module.scss'

const PhoneInput = ({ register, errors, darkModeClass }: IFeedbackInput) => (
  <label className={`${styles.feedback_form__form__label} ${darkModeClass}`}>
    <span>Телефон *</span>
    <input
      className={styles.feedback_form__form__input}
      placeholder="0584441705"
      type="tel"
      {...register('phone', {
        required: 'Enter phone number',
        pattern: {
          value: /^\d*[1-9]\d*$/,
          message: 'Invalid value',
        },
        minLength: 10,
        maxLength: 13,
      })}
    />
    {errors.phone && (
      <span className={styles.error_alert}>{errors.phone?.message}</span>
    )}
    {errors.phone && errors.phone.type === 'minLength' && (
      <span className={styles.error_alert}>Minimum 10 digit</span>
    )}
    {errors.phone && errors.phone.type === 'maxLength' && (
      <span className={styles.error_alert}>No more than 13 digits</span>
    )}
  </label>
)

export default PhoneInput
