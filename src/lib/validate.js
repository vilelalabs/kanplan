export default function login_validate(values) {
    const errors = {};

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    //validation for password
    if (!values.password) {
        errors.password = "Required";
    } else if (values.password.length < 8 || values.password.length > 20) {
        errors.password = "Password must be between 8 to 20 characters long"
    } else if (values.password.includes(" ")) {
        errors.password = "Password cannot contain spaces"
    }
    return errors;
}

export function registerValidate(values) {
    const errors = {};

    //validation for username
    if (!values.username) {
        errors.username = "Required";
    } else if (values.username.length < 3 || values.username.length > 20) {
        errors.username = "Username must be between 3 to 20 characters long"
    } else if (values.username.includes(" ")) {
        errors.username = "Username cannot contain spaces"
    }

    //validation for email
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    //validation for password
    if (!values.password) {
        errors.password = "Required";
    } else if (values.password.length < 8 || values.password.length > 20) {
        errors.password = "Password must be between 8 to 20 characters long"
    } else if (values.password.includes(" ")) {
        errors.password = "Password cannot contain spaces"
    }

    //validation for password
    if (!values.cpassword) {
        errors.cpassword = "Required";
    } else if (values.cpassword !== values.password) {
        errors.cpassword = "Passwords do not match!"
    }

    return errors;
}