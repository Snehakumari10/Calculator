 let currentOperand = '0';
            let previousOperand = '';
            let operation = undefined;
            let resetCurrentOperand = false;
            
          
            const currentOperandElement = document.querySelector('.current-operand');
            const previousOperandElement = document.querySelector('.previous-operand');
            const buttons = document.querySelectorAll('button');
        
            function updateDisplay() {
                currentOperandElement.textContent = currentOperand;
                if (operation != null) {
                    previousOperandElement.textContent = `${previousOperand} ${getOperationSymbol(operation)}`;
                } else {
                    previousOperandElement.textContent = previousOperand;
                }
            }
            function getOperationSymbol(op) {
                switch(op) {
                    case 'add': return '+';
                    case 'subtract': return '-';
                    case 'multiply': return '×';
                    case 'divide': return '÷';
                    case 'percent': return '%';
                    default: return '';
                }
            }
            
            function appendNumber(number) {
                if (currentOperand === '0' || resetCurrentOperand) {
                    currentOperand = number;
                    resetCurrentOperand = false;
                } else {
                   
                    if (number === '.' && currentOperand.includes('.')) return;
                    currentOperand += number;
                }
            }
            
            function chooseOperation(op) {
                if (currentOperand === '') return;
                
                if (previousOperand !== '') {
                    calculate();
                }
                
                operation = op;
                previousOperand = currentOperand;
                resetCurrentOperand = true;
            }
            
            function calculate() {
                let computation;
                const prev = parseFloat(previousOperand);
                const current = parseFloat(currentOperand);
                
                if (isNaN(prev) || isNaN(current)) return;
                
                switch (operation) {
                    case 'add':
                        computation = prev + current;
                        break;
                    case 'subtract':
                        computation = prev - current;
                        break;
                    case 'multiply':
                        computation = prev * current;
                        break;
                    case 'divide':
                        if (current === 0) {
                            computation = 'Error';
                        } else {
                            computation = prev / current;
                        }
                        break;
                    case 'percent':
                        computation = prev % current;
                        break;
                    default:
                        return;
                }
                
                if (computation !== 'Error') {
                    computation = Math.round(computation * 100000000) / 100000000;
                }
                
                currentOperand = computation.toString();
                operation = undefined;
                previousOperand = '';
                resetCurrentOperand = true;
            }
            
            function clear() {
                currentOperand = '0';
                previousOperand = '';
                operation = undefined;
                resetCurrentOperand = false;
            }
            
            function calculateSquare() {
                const current = parseFloat(currentOperand);
                if (isNaN(current)) return;
                
                const squared = current * current;
                currentOperand = squared.toString();
                resetCurrentOperand = true;
            }
            
            function calculatePercent() {
                const current = parseFloat(currentOperand);
                if (isNaN(current)) return;
                
                if (operation && previousOperand !== '') {
                    calculate();
                    return;
                }

                currentOperand = (current / 100).toString();
                resetCurrentOperand = true;
            }
            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    const action = button.dataset.action;
                    const number = button.dataset.number;
                    
                    if (number) {
                        appendNumber(number);
                        updateDisplay();
                    }
                    
                    if (action) {
                        if (action === 'calculate') {
                            calculate();
                            updateDisplay();
                        } else if (action === 'clear') {
                            clear();
                            updateDisplay();
                        } else if (action === 'square') {
                            calculateSquare();
                            updateDisplay();
                        } else if (action === 'percent') {
                            if (currentOperand !== '') {
                                chooseOperation('percent');
                                calculate();
                                updateDisplay();
                            }
                        } else {
                            chooseOperation(action);
                            updateDisplay();
                        }
                    }
                });
            });
            
         
            document.addEventListener('keydown', event => {
                if (/[0-9]/.test(event.key)) {
                    appendNumber(event.key);
                    updateDisplay();
                } else if (event.key === '.') {
                    appendNumber('.');
                    updateDisplay();
                } else if (event.key === '+' || event.key === '-') {
                    chooseOperation(event.key === '+' ? 'add' : 'subtract');
                    updateDisplay();
                } else if (event.key === '*') {
                    chooseOperation('multiply');
                    updateDisplay();
                } else if (event.key === '/') {
                    chooseOperation('divide');
                    updateDisplay();
                } else if (event.key === '%') {
                    chooseOperation('percent');
                    updateDisplay();
                } else if (event.key === 'Enter' || event.key === '=') {
                    event.preventDefault();
                    calculate();
                    updateDisplay();
                } else if (event.key === 'Escape' || event.key === 'Delete') {
                    clear();
                    updateDisplay();
                } else if (event.key === 'Backspace') {
                    if (currentOperand.length > 1) {
                        currentOperand = currentOperand.slice(0, -1);
                    } else {
                        currentOperand = '0';
                    }
                    updateDisplay();
                }
            });
            
            // Initial display update
            updateDisplay();
    


