import { useNavigate } from "react-router-dom";
import type {
  IHWRGEggsReport,
  IHWRGEggsSales,
} from "../../../../@types/HWRGEggsReport";
import { HWRG_EGGS_PRODUCTS } from "../../../../constants/HWRGEggsProduct";
import Button from "../../../UI/Button";
import { HWRG_EGGS_INVENTORY_DISPLAY_ORDER } from "../../create/hwrg-eggs/displayOrder";

interface Props {
  report: IHWRGEggsReport;
}

function getTotalSales(sales: IHWRGEggsReport["sales"]): number {
  const totalSales =
    sales.pl.pcs * HWRG_EGGS_PRODUCTS.PL.pcPrice +
    sales.pl.dozens * HWRG_EGGS_PRODUCTS.PL.dozenPrice +
    sales.pl.trays * HWRG_EGGS_PRODUCTS.PL.trayPrice +
    sales.pw.pcs * HWRG_EGGS_PRODUCTS.PW.pcPrice +
    sales.pw.dozens * HWRG_EGGS_PRODUCTS.PW.dozenPrice +
    sales.pw.trays * HWRG_EGGS_PRODUCTS.PW.trayPrice +
    sales.small.pcs * HWRG_EGGS_PRODUCTS.SMALL.pcPrice +
    sales.small.dozens * HWRG_EGGS_PRODUCTS.SMALL.dozenPrice +
    sales.small.trays * HWRG_EGGS_PRODUCTS.SMALL.trayPrice +
    sales.medium.pcs * HWRG_EGGS_PRODUCTS.MEDIUM.pcPrice +
    sales.medium.dozens * HWRG_EGGS_PRODUCTS.MEDIUM.dozenPrice +
    sales.medium.trays * HWRG_EGGS_PRODUCTS.MEDIUM.trayPrice +
    sales.large.pcs * HWRG_EGGS_PRODUCTS.LARGE.pcPrice +
    sales.large.dozens * HWRG_EGGS_PRODUCTS.LARGE.dozenPrice +
    sales.large.trays * HWRG_EGGS_PRODUCTS.LARGE.trayPrice +
    sales.xl.pcs * HWRG_EGGS_PRODUCTS.XL.pcPrice +
    sales.xl.dozens * HWRG_EGGS_PRODUCTS.XL.dozenPrice +
    sales.xl.trays * HWRG_EGGS_PRODUCTS.XL.trayPrice;

  return totalSales;
}

