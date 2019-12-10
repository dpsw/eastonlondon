exports.GENERATE_TOKEN = '/Token';

// CENTERS
exports.LIST_ALL_CENTERS = '/v1/Centers';

/**
 * Get URI for fetching masters
 *
 * @param {String} centerId
 * @return {String}
 */
exports.LIST_MASTERS = centerId => `/v1/Centers/${centerId}/therapists`;

/**
 * Get URI for fetching services
 *
 * @param {String} centerId
 * @return {String}
 */
exports.LIST_SERVICES = centerId => `/v1/Centers/${centerId}/services`;

// GUESTS
exports.CREATE_GUEST = '/v1/guests';

// BOOKINGS
exports.CREATE_BOOKING = '/v1/bookings';

/**
 * Get URI for confirm booking
 *
 * @param {String} bookingId
 * @return {String}
 */
exports.CONFIRM_BOOKING = bookingId => `/v1/bookings/${bookingId}/slots/confirm`;

/**
 * Get URI for cancel booking
 *
 * @param {String} invoiceId
 * @return {String}
 */
exports.CANCEL_BOOKING = invoiceId => `/v1/invoices/${invoiceId}/cancel`;

// TIMES
/**
 * Get URI for fetching times
 *
 * @param {String} bookingId
 * @return {String}
 */
exports.GET_TIME_FOR_BOOKING = bookingId => `/v1/bookings/${bookingId}/slots`;

/**
 * Get URI for fetching times
 *
 * @param {String} bookingId
 * @return {String}
 */
exports.RESERVE_TIME_FOR_BOOKING = bookingId => `/v1/bookings/${bookingId}/slots/reserve`;

exports.GET_GUESTS_BY_EMAIL = '/v1/guests/search';

/**
 * Get bookings by guestId
 *
 * @param {String} guestId
 * @return {String}
 */
exports.GET_BOOKINGS_BY_GUEST_ID = guestId => `/v1/guests/${guestId}/appointments`;
