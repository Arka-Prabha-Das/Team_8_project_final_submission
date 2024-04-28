const validateEmail = (email) => {
    // Regular expression for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  const validatePassword = (password) => {
    // Password must be at least 8 characters long
    return password.length >= 8;
  };
  
  const validateFullName = (name) => {
    // Full name must not be empty
    return name.trim() !== "";
  };
  
  const validateRole = (role) => {
    // Role must be selected
    return role !== "";
  };
  
  const validateForm = (formData, isLogin) => {
    const { name, email, password, role } = formData;
    const errors = {};
  
    if (!validateEmail(email)) {
      errors.email = "Invalid email address";
    }
  
    if (!validatePassword(password)) {
      errors.password = "Password must be at least 8 characters long";
    }
  
    if (!isLogin && !validateFullName(name)) {
      errors.fullName = "Full name is required";
    }
  
    if (!isLogin && !validateRole(role)) {
      errors.role = "Please select a role";
    }
  
    return errors;
  };
  
  export default validateForm;