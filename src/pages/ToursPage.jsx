import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchTours } from '../api/tours';
import TourCard from '../components/TourCard';
import Loading from '../components/Loading';
import ErrorBanner from '../components/ErrorBanner';

export default function ToursPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [destination, setDestination] = useState(
    searchParams.get('destination') || ''
  );
  const [maxPrice, setMaxPrice] = useState(
    searchParams.get('maxPrice') || ''
  );

  useEffect(() => {
    let active = true;

    async function loadTours() {
      setLoading(true);
      setError('');

      try {
        const params = Object.fromEntries(searchParams.entries());
        const data = await fetchTours(params);

        if (active) {
          setTours(data);
        }
      } catch {
        if (active) {
          setError('Unable to load tours.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadTours();

    return () => {
      active = false;
    };
  }, [searchParams]);

  function handleSearch(event) {
    event.preventDefault();

    const nextParams = new URLSearchParams();

    if (destination.trim()) {
      nextParams.set('destination', destination.trim());
    }

    if (maxPrice.trim()) {
      nextParams.set('maxPrice', maxPrice.trim());
    }

    setSearchParams(nextParams);
  }

  function handleClear() {
    setDestination('');
    setMaxPrice('');
    setSearchParams(new URLSearchParams());
  }

  return (
    <div className="section">
      <div className="section-heading">
        <h1>Explore tours</h1>
        <p className="muted">
          Search tours by destination, price, or travel style.
        </p>
      </div>

      <form className="filter-form" onSubmit={handleSearch}>
        <input
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
          placeholder="Destination or keyword"
        />

        <input
          value={maxPrice}
          onChange={(event) => setMaxPrice(event.target.value)}
          placeholder="Max price"
          type="number"
          min="0"
        />

        <button type="submit" className="button">
          Apply filters
        </button>

        <button type="button" className="ghost-button" onClick={handleClear}>
          Clear
        </button>
      </form>

      {loading && <Loading message="Loading tours..." />}
      <ErrorBanner message={error} />

      {!loading && tours.length === 0 && (
        <div className="empty-state">No tours found.</div>
      )}

      <div className="grid">
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </div>
  );
}
