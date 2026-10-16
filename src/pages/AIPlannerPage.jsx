import { useState } from 'react';
import { generateItinerary } from '../api/tours';
import Loading from '../components/Loading';
import ErrorBanner from '../components/ErrorBanner';

export default function AIPlannerPage() {
  const [prompt, setPrompt] = useState('');
  const [destination, setDestination] = useState('alaska');
  const [days, setDays] = useState(5);
  const [interests, setInterests] = useState('food and hiking');
  const [budget, setBudget] = useState('5000');

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleGenerate(event) {
    event.preventDefault();

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const itinerary = await generateItinerary({
        prompt,
        destination,
        days,
        interests,
        budget
      });

      setResult(itinerary);
    } catch {
      setError('Unable to generate itinerary.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="section planner-layout">
      <div className="section-heading planner-heading">
        <h1>FindMyTour.AI Planner</h1>
        <p className="muted">
          Describe your ideal trip and generate a personalized itinerary.
        </p>
      </div>

      <form className="planner-form" onSubmit={handleGenerate}>
        <textarea
          required
          rows={6}
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Plan a 7 day itinerary"
        />

        <div className="planner-field-grid">
          <label className="planner-input-card">
            <input
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
              placeholder="alaska"
            />
          </label>

          <label className="planner-input-card">
            <input
              type="number"
              min="1"
              max="14"
              value={days}
              onChange={(event) => setDays(event.target.value)}
              placeholder="5"
            />
          </label>

          <label className="planner-input-card planner-input-card--highlight">
            <input
              value={interests}
              onChange={(event) => setInterests(event.target.value)}
              placeholder="food and hiking"
            />
            <div className="planner-budget-row">
              <span>$</span>
              <input
                type="number"
                min="0"
                value={budget}
                onChange={(event) => setBudget(event.target.value)}
                placeholder="5000"
              />
            </div>
          </label>
        </div>

        <button className="planner-submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate itinerary'}
        </button>
      </form>

      {loading && <Loading message="Generating AI itinerary..." />}
      <ErrorBanner message={error} />

      {result && (
        <div className="ai-result">
          <h2>{result.title || 'Your AI itinerary'}</h2>

          {result.meta && (
            <p className="muted">
              Destination: {result.meta.destination || 'Not specified'} · Days:{' '}
              {result.meta.days || days} · Budget: {result.meta.budget || 'N/A'}
            </p>
          )}

          <div className="itinerary">
            {(result.days || []).map((day) => (
              <div key={day.day} className="itinerary-item">
                <div className="itinerary-day">Day {day.day}</div>
                <div>
                  <strong>{day.title}</strong>
                  <p className="muted">{day.summary}</p>

                  <ul>
                    {(day.activities || []).map((activity, index) => (
                      <li key={index}>{activity}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
