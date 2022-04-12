let code = '';
function randomCode() {let len = 8;
    for(let j = 0; j < len; ++j) {
        code += Math.floor(Math.random() * (10 - 0) + 0); // Appends a number from 0-9 
    }
    return code;
}

module.exports = randomCode;