export default function HWRGEggsReportDetails({ report }: Props) {
  const navigate = useNavigate();

  const totalExpenses = report.expenses.reduce(
    (partialSum, a) => partialSum + (a.value || 0),
    0
  );

  const totalRemit = getTotalSales(report.sales) - totalExpenses;
  const cash = report.cash;

  return (
    <div className="p-5">
      <Button
        text="Back to Reports Page"
        onClick={() => navigate("/reports")}
        buttonType="primary"
      />
      <h1 className="font-bold text-2xl mt-5">{report.title}</h1>

      {/** Sales Section */}
      <div>
        <div className="mt-5 flex flex-col gap-3">
          {Object.entries(HWRG_EGGS_PRODUCTS).map(([key]) => (
            <div className="flex flex-row gap-3" key={key}>
              <div className="w-30">{HWRG_EGGS_PRODUCTS[key].name}</div>
              <div>
                <div className="flex gap-3">
                  <div className="font-bold">
                    <div>
                      <b>PCS:</b>
                      {report.sales[key.toLowerCase() as keyof IHWRGEggsSales]
                        .pcs ?? 0}
                    </div>
                  </div>
                  <div>X</div>
                  <div className="w-10">{HWRG_EGGS_PRODUCTS[key].pcPrice}</div>
                  <div>=</div>
                  <span className="font-bold">
                    ₱
                    {(
                      (report.sales[HWRG_EGGS_PRODUCTS[key].attribute] ?? 0)
                        .pcs * HWRG_EGGS_PRODUCTS[key].pcPrice!
                    ).toLocaleString()}
                  </span>
                </div>

                <div className="flex gap-3">
                  <div className="font-bold">
                    <div>
                      <b>DOZENS:</b>
                      {report.sales[key.toLowerCase() as keyof IHWRGEggsSales]
                        .dozens ?? 0}
                    </div>
                  </div>
                  <div>X</div>
                  <div className="w-10">
                    {HWRG_EGGS_PRODUCTS[key].dozenPrice}
                  </div>
                  <div>=</div>
                  <span className="font-bold">
                    ₱
                    {(
                      (report.sales[HWRG_EGGS_PRODUCTS[key].attribute] ?? 0)
                        .dozens * HWRG_EGGS_PRODUCTS[key].dozenPrice!
                    ).toLocaleString()}
                  </span>
                </div>
                <div className="flex gap-3">
                  <div className="font-bold">
                    <div>
                      <b>TRAYS:</b>
                      {report.sales[key.toLowerCase() as keyof IHWRGEggsSales]
                        .trays ?? 0}
                    </div>
                  </div>
                  <div>X</div>
                  <div className="w-10">
                    {HWRG_EGGS_PRODUCTS[key].trayPrice}
                  </div>
                  <div>=</div>
                  <span className="font-bold">
                    ₱
                    {(
                      (report.sales[HWRG_EGGS_PRODUCTS[key].attribute] ?? 0)
                        .trays * HWRG_EGGS_PRODUCTS[key].trayPrice!
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <h5 className="font-bold text-3xl">
            Total Sales: {getTotalSales(report.sales).toLocaleString()}
          </h5>
        </div>
      </div>

      {/** Expenses Section */}
      <div>
        <h2 className="text-xl font-bold">Expenses</h2>
        <div className="mt-3">
          {report.expenses.map((expense) => (
            <div className="flex flex-row gap-3">
              <div>{expense.name}</div>
              <div>=</div>
              <div className="font-bold">{expense.value.toLocaleString()}</div>
            </div>
          ))}
        </div>
        <div className="mt-5">
          <h4 className="font-bold text-lg">
            TOTAL EXPENSES: {totalExpenses.toLocaleString()}
          </h4>
        </div>
      </div>

      {/** Summary Section */}

      <div className="mt-5">
        <h1 className="font-bold text-xl">Summary</h1>
        <div className="flex flex-col gap-3 mt-5">
          <div className="flex gap-3">
            <div>Cash</div>
            <div className="font-bold">{report.cash.toLocaleString()}</div>
          </div>
          <div className="flex gap-3">
            <div>Cash Fund</div>
            <div className="font-bold">{report.cash_fund.toLocaleString()}</div>
          </div>
          <div className="flex gap-3">
            <div>On Duty</div>
            <div className="font-bold">{report.on_duty}</div>
          </div>
          <div className="flex gap-3">
            <div>Prepared By</div>
            <div className="font-bold">{report.prepared_by}</div>
          </div>
        </div>
        <div className="mt-5">
          {totalRemit - cash > 0 && (
            <h1 className="text-red-500">
              SHORT: Php {(totalRemit - cash).toLocaleString()}
            </h1>
          )}
          {cash - totalRemit > 0 && (
            <h1 className="text-green-500">
              OVER: Php {(cash - totalRemit).toLocaleString()}
            </h1>
          )}
        </div>
      </div>

      {/** Inventory table */}
      <div className="overflow-x-auto mt-5 text-xs">
        <div className="min-w-max">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr>
                <th className="sticky left-0 bg-white z-10 border w-40 py-2">
                  Item
                </th>
                <th className="border w-30 py-2">Initial Stocks</th>
                <th className="border w-20 py-2">Delivered (Trays)</th>
                <th className="border w-30 py-2">Pull-Out (Trays)</th>
                <th className="border w-30 py-2">Sales</th>
                <th className="border w-30 py-2">Remaining Stocks</th>
                <th className="border px-4 py-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(report.inventory)
                .sort(
                  (a, b) =>
                    HWRG_EGGS_INVENTORY_DISPLAY_ORDER.indexOf(a) -
                    HWRG_EGGS_INVENTORY_DISPLAY_ORDER.indexOf(b)
                )
                .map((key: string) => (
                  <tr key={key}>
                    <td className="sticky left-0 bg-white z-10 border px-4 py-2">
                      {key.replace("_", " ").toUpperCase()}
                    </td>
                    <td className="border px-4 py-2">
                      <div>
                        TRAYS:
                        {report.inventory[key].initial_stocks.trays}
                      </div>
                      <div>
                        PCS:
                        {report.inventory[key].initial_stocks.pcs}
                      </div>
                    </td>
                    <td className="border px-4 py-2 w-30">
                      {report.inventory[key].delivered.trays}
                    </td>
                    <td className="border px-4 py-2">
                      {report.inventory[key].pull_out.trays}
                    </td>
                    <td className="border px-4 py-2">
                      <div>
                        TRAYS:
                        {report.inventory[key].initial_stocks.trays}
                      </div>
                      <div>
                        DOZENS:
                        {report.inventory[key].sales.dozens}
                      </div>
                      <div>
                        PCS:
                        {report.inventory[key].sales.pcs}
                      </div>
                    </td>
                    <td className="border px-4 py-2">
                      <div>
                        TRAYS:
                        {report.inventory[key].remaining_stocks.trays}
                      </div>
                      <div>
                        PCS:
                        {report.inventory[key].remaining_stocks.pcs}
                      </div>
                    </td>
                    <td className="border px-4 py-2">
                      {report.inventory[key].notes}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
