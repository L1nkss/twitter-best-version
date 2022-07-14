type InputTypes = 'text' | 'password'

export interface FormInputProps {
  id: string;
  label: string;
  type?: InputTypes;
  onChangeHandler: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}