
function sum (numbersToAdd){
    return numbersToAdd.reduce(function(a, b){
        return a+b;
    }, 0);
}
module.exports.sum = sum;