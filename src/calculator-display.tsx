import { PropsWithChildren } from "react";
import { AutoScalingText } from "./scaling";

export function CalculatorDisplay({
  value,
  ...props
}: PropsWithChildren & { value: string }) {
  const language = navigator.language || "en-US";
  let formattedValue = parseFloat(value).toLocaleString(language, {
    useGrouping: true,
    maximumFractionDigits: 6,
  });
  // Add back missing .0 in e.g. 12.0
  const match = value.match(/\.\d*?(0*)$/);

  if (match) formattedValue += /[1-9]/.test(match[0]) ? match[1] : match[0];

  return (
    <div {...props} className="calculator-display">
      <AutoScalingText>{formattedValue}</AutoScalingText>
    </div>
  );
}
