import storageAPI from './storage.js';
import throttle from 'lodash.throttle';

const formFields = document.querySelector('.feedback-form');

let dataObj = {};

const fillFormFields = () => {
    const dataObjFromLS = storageAPI.load("formInfo");
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

const onFormFieldsChange = ({ target }) => {
    const formFieldValue = target.value;
    const formFieldName = target.name;
    dataObj[formFieldName] = formFieldValue;
    storageAPI.save("formInfo", dataObj);
    console.log(dataObj);

};

const onFormSubmit = event => {
    event.preventDefault();
    formFields.reset();
    console.log(storageAPI.load("formInfo"));
    localStorage.removeItem('formInfo');
}
formFields.addEventListener('input', throttle(onFormFieldsChange, 500));


formFields.addEventListener('submit', onFormSubmit);