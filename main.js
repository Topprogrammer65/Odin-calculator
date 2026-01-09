const previousDisplay = document.querySelector(".previous");
const currentDisplay = document.querySelector(".current");
const buttons = document.querySelectorAll(".btn-dark");
const clearBtn = document.getElementById("clear-btn");

let currentValue = "";
let previousValue = "";
let operator = "";

// Button clicks
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.innerText;

        if (!isNaN(value) || value === ".") {
            currentValue += value;
            updateDisplay();
        } else if (value === "=") {
            calculate();
        } else {
            chooseOperator(value);
        }
    });
});

// Clear
clearBtn.addEventListener("click", () => {
    currentValue = "";
    previousValue = "";
    operator = "";
    updateDisplay();
});

function chooseOperator(op) {
    if (currentValue === "") return;
    if (previousValue !== "") calculate();

    operator = op === "x" ? "*" : op;
    previousValue = currentValue;
    currentValue = "";
}

function calculate() {
    if (previousValue === "" || currentValue === "") return;

    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);

    switch (operator) {
        case "+":
            result = prev + current;
            break;
        case "-":
            result = prev - current;
            break;
        case "*":
            result = prev * current;
            break;
        case "/":
            result = prev / current;
            break;
        default:
            return;
    }

    currentValue = result.toString();
    operator = "";
    previousValue = "";
    updateDisplay();
}

function updateDisplay() {
    currentDisplay.innerText = currentValue;
    previousDisplay.innerText = previousValue + " " + operator;
}
