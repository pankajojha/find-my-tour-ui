import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { createBooking, fetchTour } from '../api/tours';
import Loading from '../components/Loading';
import ErrorBanner from '../components/ErrorBanner';

export default function TourDetailPage() {
  const { id } = useParams();

  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [travelers, setTravelers] = useState(1);

  const [bookingSuccess, setBookingSuccess] = useState('');
  const [bookingError, setBookingError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadTour() {
      setLoading(true);
      setError('');

      try {
        const data = await fetchTour(id);

        if (active) {
          setTour(data);
        }
      } catch {
        if (active) {
          setError('Unable to load tour.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadTour();

    return () => {
      active = false;
    };
  }, [id]);

  async function handleBooking(event) {
    event.preventDefault();

    setSubmitting(true);
    setBookingSuccess('');
    setBookingError('');

    try {
      const booking = await createBooking({
        tourId: tour.id,
        tourTitle: tour.title,
        destination: tour.destination,
        name,
        email,
        travelDate,
        travelers: Number(travelers),
        totalPrice: Number(tour.price) * Number(travelers)
      });

      setBookingSuccess(
        `Booking confirmed. Reference: ${booking.id || booking.bookingId || 'saved'}`
      );

      setName('');
      setEmail('');
      setTravelDate('');
      setTravelers(1);
    } catch {
      setBookingError('Unable to create booking.');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <Loading message="Loading tour..." />;
  }

  if (error) {
    return <ErrorBanner message={error} />;
  }

  if (!tour) {
    return (
      <div className="empty-state">
        <p>Tour not found.</p>
        <Link to="/tours">Back to tours</Link>
      </div>
    );
  }

  return (
    <div className="section">
      <Link to="/tours" className="back-link">
        ← Back to tours
      </Link>

      <div className="detail-layout">
        <div>
          <h1>{tour.title}</h1>
          <p className="muted">{tour.destination}</p>

          <div className="tag-row">
            <span className="tag">{tour.days} days</span>
            <span className="tag">★ {tour.rating}</span>
          </div>

          <p>{tour.summary}</p>

          <h2>Itinerary</h2>

          <div className="itinerary">
            {(tour.itinerary || []).map((item) => (
              <div key={item.day} className="itinerary-item">
                <div className="itinerary-day">Day {item.day}</div>
                <div>
                  <strong>{item.title}</strong>
                  <p className="muted">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="booking-card">
          <h2>Book this tour</h2>

          <form onSubmit={handleBooking} className="stack-form">
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Full name"
            />

            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email address"
            />

            <input
              required
              type="date"
              value={travelDate}
              onChange={(event) => setTravelDate(event.target.value)}
            />

            <input
              required
              type="number"
              min="1"
              value={travelers}
              onChange={(event) => setTravelers(event.target.value)}
              placeholder="Travelers"
            />

            <button className="button" disabled={submitting}>
              {submitting ? 'Booking...' : 'Confirm booking'}
            </button>
          </form>

          <ErrorBanner message={bookingError} />

          {bookingSuccess && <div className="success-banner">{bookingSuccess}</div>}
        </aside>
      </div>
    </div>
  );
}
