import { FC, useState } from 'react';
import cn from 'classnames'
import { useForm } from 'react-hook-form';
import styles from './FeedbackForm.module.css';
import { IFeedbackFormProps } from './FeedbackForm.props';
import { emailRegex, phoneRegex } from '../../utils/validation';
import Button from '../Button/Button';
import { TFormData } from '../../types/feedbackForm.types';
import { sendRequestToTelegram } from '../../services/api/telegramApiService';
import CustomInput from '../CustomInput/CustomInput';
import CustomTextArea from '../CustomTextArea/CustomTextArea';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';

const FeedbackForm: FC<IFeedbackFormProps> = ({ className, ...props }) => {
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TFormData>();

  const onChangeHandler = () => {
    setResponseMessage('');
  };

  const onSubmit = async (data: TFormData) => {
    try {
      const res = await sendRequestToTelegram(data);
      if (res.status === 'success') {
        reset();
        setIsFailed(false);
        setResponseMessage('Ваше сообщение успешно отправлено!');
      } else {
        setIsFailed(true);
        setResponseMessage('Произошла ошибка, попробуйте повторить запрос.');
      }
    } catch (error: any) {
      setResponseMessage('Произошла ошибка, попробуйте повторить запрос.');
    }
  };

  return (
    <form className={cn(styles.form, className)} onSubmit={handleSubmit(onSubmit)} {...props}>
      <legend className={`${styles.form__legend}`}>Связаться со мной</legend>
      <fieldset className={styles.form__container}>
        <CustomInput
          type='number'
          errors={errors.phone}
          isValidated
          placeholder='Контактный телефон'
          {...register('phone', {
            required: 'Это поле необходимо заполнить.',
            onChange: onChangeHandler,
            pattern: {
              value: phoneRegex,
              message: 'Пожалуйста, введите корректный номер телефона.',
            },
          })}
        />
        <CustomInput
          isValidated
          errors={errors.email}
          type='text'
          placeholder='Электронная почта'
          {...register('email', {
            required: 'Это поле необходимо заполнить.',
            onChange: onChangeHandler,
            pattern: {
              value: emailRegex,
              message: 'Пожалуйста, введите корректный email.',
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
            required: 'Это поле необходимо заполнить.',
            onChange: onChangeHandler,
            maxLength: {
              value: 500,
              message: 'Максимальное количество символов: 500',
            },
          })}
        />
        <CustomCheckbox
          isValidated
          errors={errors.humanCheck}
          {...register('humanCheck', {
            required: 'Поставьте галочку если вы не робот = )',
          })}
        >
          Я человек
        </CustomCheckbox>
        <span className={cn(styles.form__responseMessage, { [styles.form__responseMessage_err]: isFailed })}>{responseMessage}</span>
      </fieldset>
      <Button type='submit' variant='primary' size='m' fullWidth>
        Отправить сообщение
      </Button>
    </form>
  );
};

export default FeedbackForm;
