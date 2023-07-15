interface GuestUser {
  first_name: string;
  full_name: string;
  id: number;
  phone?: string;
  thumbnail_url?: string;
  profile_picture_url?: string;
  location: string;
  reviews_count_as_guest_and_cotraveler: number;
  identity_verified: boolean;
}

interface GuestDetails {
  number_of_adults: number;
  number_of_children: number;
  number_of_infants: number;
  localized_description: string;
  number_of_guests: number;
  number_of_pets: number;
}

interface HostVatInvoice {
  id: number;
  invoice_number: string;
}

interface TeamPermission {
  permission_component_u_i_capability: string;
}

interface OtherGuests {
  first_name: string;
  profile_picture_url: string;
}

export interface Reservation {
  confirmation_code: string;
  start_date: string;
  end_date: string;
  listing_id: number;
  listing_name: string;
  booked_date: string;
  nights: number;
  guest_user: GuestUser;
  guest_details: GuestDetails;
  earnings: string;
  host_vat_invoices: HostVatInvoice[];
  tier_id: number;
  user_facing_status_key: string;
  user_facing_status_localized: string;
  property: any;
  listing_picture_url: string;
  reservation_type: string;
  is_covid19_responder_booking: boolean;
  flexible_cancellation_request_status: string;
  booked_hour_localized: string;
  cancellation_policy_id: number;
  team_permissions: {
    alter_reservation: TeamPermission;
    cancel_reservation: TeamPermission;
    contact_guest: TeamPermission;
    resolution_center_link: TeamPermission;
    reviews: TeamPermission;
    print_function: TeamPermission;
  };
  is_check_out_today: boolean;
  is_check_in_today: boolean;
  bessie_thread_id: number;
  other_guests: OtherGuests[];
  pending_expires_at: string;
  listing_rate_plan_enabled: boolean;
  host_calendar_reservation_status: string;
  listing_id_str: string;
}

export interface ReservationData {
  reservations: Reservation[];
  metadata: {
    page_count: number;
    page_index: number;
    total_count: number;
  };
}
