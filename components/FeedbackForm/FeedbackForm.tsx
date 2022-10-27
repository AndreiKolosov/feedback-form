import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import styles from './FeedbackForm.module.css';
import { IFeedbackFormProps } from './FeedbackForm.props';
import { emailRegex, phoneRegex } from '../../utils/validation';
import Button from '../Button/Button';

export type TCalcCostFormData = {
  phone: string;
  email: string;
  requestMessage: string;
  humanCheck: boolean;
};

export const sendRequestToTelegram = async (data: TCalcCostFormData) => {
  const response = await fetch('/api/message', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data }),
  });
  const res = await response.json();
  return res;
};

const FeedbackForm: FC<IFeedbackFormProps> = ({ className, ...props }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TCalcCostFormData>();

  const [requestErr, setRequestErr] = useState<string>('');
  const router = useRouter();
  const path = router.asPath;

  const onChangeHandler = () => {
    setRequestErr('');
  };

  const onSubmit = async (data: TCalcCostFormData) => {
    try {
      const res = await sendRequestToTelegram(data);
      if (res.status === 'success') {
        reset();
        setRequestErr('');
        router.push(`${path.split('?')[0]}?modal=order-success`, undefined, { shallow: true });
      } else {
        setRequestErr('Произошла ошибка, попробуйте повторить запрос.');
      }
    } catch (error: any) {
      setRequestErr('Произошла ошибка, попробуйте повторить запрос.');
    }
  };

  return (
    <form className={`${styles.calcCostForm__form} ${className}`} onSubmit={handleSubmit(onSubmit)} {...props}>
      <h2 className={`${styles.calcCostForm__title}`}>Связаться со мной</h2>
      <fieldset className={styles.calcCostForm__fieldset}>
        <input
          className={`${styles.calcCostForm__input} ${styles.calcCostForm__input_phone}`}
          type='number'
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
        <span className={styles.calcCostForm__errorText}>{errors.phone?.message}</span>
        <input
          className={styles.calcCostForm__input}
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
        <span className={styles.calcCostForm__errorText}>{errors.email?.message}</span>
        <textarea
          className={styles.calcCostForm__textarea}
          maxLength={500}
          id='textarea'
          cols={30}
          rows={5}
          placeholder='Напишите свой свое сообщение'
          {...register('requestMessage', {
            required: 'Это поле обязательно.',
            onChange: onChangeHandler,
            maxLength: {
              value: 500,
              message: 'Максимальное количество символов: 500',
            },
          })}
        />
        <span className={styles.calcCostForm__errorText}>{errors.requestMessage?.message}</span>
        <div>
          <input
            id='humanCheck'
            type='checkbox'
            className={`${styles.calcCostForm__checkbox}`}
            {...register('humanCheck', {
              required: 'Это поле обязательно.',
            })}
          />
          <label htmlFor='humanCheck'>Я человек</label>
        </div>

        <span className={styles.calcCostForm__errorText}>{errors.humanCheck?.message}</span>
        <span className={styles.calcCostForm__errorText}>{requestErr}</span>
      </fieldset>
      <Button type='submit' variant='primary' size='m' fullWidth>Отправить сообщение</Button>
    </form>
  );
};

export default FeedbackForm;
