export const validate = (element, formdata = []) => {
    let error = [true, ''];
    // email validation 
    if (element.validation.email) {
        let regEx = /\S+@\S+\.\S+/
        const valid = regEx.test(element.value);
        const message = `${!valid ? 'This must be a valid email' :''}`;
        error = !valid ? [valid, message] : error;

    }
    // verify password validation
    if (element.validation.confirm) {
        const valid = element.value.trim() === formdata[element.validation.confirm].value;
        const message = `${!valid ? 'Password do not match' :''}`;
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
        if (key !== 'confirmPassword') {

            dataToSubmit[key] = formdata[key].value;
        }
    }
    return dataToSubmit;
}

export const isFormValid = (formdata, formName) => {

    let formIsValid = true;
    for (let key in formdata) {
        formIsValid = formdata[key].valid && formIsValid;
    }
    return formIsValid;
}

export const populateOptionFields = (formdata, arrayData = [], field) => {
    const newArray = [];
    const newFormdata = { ...formdata
    };

    arrayData.forEach(item => {
        newArray.push({
            key: item._id,
            value: item.name
        });
    });

    newFormdata[field].config.options = newArray;
    return newFormdata;
}

export const resetFields = (formdata, formName) => {
    const newFormdata = { ...formdata
    };

    for (let key in newFormdata) {
        if (key === 'images') {
            newFormdata[key].value = [];
        } else {
            newFormdata[key].value = '';
        }

        newFormdata[key].valid = false;
        newFormdata[key].touched = false;
        newFormdata[key].validationMessage = '';
    }

    return newFormdata
}