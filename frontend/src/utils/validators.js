// Shared form validation helpers
export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidPhone = (phone) => /^[0-9]{10}$/.test(phone.replace(/\D/g, ''));

export const validateRegisterForm = (form) => {
  const errors = {};
  if (!form.fullName || form.fullName.trim().length < 2) errors.fullName = 'Full name is required';
  if (!isValidEmail(form.email)) errors.email = 'Enter a valid email address';
  if (!isValidPhone(form.phone)) errors.phone = 'Enter a valid 10-digit phone number';
  if (!form.password || form.password.length < 6) errors.password = 'Password must be at least 6 characters';
  if (form.password !== form.confirmPassword) errors.confirmPassword = 'Passwords do not match';
  return errors;
};

export const validateLoginForm = (form) => {
  const errors = {};
  if (!isValidEmail(form.email)) errors.email = 'Enter a valid email address';
  if (!form.password) errors.password = 'Password is required';
  return errors;
};
