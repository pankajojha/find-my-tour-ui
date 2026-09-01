import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ToursPage from './pages/ToursPage';
import TourDetailPage from './pages/TourDetailPage';
import AIPlannerPage from './pages/AIPlannerPage';
import BookingsPage from './pages/BookingsPage';
import RequireAuth from './components/RequireAuth';

function NotFoundPage() {
  return (
    <div className="empty-state">
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/tours" element={<ToursPage />} />
        <Route path="/tours/:id" element={<TourDetailPage />} />
        <Route
          path="/ai"
          element={
            <RequireAuth title="Sign in to plan your trip">
              <AIPlannerPage />
            </RequireAuth>
          }
        />
        <Route
          path="/bookings"
          element={
            <RequireAuth title="Sign in to see your bookings">
              <BookingsPage />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
