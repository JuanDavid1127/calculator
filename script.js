const BUTTONS = document.querySelectorAll(".btn");
const MATH_OPERATORS = ["+", "-", "*", "/"];
const SCREEN = document.querySelector(".calcu-screen");
let expression = [];

BUTTONS.forEach(btn => {
    btn.addEventListener("click", handleInput);
})

document.addEventListener("keydown", handleInput);

function processInput(value) {

    if(value === "Backspace") value = "C";
    if(value === "Enter" || value === "=") value = "=";
    if(value === ".") value = ".";

    if(value === "C") {
        clearDisplay();
    } else if(MATH_OPERATORS.includes(value)) {
        appendOrModifyExpression(value);
    } else if(value === "=") {
        calculate();
    } else if(value === ".") {
       appendDot(value);
    } else {
        expression.push(value);
        SCREEN.textContent = expression.join("");
    }
}

function handleInput(e) {
    const VALID_KEYS = [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
        "+", "-", "*", "/",
        ".", "=",
        "Backspace", "Enter"
    ]
    let value;

    if(e.type === "click") {
        value = e.target.textContent;
    } 
    
    if(e.type === "keydown") {
        value = e.key;
    }

    if(!VALID_KEYS.includes(value)) {
        return;
    }

   processInput(value);
}

function clearDisplay() {
    expression = [];
    SCREEN.textContent = "";
}

function appendOrModifyExpression(value) {
    const operatorIndex = expression.findIndex(char => MATH_OPERATORS.includes(char));

    if(operatorIndex !== -1) {
        expression[operatorIndex] = value;
    } else {
        expression.push(value);
    }

    SCREEN.textContent = expression.join("");
}

function appendDot(value) {
    const operatorIndex = expression.findIndex(char => MATH_OPERATORS.includes(char));
    const dotIndex = expression.includes(".");

}

function calculate() {
    let output;
    const operatorIndex = expression.findIndex(char => MATH_OPERATORS.includes(char));
    const operator = expression[operatorIndex];

    const firstNumber = Number(expression.slice(0, operatorIndex).join(""));
    const lastNumber = Number(expression.slice(operatorIndex + 1).join(""));

    switch(operator) {
        case "+":
            output = firstNumber + lastNumber;
            break;
        case "-":
            output = firstNumber - lastNumber;
            break;
        case "*":
            output = firstNumber * lastNumber;
            break;
        case "/":
            if(lastNumber === 0) {
                SCREEN.textContent = "ERROR";
                expression = []
                return;
            }
            output = firstNumber / lastNumber;
            break;
    }
    SCREEN.textContent = output;
    expression = [String(output)];
}