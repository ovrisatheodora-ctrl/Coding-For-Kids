import { Link } from 'react-router-dom';
import './NotFoundPage.css';

function NotFoundPage({ t }) {
  return (
    <main id="main-content" className="notfound-page">
      <div className="notfound-inner">
        <div className="notfound-emoji" aria-hidden="true">🤖</div>
        <h1 className="notfound-code">404</h1>
        <h2 className="notfound-title">Oops! Page Not Found</h2>
        <p className="notfound-desc">
          The page you're looking for doesn't exist yet.<br />
          Let's go back to the adventure!
        </p>
        <Link to="/" className="btn btn-primary notfound-btn">
          ← Go Home
        </Link>
      </div>
    </main>
  );
}

export default NotFoundPage;
