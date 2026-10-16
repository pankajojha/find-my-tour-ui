import client from './client';
import { USE_MOCK } from '../config';
import { mockTours, mockAIItinerary } from '../data/mockTours';

const BOOKINGS_KEY = 'findmytour_bookings';

function readLocalBookings() {
  try {
    return JSON.parse(localStorage.getItem(BOOKINGS_KEY)) || [];
  } catch {
    return [];
  }
}

function writeLocalBookings(bookings) {
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
}

function normalizeTours(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.tours)) return data.tours;
  if (Array.isArray(data.data)) return data.data;
  if (Array.isArray(data.results)) return data.results;
  return [];
}

function applyMockFilters(tours, params = {}) {
  let result = [...tours];

  const query = String(params.destination || params.search || '').toLowerCase();

  if (query) {
    result = result.filter((tour) =>
      [tour.title, tour.destination, tour.summary]
        .filter(Boolean)
        .some((text) => text.toLowerCase().includes(query))
    );
  }

  if (params.maxPrice) {
    result = result.filter((tour) => Number(tour.price) <= Number(params.maxPrice));
  }

  if (params.featured === 'true' || params.featured === true) {
    result = result.filter((tour) => tour.featured);
  }

  return result;
}

export async function fetchTours(params = {}) {
  try {
    const { data } = await client.get('/tours', { params });
    return normalizeTours(data);
  } catch (error) {
    if (!USE_MOCK) throw error;
    return applyMockFilters(mockTours, params);
  }
}

export async function fetchTour(id) {
  try {
    const { data } = await client.get(`/tours/${id}`);
    return data.tour || data.data || data;
  } catch (error) {
    if (!USE_MOCK) throw error;
    return mockTours.find((tour) => String(tour.id) === String(id));
  }
}

export async function createBooking(payload) {
  try {
    const { data } = await client.post('/bookings', payload);
    return data.booking || data.data || data;
  } catch (error) {
    if (!USE_MOCK) throw error;

    const booking = {
      id: `booking_${Date.now()}`,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      ...payload
    };

    const bookings = readLocalBookings();
    writeLocalBookings([booking, ...bookings]);

    return booking;
  }
}

export async function fetchBookings() {
  try {
    const { data } = await client.get('/bookings');
    return data.bookings || data.data || data;
  } catch (error) {
    if (!USE_MOCK) {
      return readLocalBookings();
    }
    return readLocalBookings();
  }
}

export async function generateItinerary(payload) {
  try {
    const { data } = await client.post('/ai/itinerary', payload);
    return data.itinerary || data.data || data;
  } catch (error) {
    if (!USE_MOCK) throw error;
    return mockAIItinerary(payload);
  }
}
