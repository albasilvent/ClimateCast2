import { TFunction } from 'i18next';
import { FormDataType } from '../types/types';

const validateForm = (
  formData: FormDataType,
  t: TFunction,
  language: string
) => {
  const errors: { [key: string]: string } = {};
  let valid = true;

  const patterns: { [key: string]: RegExp } = {
    name: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
    surname: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
    birthdateEs: /^([0-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/,
    birthdateEn: /^(0[1-9]|1[0-2])\/([0-2][0-9]|3[0-1])\/\d{4}$/,
    city: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[0-9]+$/,
  };

  const fieldRules: {
    [key: string]: { pattern?: RegExp; required?: boolean };
  } = {
    name: { pattern: patterns.name, required: true },
    surname: { pattern: patterns.surname, required: true },
    birthdate: {
      pattern: language === 'es' ? patterns.birthdateEs : patterns.birthdateEn,
      required: true,
    },
    city: { pattern: patterns.city, required: true },
    email: { pattern: patterns.email, required: true },
    phone: { pattern: patterns.phone, required: true },
  };

  Object.keys(fieldRules).forEach((field: string) => {
    const value = formData[field as keyof FormDataType] as string;
    const { pattern, required } = fieldRules[field];

    if (required && !value.trim()) {
      errors[field] = t('required');
      valid = false;
    } else if (pattern && !pattern.test(value)) {
      errors[field] = t('invalid');
      valid = false;
    }
  });

  return { valid, errors };
};

export default validateForm;
