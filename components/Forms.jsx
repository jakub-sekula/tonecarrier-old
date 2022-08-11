import { useState } from "react";

export const FormInput = ({type, label, form, handleChange}) => {
    const [state, setState] = useState('')

  return (
    <div className="flex flex-col w-full">
      <label className="form_field_label w-full" htmlFor={label}>
        {label}
      </label>
      <input
        value={state}
        onChange={handleChange}
        type={type}
        name={label}
        className="form_field w-full"
        form={form}
      />
    </div>
  );
};
