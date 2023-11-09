import storageAPI from './storage.js';
import throttle from 'lodash.throttle';

const formFields = document.querySelector('.feedback-form');



const fillFormFields = () => {
    const dataObjFromLS = storageAPI.load("formInfo") || {};
    if (dataObjFromLS === undefined) {
        return;
    }



    // formFields.elements.email.value = dataObjFromLS.email;
    // formFields.elements.message.value = dataObjFromLS.message;


    for (const key in dataObjFromLS) {
        if (dataObjFromLS.hasOwnProperty(key)) {
            formFields.elements[key].value = dataObjFromLS[key];
        }
    }

}
fillFormFields();

const onFormFieldsInput = ({ target }) => {
    const dataObj = {};
    const formData = new FormData(formFields);

    formData.forEach((value, key) => {
        dataObj[key] = value;
    });

    storageAPI.save("formInfo", dataObj);
};


const onFormSubmit = event => {
    event.preventDefault();
    formFields.reset();
    console.log(storageAPI.load("formInfo"));
    localStorage.removeItem('formInfo');
}
formFields.addEventListener('input', throttle(onFormFieldsInput, 500));


formFields.addEventListener('submit', onFormSubmit);