function somar (num1, num2) {
    return num1 + num2;
}

function multi (num1, num2) {
    result = 0;
    for (let i = 1; i <= num2; i++) {
        result += num1;
    }
    return result;
}

function lerArgumentos () {
    [...arguments].forEach(x => {
        console.log(x);
    });
}

module.exports = { 
    somar,
    multi,
    lerArgumentos
};