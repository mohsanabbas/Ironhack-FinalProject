export const validate = (element, formdata = []) => {
    let error = [true, ''];
    // email validation 
    if (element.validation.email) {
        let regEx =/\S+@\S+\.\S+/
        const valid = regEx.test(element.value);
        const message = `${!valid ? 'This must be a valid email' :''}`;
        error = !valid ? [valid, message] : error;

    }


    if (element.validation.required) {
        const valid = element.value.trim() !== '';
        const message = `${!valid ? 'This field is required' :''}`;
        error = !valid ? [valid, message] : error;

    }
    return error
}
//update function exporting to login
export const update = (element, formdata, formName) => {
    const newFormdata = { ...formdata
    };
    const newElement = { ...newFormdata[element.id]
    };
    newElement.value = element.event.target.value;
    if (element.blur) {
        let validData = validate(newElement, formdata);
        newElement.valid = validData[0]
        newElement.validationMessage = validData[1];
    }

    newElement.touched = element.blur;
    newFormdata[element.id] = newElement;
    return newFormdata;
}
// generateData func exporting to login component
export const generateData = (formdata, formName) => {
    let dataToSubmit = {}
    for (let key in formdata) {
        dataToSubmit[key] = formdata[key].value;
    }
    return dataToSubmit;
}

export const isFormValid = (formdata, formName) => {

let formIsValid = true;
    for (let key in formdata) {
        formIsValid= formdata[key].valid && formIsValid;
    }
    return formIsValid;
}