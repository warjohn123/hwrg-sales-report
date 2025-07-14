interface Props {
  text: string;
  className?: string;
  buttonType: "primary" | "danger";
  disabled?: boolean;
  onClick: () => void;
}

export default function Button({
  text,
  buttonType,
  className,
  disabled = false,
  onClick,
}: Props) {
  const styles = {
    primary: "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700",
    danger: "px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`cursor-pointer ${styles[buttonType]} ${className}`}
    >
      {text}
    </button>
  );
}
