import { FC, forwardRef, LegacyRef } from 'react';
import styles from './CustomCheckbox.module.css'; 
import cx from 'classnames';
import { ICustomCheckboxProps } from './CustomCheckbox.props';

const CustomCheckbox: FC<ICustomCheckboxProps> = forwardRef(({
  name,
  onChange,
  onBlur,
  placeholder,
  disabled,
  value,
  errors,
  inputExtraClass,
  isValidated,
  children,
  className,
}, ref: LegacyRef<HTMLInputElement>) => {
  return (
    <label htmlFor={`${name}Input`} className={cx(styles.wrapper, className)}>
      <input
        value={value}
        disabled={disabled}
        type='checkbox'
        className={cx(styles.input, inputExtraClass)}
        ref={ref}
        name={name}
        id={`${name}Input`}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
      <span className={styles.input__text}>{children}</span>
      {isValidated && <span className={styles.message}>{errors?.message}</span>}
    </label>
  );
});

CustomCheckbox.displayName = 'CustomCheckbox';

export default CustomCheckbox;
