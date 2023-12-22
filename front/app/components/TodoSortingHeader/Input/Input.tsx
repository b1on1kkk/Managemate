export default function Input({
  maxInputLength,
  styles,
  cb,
  value,
  placeholder,
  onBlur
}: {
  maxInputLength: number;
  styles: string;
  value: string;
  cb: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      maxLength={maxInputLength}
      className={styles}
      onChange={(e) => cb(e)}
      value={value}
      onBlur={onBlur}
    />
  );
}
