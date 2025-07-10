import { fireEvent, render, screen } from "@testing-library/react";
import { MockChickyOinkProvider } from "../../../../../context/_mocks_/mockChickyOinkContext";
import ChickyOinkSummary from "../ChickyOinkSummary";

describe("ChickyOinkSummary", () => {
  it("calls setCash when Cash input is changed", () => {
    const setCash = vi.fn();

    render(
      <MockChickyOinkProvider overrides={{ setCash }}>
        <ChickyOinkSummary />
      </MockChickyOinkProvider>
    );

    const input = screen.getByPlaceholderText("Cash");
    fireEvent.change(input, { target: { value: "123" } });

    expect(setCash).toHaveBeenCalledWith(123);
  });

  it("calls setCashFund when Cash Fund input is changed", () => {
    const setCashFund = vi.fn();

    render(
      <MockChickyOinkProvider overrides={{ setCashFund }}>
        <ChickyOinkSummary />
      </MockChickyOinkProvider>
    );

    const input = screen.getByPlaceholderText("Cash Fund");
    fireEvent.change(input, { target: { value: "456" } });

    expect(setCashFund).toHaveBeenCalledWith(456);
  });

  it("calls setPreparedBy when Prepared By input is changed", () => {
    const setPreparedBy = vi.fn();

    render(
      <MockChickyOinkProvider overrides={{ setPreparedBy }}>
        <ChickyOinkSummary />
      </MockChickyOinkProvider>
    );

    const input = screen.getByPlaceholderText("Prepared by");
    fireEvent.change(input, { target: { value: "Warren" } });

    expect(setPreparedBy).toHaveBeenCalledWith("Warren");
  });
});
