import { Link } from 'react-router-dom';

export default function MobileDock() {
  return (
    <div className="dock lg:hidden fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 bg-base-100 shadow-lg rounded-t-xl p-3 border-t border-base-300">
      <div className="dock-item">
        <Link to="/" className="tooltip" data-tip="Home">
          <i className="bi bi-house text-xl"></i>
        </Link>
      </div>
      <div className="dock-item">
        <Link to="/menu" className="tooltip" data-tip="Menu">
          <i className="bi bi-list text-xl"></i>
        </Link>
      </div>
      <div className="dock-item">
        <Link to="/order" className="tooltip" data-tip="Order">
          <i className="bi bi-bag-check text-xl"></i>
        </Link>
      </div>
      <div className="dock-item">
        <Link to="/about" className="tooltip" data-tip="Our Story">
          <i className="bi bi-book text-xl"></i>
        </Link>
      </div>
      <div className="dock-item">
        <Link to="/catering" className="tooltip" data-tip="Catering">
          <i className="bi bi-fork-knife text-xl"></i>
        </Link>
      </div>
      <div className="dock-item">
        <Link to="/newsletter" className="tooltip" data-tip="Newsletter">
          <i className="bi bi-envelope-paper text-xl"></i>
        </Link>
      </div>
      <div className="dock-item">
        <Link to="/contact" className="tooltip" data-tip="Contact">
          <i className="bi bi-telephone text-xl"></i>
        </Link>
      </div>
    </div>
  );
}
