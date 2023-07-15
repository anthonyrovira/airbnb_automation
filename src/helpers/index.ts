import { Reservation } from "../types";

export function formatAmount(amount: number): string {
  return amount.toFixed(2);
}

export function getTableData(reservations: Reservation[]) {
  return reservations.map((reservation) => {
    const formatDate = new Date(reservation.start_date);
    const earnings = parseFloat(
      reservation.earnings.replace(/[^\d,]/g, "").replace(",", ".")
    );
    const conciergerieFee = (earnings - 27) * 0.2;

    return [
      reservation.confirmation_code,
      formatDate,
      reservation.nights,
      reservation.guest_user?.full_name,
      reservation.guest_details?.number_of_guests,
      earnings,
      Number(formatAmount(27)),
      Number(formatAmount(conciergerieFee)),
      Number(formatAmount(earnings - 27 - conciergerieFee)),
    ];
  });
}
