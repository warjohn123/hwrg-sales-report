import {
  ChickyOinkReportContext,
  ChickyOinkReportContextType,
} from "../chickyReportContext";

export function MockChickyOinkProvider({
  children,
  overrides = {},
}: {
  children: React.ReactNode;
  overrides?: Partial<ChickyOinkReportContextType>;
}) {
  const mockContext: ChickyOinkReportContextType = {
    setCash: vi.fn(),
    setCashFund: vi.fn(),
    setPreparedBy: vi.fn(),
    ...overrides,
  };

  return (
    <ChickyOinkReportContext.Provider value={mockContext}>
      {children}
    </ChickyOinkReportContext.Provider>
  );
}
