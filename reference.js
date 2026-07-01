const btns = document.querySelectorAll(".btn");
const screen = document.querySelector(".calcu-screen");
let input = [];
const operators = ["+", "-", "*", "/"];

btns.forEach(btn => {
    btn.addEventListener("click", getValue)
})

function getValue(e) {
    let value = e.target.textContent;
    if(value === "C") {
        clearDisplay();
    } else if (operators.includes(value)) {
        appendToDisplay(value);
    } else if (value === "=") {
        calculate();
    } else {
        appendToDisplay(value);
    }
    
}

function calculate() {
    const operatorIndex = input.findIndex(char => operators.includes(char));
    const operator = input[operatorIndex];
    let output = "";

    console.log(operatorIndex)
    console.log(operator);

    if(operatorIndex === -1) {
        return;
    }

    const firstNumber = Number(input.slice(0, operatorIndex).join(""));
    const secondNumber = Number(input.slice(operatorIndex + 1).join(""));

    switch(operator) {
        case "+":
            output = firstNumber + secondNumber;
            break;
        case "-":
            output = firstNumber - secondNumber;
            break;
        case "*":
            output = firstNumber * secondNumber;
            break;
        case "/":
            if(secondNumber === 0) {
                screen.textContent = "ERROR"
                input = [];
                return;
            }
            output = firstNumber / secondNumber;
            break;
    }
    
    screen.textContent = output;
    input = [String(output)];
}

function clearDisplay() {
    input = [];
    screen.textContent = "";
}

function appendToDisplay(value) {
    input.push(value);
    screen.textContent = input.join("");
}