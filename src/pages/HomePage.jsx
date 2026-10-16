import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTours } from '../api/tours';
import TourCard from '../components/TourCard';
import ErrorBanner from '../components/ErrorBanner';

export default function HomePage() {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState([]);
  const [destination, setDestination] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadFeatured() {
      try {
        const tours = await fetchTours({ featured: true });
        setFeatured(tours);
      } catch {
        setError('Unable to load featured tours.');
      }
    }

    loadFeatured();
  }, []);

  function handleSearch(event) {
    event.preventDefault();
    const query = destination.trim();

    if (query) {
      navigate(`/tours?destination=${encodeURIComponent(query)}`);
    } else {
      navigate('/tours');
    }
  }

  return (
    <div>
      <section className="hero">
        <div>
          <p className="hero-badge">AI-powered travel planning</p>
          <h1>Find your perfect tour with FindMyTour.AI</h1>
          <p>
            Search curated tours or let AI build a personalized itinerary based
            on your travel style, budget, and interests.
          </p>

          <form className="hero-form" onSubmit={handleSearch}>
            <input
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
              placeholder="Where do you want to go?"
            />
            <button type="submit" className="button">
              Search
            </button>
          </form>

          <div className="hero-links">
            <button
              type="button"
              className="ghost-button"
              onClick={() => navigate('/ai')}
            >
              Try AI Planner
            </button>
            <button
              type="button"
              className="ghost-button"
              onClick={() => navigate('/tours')}
            >
              Browse all tours
            </button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <h2>Featured tours</h2>
        </div>

        <ErrorBanner message={error} />

        <div className="grid">
          {featured.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </section>
    </div>
  );
}
