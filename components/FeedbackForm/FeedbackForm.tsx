import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './FeedbackForm.module.css';
import { IFeedbackFormProps } from './FeedbackForm.props';
import { emailRegex, phoneRegex } from '../../utils/validation';
import Button from '../Button/Button';
import { TCalcCostFormData } from '../../types/feedbackForm.types';
import { sendRequestToTelegram } from '../../services/api/telegramApiService';
import CustomInput from '../CustomInput/CustomInput';
import CustomTextArea from '../CustomTextArea/CustomTextArea';


const FeedbackForm: FC<IFeedbackFormProps> = ({ className, ...props }) => {
  const [requestErr, setRequestErr] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TCalcCostFormData>();

  const onChangeHandler = () => {
    setRequestErr('');
  };

  const onSubmit = async (data: TCalcCostFormData) => {
    try {
      const res = await sendRequestToTelegram(data);
      if (res.status === 'success') {
        reset();
        setRequestErr('');
      } else {
        setRequestErr('Произошла ошибка, попробуйте повторить запрос.');
      }
    } catch (error: any) {
      setRequestErr('Произошла ошибка, попробуйте повторить запрос.');
    }
  };

  return (
    <form className={`${styles.form} ${className}`} onSubmit={handleSubmit(onSubmit)} {...props}>
      <legend className={`${styles.form__legend}`}>Связаться со мной</legend>
      <fieldset className={styles.form__container}>
        <CustomInput
          type='number'
          errors={errors.phone}
          isValidated
          placeholder='Контактный телефон'
          {...register('phone', {
            required: 'Это поле обязательно.',
            onChange: onChangeHandler,
            pattern: {
              value: phoneRegex,
              message: 'Введите корректный номер телефона.',
            },
          })}
        />
        <CustomInput
          isValidated
          errors={errors.email}
          type='text'
          placeholder='Электронная почта'
          {...register('email', {
            required: 'Это поле обязательно.',
            onChange: onChangeHandler,
            pattern: {
              value: emailRegex,
              message: 'Введите корректный email.',
            },
          })}
        />
        <CustomTextArea
          errors={errors.requestMessage}
          maxLength={500}
          isValidated
          cols={30}
          rows={5}
          placeholder='Напишите свое сообщение'
          {...register('requestMessage', {
            required: 'Это поле обязательно.',
            onChange: onChangeHandler,
            maxLength: {
              value: 500,
              message: 'Максимальное количество символов: 500',
            },
          })}
        />
        <label htmlFor='humanCheck'>
          <input
            id='humanCheck'
            type='checkbox'
            className={`${styles.form__checkbox}`}
            {...register('humanCheck', {
              required: 'Это поле обязательно.',
            })}
          />
          Я человек
        </label>

        <span className={styles.form__errorText}>{errors.humanCheck?.message}</span>
        <span className={styles.form__errorText}>{requestErr}</span>
      </fieldset>
      <Button type='submit' variant='primary' size='m' fullWidth>
        Отправить сообщение
      </Button>
    </form>
  );
};

export default FeedbackForm;
