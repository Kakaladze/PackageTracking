/* eslint-disable no-useless-escape */
module.exports.validateLogin = (login) => {
    const loginRegex = /^[a-zA-Z0-9\_\.\-]+$/;
    return loginRegex.test(login);
};
module.exports.validateEmail = (email) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email.toLowerCase());
};
module.exports.validateName = (name) => {
    const nameRegex = /^[A-Za-z\-\u00C0-\u1FFF\u2800-\uFFFD]+$/;
    return nameRegex.test(name);
};
