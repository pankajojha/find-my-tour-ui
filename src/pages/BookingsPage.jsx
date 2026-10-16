import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchBookings } from '../api/tours';
import Loading from '../components/Loading';

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadBookings() {
      setLoading(true);

      try {
        const data = await fetchBookings();

        if (active) {
          setBookings(Array.isArray(data) ? data : []);
        }
      } catch {
        if (active) {
          setBookings([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadBookings();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="section page-shell">
      <div className="section-heading">
        <h1>My bookings</h1>
        <p className="muted">View your confirmed and pending tours.</p>
      </div>

      {loading && <Loading message="Loading bookings..." />}

      {!loading && bookings.length === 0 && (
        <div className="empty-state empty-state--bookings">
          <div className="empty-state__icon" aria-hidden="true">✦</div>
          <h2>No bookings yet.</h2>
          <p>Start planning your next getaway and we’ll keep all your trip details here.</p>
          <Link to="/tours" className="button button--secondary">Browse tours</Link>
        </div>
      )}

      <div className="booking-list">
        {bookings.map((booking) => (
          <article key={booking.id || booking.bookingId} className="booking-card">
            <div>
              <h3>{booking.tourTitle || booking.tour_title || 'Tour booking'}</h3>
              <p className="muted">
                {booking.destination || booking.tourId || 'Destination pending'}
              </p>

              <div className="tag-row">
                <span className="tag">Traveler: {booking.name || 'N/A'}</span>
                <span className="tag">Date: {booking.travelDate || 'N/A'}</span>
                <span className="tag">Travelers: {booking.travelers || 1}</span>
                {booking.totalPrice ? (
                  <span className="tag">${booking.totalPrice}</span>
                ) : null}
              </div>
            </div>

            <div className="booking-status">
              <span className={`status ${booking.status || 'pending'}`}>
                {booking.status || 'pending'}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
