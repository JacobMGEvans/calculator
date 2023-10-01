import { PropsWithChildren } from "react";

type CalculatorKeyProps = {
  onPress: () => void;
  className?: string;
};

export const CalculatorKey = ({
  onPress,
  className,
  ...props
}: PropsWithChildren & CalculatorKeyProps) => (
  <button
    onClick={onPress}
    className={`calculator-key ${className}`}
    {...props}
  />
);
