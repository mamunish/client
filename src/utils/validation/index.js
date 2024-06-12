
export const Validate = (field_name, type, values) => {
    switch (type) {
        case "password":
            return validatePassword(field_name, values)
        case "username":
            return validateName(field_name, values)
        default:
            return null
    }

}

const validatePassword = (field_name, values) => {
    let errors = {};
    if (!values) {
        errors = "Password is required";
    } else {
        errors = "";
    }
    return errors;
};
const validateName = (field_name, values) => {
    let errors = {};
    if (!values) {
        errors = "Username is required";
    }else {
        errors = "";
    }
    return errors;
};
