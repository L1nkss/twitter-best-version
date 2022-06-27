import { FC } from 'react';

import { FormInputProps } from '@shared/ui/form-input/models/intefaces/Form-input.interface';

const FormInput: FC<FormInputProps> = ({id, type = 'text', onChangeHandler}) => {
  return (
    <div>
      <label
        htmlFor={ id }
        className="block mb-1 text-gray-600 font-semibold"
      >
        Email
      </label>
      <input
        id={ id }
        type={ type }
        className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
        onChange={ onChangeHandler }
      />
    </div>
  )
}

export { FormInput }