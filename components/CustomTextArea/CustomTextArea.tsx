import { FC, forwardRef, LegacyRef } from 'react';
import cx from 'classnames';
import styles from './CustomTextArea.module.css'; 
import { ICustomTextAreaProps } from './CustomTextArea.props';

const CustomTextArea: FC<ICustomTextAreaProps> = forwardRef(({
  name,
  onChange,
  onBlur,
  placeholder,
  value,
  errors,
  rows,
  cols,
  maxLength,
  minLength,
  disabled,
  isValidated,
  inputExtraClass,
  className,
}, ref: LegacyRef<HTMLTextAreaElement>) => {
  return (
    <label htmlFor={`${name}TextArea`} className={cx(styles.wrapper, className)}>
      <textarea
        className={cx(styles.input, inputExtraClass)}
        id={`${name}TextArea`}
        value={value}
        name={name}
        ref={ref}
        maxLength={maxLength}
        minLength={minLength}
        cols={cols}
        rows={rows}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
      />
      {isValidated && <span className={styles.message}>{errors?.message}</span>}
    </label>
  );
});

CustomTextArea.displayName = 'CustomTextArea';

export default CustomTextArea;