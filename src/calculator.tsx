import { useState, useEffect } from "react";
import { CalculatorDisplay } from "./calculator-display";
import { CalculatorKey } from "./calculator-key";

interface CalculatorOperations {
  [key: string]: (prevValue: number, nextValue: number) => string;
}
const CalculatorOperations: CalculatorOperations = {
  "/": (prevValue: number, nextValue: number): string =>
    (prevValue / nextValue).toString(),
  "*": (prevValue: number, nextValue: number): string =>
    (prevValue * nextValue).toString(),
  "+": (prevValue: number, nextValue: number): string =>
    (prevValue + nextValue).toString(),
  "-": (prevValue: number, nextValue: number): string =>
    (prevValue - nextValue).toString(),
  "=": (_: number, nextValue: number): string => nextValue.toString(),
};

const Calculator = () => {
  const [value, setValue] = useState<string | null>(null);
  const [displayValue, setDisplayValue] = useState("0");
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingOperand] = useState(false);

  const clearAll = () => {
    setValue(null);
    setDisplayValue("0");
    setOperator(null);
    setWaitingOperand(false);
  };

  const clearDisplay = () => setDisplayValue("0");

  const clearLastChar = () => {
    setDisplayValue(displayValue.substring(0, displayValue.length - 1) || "0");
  };

  const toggleSign = () => {
    const newValue = parseFloat(displayValue) * -1;
    setDisplayValue(String(newValue));
  };

  const inputPercent = () => {
    const currentValue = parseFloat(displayValue);
    if (currentValue === 0) return;

    const fixedDigits = displayValue.replace(/^-?\d*\.?/, "");
    const newValue = parseFloat(displayValue) / 100;

    setDisplayValue(String(newValue.toFixed(fixedDigits.length + 2)));
  };

  const inputDot = () => {
    if (!/\./.test(displayValue)) {
      setDisplayValue(displayValue + ".");
      setWaitingOperand(false);
    }
  };

  const inputDigit = (digit: number) => {
    if (waitingForOperand) {
      setDisplayValue(String(digit));
      setWaitingOperand(false);
    } else {
      setDisplayValue(
        displayValue === "0" ? String(digit) : displayValue + digit
      );
    }
  };

  const performOperation = (nextOperator: string) => {
    if (value === null) {
      setValue(displayValue);
    } else if (operator) {
      const currentValue = parseFloat(value);
      const newValue = CalculatorOperations[operator](
        currentValue,
        parseFloat(displayValue)
      );
      setValue(newValue);
      setDisplayValue(String(newValue));
    }
    setWaitingOperand(true);
    setOperator(nextOperator);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    let { key } = event;
    if (key === "Enter") key = "=";

    switch (key) {
      case "/":
      case "*":
      case "+":
      case "-":
      case "=":
        event.preventDefault();
        performOperation(key);
        break;
      case ".":
        event.preventDefault();
        inputDot();
        break;
      case "%":
        event.preventDefault();
        inputPercent();
        break;
      case "Backspace":
        event.preventDefault();
        clearLastChar();
        break;
      case "Clear":
        event.preventDefault();
        clearDisplay();
        break;
      default:
        event.preventDefault();
        inputDigit(parseInt(key, 10));
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, false);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
    };
  });

  const clearDisplayCheck = displayValue !== "0";
  const clearText = clearDisplayCheck ? "C" : "AC";

  return (
    <div className="calculator">
      <CalculatorDisplay value={displayValue} />
      <div className="calculator-keypad">
        <div className="input-keys">
          <div className="function-keys">
            <CalculatorKey
              className="key-clear"
              onPress={() => (clearDisplayCheck ? clearDisplay() : clearAll())}
            >
              {clearText}
            </CalculatorKey>
            <CalculatorKey className="key-sign" onPress={() => toggleSign()}>
              ±
            </CalculatorKey>
            <CalculatorKey
              className="key-percent"
              onPress={() => inputPercent()}
            >
              %
            </CalculatorKey>
          </div>
          <div className="digit-keys">
            <CalculatorKey className="key-0" onPress={() => inputDigit(0)}>
              0
            </CalculatorKey>
            <CalculatorKey className="key-dot" onPress={() => inputDot()}>
              ●
            </CalculatorKey>
            <CalculatorKey className="key-1" onPress={() => inputDigit(1)}>
              1
            </CalculatorKey>
            <CalculatorKey className="key-2" onPress={() => inputDigit(2)}>
              2
            </CalculatorKey>
            <CalculatorKey className="key-3" onPress={() => inputDigit(3)}>
              3
            </CalculatorKey>
            <CalculatorKey className="key-4" onPress={() => inputDigit(4)}>
              4
            </CalculatorKey>
            <CalculatorKey className="key-5" onPress={() => inputDigit(5)}>
              5
            </CalculatorKey>
            <CalculatorKey className="key-6" onPress={() => inputDigit(6)}>
              6
            </CalculatorKey>
            <CalculatorKey className="key-7" onPress={() => inputDigit(7)}>
              7
            </CalculatorKey>
            <CalculatorKey className="key-8" onPress={() => inputDigit(8)}>
              8
            </CalculatorKey>
            <CalculatorKey className="key-9" onPress={() => inputDigit(9)}>
              9
            </CalculatorKey>
          </div>
        </div>
        <div className="operator-keys">
          <CalculatorKey
            className="key-divide"
            onPress={() => performOperation("/")}
          >
            ÷
          </CalculatorKey>
          <CalculatorKey
            className="key-multiply"
            onPress={() => performOperation("*")}
          >
            ×
          </CalculatorKey>
          <CalculatorKey
            className="key-subtract"
            onPress={() => performOperation("-")}
          >
            −
          </CalculatorKey>
          <CalculatorKey
            className="key-add"
            onPress={() => performOperation("+")}
          >
            +
          </CalculatorKey>
          <CalculatorKey
            className="key-equals"
            onPress={() => performOperation("=")}
          >
            =
          </CalculatorKey>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
