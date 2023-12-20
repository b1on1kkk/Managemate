import React from "react";

export default function Input({
  maxInputLength,
  styles,
  cb,
  value,
  placeholder
}: {
  maxInputLength: number;
  styles: string;
  value: string;
  cb: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) {
  //   console.log(maxInputLength);

  return (
    <input
      type="text"
      placeholder={placeholder}
      maxLength={maxInputLength}
      className={styles}
      onChange={(e) => cb(e)}
      value={value}
    />
  );
}
