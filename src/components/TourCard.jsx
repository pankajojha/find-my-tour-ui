import { Link } from 'react-router-dom';

export default function TourCard({ tour }) {
  return (
    <article className="card">
      <div
        className="card-media"
        style={
          tour.image
            ? { backgroundImage: `url(${tour.image})` }
            : undefined
        }
      >
        <span className="badge">{tour.days} days</span>
      </div>

      <div className="card-body">
        <div className="card-title-row">
          <h3>{tour.title}</h3>
          <span className="rating">★ {tour.rating}</span>
        </div>

        <p className="muted">{tour.destination}</p>
        <p>{tour.summary}</p>

        <div className="tag-row">
          {(tour.tags || []).map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="card-actions">
          <Link className="button" to={`/tours/${tour.id}`}>
            View tour
          </Link>
        </div>
      </div>
    </article>
  );
}
