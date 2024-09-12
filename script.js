document.addEventListener('DOMContentLoaded', () => {
  // Select the display and all buttons from the DOM
  const display = document.querySelector('.display');
  const buttons = document.querySelectorAll('button');
  
  // Initialize variables
  let currentInput = '0';  // Holds the number currently being typed
  let expression = '';     // Full expression to display
  let operator = null;     // Current operator
  let waitingForSecondOperand = false; // Flag to indicate if waiting for second operand

  // Add event listeners to each button
  buttons.forEach(button => {
      button.addEventListener('click', () => {
          const buttonText = button.innerText;

          // Handle button click based on its class
          if (button.classList.contains('number')) {
              handleNumber(buttonText);
          } else if (button.classList.contains('operator')) {
              handleOperator(buttonText);
          } else if (button.classList.contains('equal')) {
              calculate();
          } else if (button.classList.contains('clear')) {
              clearDisplay();
          } else if (button.classList.contains('square')) {
              squareNumber();
          } else if (button.classList.contains('del')) {
              delLast();
          }
      });
  });

  // Handle number button click
  function handleNumber(number) {
      if (waitingForSecondOperand) {
          // Start new number input if waiting for second operand
          currentInput = number;
          waitingForSecondOperand = false;
      } else {
          // Append number to current input or replace '0'
          currentInput = currentInput === '0' ? number : currentInput + number;
      }
      // Update the display with the new number
      expression += number;
      updateDisplay();
  }

  // Handle operator button click
  function handleOperator(nextOperator) {
      if (operator && waitingForSecondOperand) {
          // Update the operator if already waiting for the second operand
          operator = nextOperator;
          return;
      }

      // Append operator to the expression if not waiting for second operand
      if (!waitingForSecondOperand) {
          expression += `${nextOperator}`;
      }

      // Calculate the result if an operator is already set
      if (operator) {
          calculate();
      }

      // Set the new operator and indicate waiting for second operand
      operator = nextOperator;
      waitingForSecondOperand = true;
      updateDisplay();
  }

  // Perform calculation based on the expression
  function calculate() {
      try {
          // Evaluate the entire expression
          const result = eval(expression.replace('x²', '**2'));
          // Update display and reset variables
          display.value = result;
          currentInput = result.toString();
          expression = result.toString();
          operator = null;
          waitingForSecondOperand = false;
      } catch (error) {
          // Display error message if there's an issue with evaluation
          display.value = 'Error';
      }
  }

  // Square the current input and update the display
  function squareNumber() {
      currentInput = Math.pow(parseFloat(currentInput), 2).toString();
      expression = currentInput;
      updateDisplay();
  }

  // Clear the display and reset all variables
  function clearDisplay() {
      currentInput = '0';
      expression = '';
      operator = null;
      waitingForSecondOperand = false;
      updateDisplay();
  }

  // Remove the last character from both the display and the expression
  function delLast() {
    // If waiting for the second operand, allow deletion from currentInput
    if (!waitingForSecondOperand) {
        if (currentInput.length > 1) {
            currentInput = currentInput.slice(0, -1);
        } else {
            currentInput = ' ';  // If there's only one character left, reset to '0'
        }
        expression = currentInput;  // Synchronize the expression with current input
    } else {
        // When an operator has been selected, remove from the expression
        if (expression.length > 0) {
            expression = expression.trim().slice(0, -1);
        }
    }

    updateDisplay();
}

  // Update the display to show the current expression or input
  function updateDisplay() {
      display.value = expression || currentInput;
  }
});
