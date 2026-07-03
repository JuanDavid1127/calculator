const BUTTONS = document.querySelectorAll(".btn");
const VALID_KEYS = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
    "+", "-", "*", "/",
    "=", ".", "C", "del",
    "Enter", "Backspace", "Escape"
]
const MATH_OPERATORS = ["+", "-", "*", "/"];
const screen = document.querySelector(".calcu-screen");
let expression = [];

document.addEventListener("keydown", handleInput);
BUTTONS.forEach(btn => {
    btn.addEventListener("click", handleInput);
})

function handleInput(e) {
    let input;
    if(e.type === "click") {
        input = e.target.textContent;
    }

    if(e.type === "keydown") {
        input = e.key;
    }

    if(input === "Enter") input = "=";
    if(input === "Backspace") input = "del";
    if(input === "Escape") input = "C";

    if(!VALID_KEYS.includes(input)) {
        return;
    }

    processInput(input);
}

function processInput(input) {

    if(input === "C") {
        clearDisplay();
    } else if (input === "del") {
        removeLastChar();
    } else if(input === "=") {
        calculate();
    } else if(input === ".") {
        appendDot();
    } else if (MATH_OPERATORS.includes(input)) {
        appendOrModifyExpression(input);
    } else {
        appendToExpression(input);
        updateDisplay();
    }
}

function getOperatorIndex() {
    return expression.findIndex(char => MATH_OPERATORS.includes(char));
}

function getFirstNumber() {
    const operatorIndex = getOperatorIndex();
    if(operatorIndex === -1) {
        return expression;
    }

    return expression.slice(0, operatorIndex);
}

function getLastNumber() {
    const operatorIndex = getOperatorIndex();
    return expression.slice(operatorIndex + 1);
}

function appendOrModifyExpression(input) {
    const operatorIndex = getOperatorIndex();
    const firstNumber = getFirstNumber();
    const lastNumber = getLastNumber();

    if(operatorIndex !== -1) {
        expression[operatorIndex] = input;
    } else {
        appendToExpression(input);
    }

    updateDisplay();
}

function removeLastChar() {
    expression.pop();
}

function updateDisplay() {
    screen.textContent = expression.join("");
}

function appendToExpression(input) {
    expression.push(input);
}

function clearDisplay() {
    expression = [];
    screen.textContent = "";
}

function appendDot() {
    const currentNumber = getCurrentNumber();

    if(currentNumber.includes(".")) {
        return;
    }
    appendToExpression(".");
    updateDisplay();
}

function getCurrentNumber() {
    const operatorIndex = getOperatorIndex();
    const firstNumber = getFirstNumber();
    const lastNumber = getLastNumber();

    return operatorIndex === -1 ? firstNumber : lastNumber;
}

function calculate() {
    const operatorIndex = getOperatorIndex();
    const operator = expression[operatorIndex];
    const firstNumber = Number(
        getFirstNumber().join("")
    );
    const lastNumber = Number(
        getLastNumber().join("") 
    );
    let output;

    if(operatorIndex === -1) {
        return;
    }
    if(lastNumber.length === 0) {
        return;
    }

    switch(operator) {
        case "+":
            output = addNumber(firstNumber, lastNumber);
            break;
        case "-":
            output = subtractNumber(firstNumber, lastNumber);
            break;
        case "*":
            output = multiplyNumber(firstNumber, lastNumber);
            break;
        case "/":
            output = divideNumber(firstNumber, lastNumber);
            break;
    }
    expression = [String(output)];
    updateDisplay();
}

function addNumber(firstNumber, lastNumber) {
    return firstNumber + lastNumber;
}

function subtractNumber(firstNumber, lastNumber) {
    return firstNumber - lastNumber;
}

function multiplyNumber(firstNumber, lastNumber) {
    return firstNumber * lastNumber;
}

function divideNumber(firstNumber, lastNumber) {
    if(lastNumber === 0) {
        screen.textContent = "";
        expression = [];
        return null;
    }

    return firstNumber / lastNumber;
}