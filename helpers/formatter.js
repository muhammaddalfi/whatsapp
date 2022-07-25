const phoneNumberFormatter = function(number){
// remove character except number
    let formatted = number.replace(/\D/g, '');

// remove number 0
// change 62 to 0
    if(formatted.startsWith('0')){
        formatted = '62' + formatted.substr(1);
    }
    if(!formatted.endsWith('@c.us')){
        formatted += '@c.us';
    }
    return formatted;
}
module.exports = {
    phoneNumberFormatter
}