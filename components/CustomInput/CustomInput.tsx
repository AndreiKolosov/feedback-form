import { FC, forwardRef, LegacyRef } from 'react';
import styles from './CustomInput.module.css'; 
import { ICustomInputProps } from './CustomInput.props';
import cx from 'classnames';

const CustomInput: FC<ICustomInputProps> = forwardRef(({
  name,
  onChange,
  onBlur,
  placeholder,
  type = 'text',
  value,
  errors,
  isValidated,
  inputExtraClass,
  className,
  ...props
}, ref: LegacyRef<HTMLInputElement>) => {
  return (
    <label htmlFor={name} className={cx(styles.wrapper, className)} {...props}>
      <input
        value={value}
        type={type}
        className={cx(styles.input, inputExtraClass, { [styles['input_type_number']]: type === 'number' })}
        ref={ref}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
      {isValidated && <span className={styles.message}>{errors?.message}</span>}
    </label>
  );
});

CustomInput.displayName = 'CustomInput';

export default CustomInput;
