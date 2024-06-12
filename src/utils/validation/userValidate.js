/**
 TODO: 
 - Initialise with proper value. The final value of the errors is an object. so initialise as an object
 - Always use default parameter values to avoid null conditions
 - In all funcitons  `if (!values)` condition is explicitly mentioned. which is already handled in `validateNULL`. Use that function instead
*/
export const ValidateUser = (field_name, type, values) => {
    switch (type) {
        case "email":
            return validateEmail(field_name, values)
        case "password":
            return validatePassword(field_name, values)
        case "username":
            return validateUserName(field_name, values)
        case "first_name":
            return validateFirstName(field_name, values)
        case "last_name":
            return validateLastName(field_name, values)
        default:
            return null
    }

}
const validateFirstName = (field_name, value) => {
    let errors = {};
    if (!value) {
        errors = "Firstname is required";
    }
    else if (value.length < 3) {
        errors = "Minimum 3 charecters required";
    }
    else if (!/^[ a-zA-Z0-9.,'-]*$/.test(value)) {
        errors = "Invalid";
    }
    else {
        errors = "";
    }
    return errors;
}

const validateLastName = (field_name, value) => {
    let errors = {};
    if (!value) {
        errors = "Lastname is required";
    }
    else if (value.length < 3) {
        errors = "Minimum 2 charecters required";
    }
    else if (!/^[ a-zA-Z0-9.,'-]*$/.test(value)) {
        errors = "Invalid";
    }
    else {
        errors = "";
    }
    return errors;
}

const validateUserName = (field_name, value) => {
    let errors = {};
    if (!value) {
        errors = "Username is required";
    }
    else if (value.length < 3) {
        errors = "Minimum 3 charecters required";
    }
    else if (!/^[ a-zA-Z0-9.,'-]*$/.test(value)) {
        errors = "Invalid";
    }
    else {
        errors = "";
    }
    return errors;
}
const validateEmail = (field_name, values) => {
    let errors = {};
    if (!values) {
        errors = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(values)) {
        errors = "Email address is invalid";
    }
    else {
        errors = "";
    }
    return errors;
};

const validatePassword = (field_name, values) => {
    let errors = {};
    if (!values) {
        errors = "Password is required";

    } else if (values.length <= 5) {
        errors = "Password is too short";
    } else {
        errors = "";
    }
    return errors;
};
