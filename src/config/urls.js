export const API_URL = 'https://api.zenoti.com/';

export const GENERATE_TOKEN = 'Token';

// CENTERS
export const LIST_ALL_CENTERS = 'v1/Centers';
/**
 * Get URI for fetching masters
 *
 * @param {String} centerId
 * @return {String}
 */
export const LIST_MASTERS = centerId => `v1/Centers/${centerId}/therapists`;

/**
 * Get URI for fetching services
 *
 * @param {String} centerId
 * @return {String}
 */
export const LIST_SERVICES = centerId => `v1/Centers/${centerId}/services`;

// GUESTS
export const CREATE_GUEST = 'v1/guests';

// BOOKINGS
export const CREATE_BOOKING = 'v1/bookings';

/**
 * Get URI for confirm booking
 *
 * @param {String} bookingId
 * @return {String}
 */
export const CONFIRM_BOOKING = bookingId => `/v1/bookings/${bookingId}/slots/confirm`;

/**
 * Get URI for cancel booking
 *
 * @param {String} invoiceId
 * @return {String}
 */
export const CANCEL_BOOKING = invoiceId => `/v1/invoices/${invoiceId}/cancel`;

// TIMES
/**
 * Get URI for fetching times
 *
 * @param {String} bookingId
 * @return {String}
 */
export const GET_TIME_FOR_BOOKING = bookingId => `/v1/bookings/${bookingId}/slots`;

/**
 * Get URI for fetching times
 *
 * @param {String} bookingId
 * @return {String}
 */
export const RESERVE_TIME_FOR_BOOKING = bookingId => `/v1/bookings/${bookingId}/slots/reserve`;
