import { TABLE_HEADERS, TABLE_WIDTH } from "./constants";
import { getTableData } from "./helpers";
import { fetchAllReservations } from "./services";
const ExcelJS = require("exceljs");

require("dotenv").config();

async function getReservations() {
  try {
    const reservationsData = await fetchAllReservations();

    const filteredReservations = reservationsData?.reservations.filter(
      (reservation) => !reservation.user_facing_status_key.includes("canceled")
    );

    if (!filteredReservations) {
      console.error("No reservations found", { reservationsData });
      return;
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Reservations");

    worksheet.addTable({
      name: "reservations",
      ref: "A1",
      headerRow: true,
      totalsRow: false,
      style: {
        theme: "TableStyleMedium25",
        showRowStripes: true,
      },
      columns: TABLE_HEADERS.map((headerName) => ({
        name: headerName,
        filterButton: true,
        width: 32,
      })),
      rows: getTableData(filteredReservations),
    });
    worksheet.columns = TABLE_HEADERS.map((headerName, index) => {
      return {
        header: headerName,
        key: headerName,
        width: TABLE_WIDTH[index],
      };
    });

    worksheet.getColumn(6).numFmt = '#,##0.00"€";[Red]-#,##0.00"€"';
    worksheet.getColumn(7).numFmt = '###0.00"€";[Red]-#,##0.00"€"';
    worksheet.getColumn(8).numFmt = '#,##0.00"€";[Red]-#,##0.00"€"';
    worksheet.getColumn(9).numFmt = '#,##0.00"€";[Red]-#,##0.00"€"';
    worksheet.eachRow((row: any) => {
      row?.eachCell((cell: any, rowNumber: number) => {
        cell.alignment = { horizontal: "center" };
      });
    });

    workbook.xlsx
      .writeFile("reservations.xlsx")
      .then(() => {
        console.log("✅ Excel table generated successfully!");
      })
      .catch((error: any) => {
        console.error(
          "An error occurred while generating the Excel table",
          error
        );
      });
  } catch (error) {
    console.error(
      "An error occurred while generating the Excel table : ",
      error
    );
  }
}

getReservations();
