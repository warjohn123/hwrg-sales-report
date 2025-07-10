import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../UI/Button";

describe("Button component", () => {
  it("renders the button with correct text", () => {
    render(<Button text="Click Me" buttonType="primary" onClick={() => {}} />);

    expect(
      screen.getByRole("button", { name: "Click Me" })
    ).toBeInTheDocument();
  });

  it("applies primary styles", () => {
    render(<Button text="Primary" buttonType="primary" onClick={() => {}} />);
    const button = screen.getByRole("button", { name: /primary/i });
    expect(button.className).toContain("bg-blue-600");
  });

  it("applies danger styles", () => {
    render(<Button text="Danger" buttonType="danger" onClick={() => {}} />);
    const button = screen.getByRole("button", { name: /danger/i });
    expect(button.className).toContain("bg-red-500");
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<Button text="Click" buttonType="primary" onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button", { name: /click/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies extra className when provided", () => {
    render(
      <Button
        text="With Class"
        buttonType="primary"
        className="extra-class"
        onClick={() => {}}
      />
    );
    const button = screen.getByRole("button", { name: /with class/i });
    expect(button.className).toContain("extra-class");
  });
});
