import ValidityError from "../ValidityError/ValidityError";

interface TInputWrapper {
  status: boolean;
  children: React.ReactNode;
  text_error: string;
}

export default function InputWrapper({
  status,
  children,
  text_error
}: TInputWrapper) {
  return (
    <div>
      <div
        className={`px-3 py-2 bg-gray-200 rounded-lg ${
          status ? "border-1 border-red-500" : ""
        }`}
      >
        {children}
        {status && <ValidityError text={text_error} />}
      </div>
    </div>
  );
}
