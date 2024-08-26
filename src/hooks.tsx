import { useState, ChangeEvent, FormEvent } from "react";


interface FormValues {
  [key: string]: string;
}


interface ValidationRules {
  [key: string]: {
    required?: string;
  };
}


interface Errors {
  [key: string]: string;
}

export const useForm = () => {
  const [values, setValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<Errors>({});
  const rules: ValidationRules = {};


  const handleSubmit = (call: (values: FormValues) => void) => (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newErrors: Errors = {};

    Object.keys(rules).forEach(key => {
      if (rules[key].required && !values[key]?.trim()) {
        newErrors[key] = rules[key].required!;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      call(values);
    }
  };

  const register = (key: string, options: { required?: string } = {}) => {
    rules[key] = options;
    return {
      value: values[key] || '',
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setValues(elm => ({ ...elm, [key]: e.target.value })),
    };
  };

  return { handleSubmit, register, errors };
};
