import { Link } from 'react-router-dom';

export default function MobileDock() {
  return (
    <div className="dock xl:hidden fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 bg-base-100 shadow-lg rounded-b-xl p-2">
      <div className="dock-item">
        <Link to="/" className="tooltip" data-tip="Home">
          <i className="bi bi-house text-xl"></i>
        </Link>
      </div>
      <div className="dock-item">
        <Link to="/chefs" className="tooltip" data-tip="Chefs">
          <i className="bi bi-people text-xl"></i>
        </Link>
      </div>
      <div className="dock-item">
        <Link to="/menu" className="tooltip" data-tip="Menu">
          <i className="bi bi-list text-xl"></i>
        </Link>
      </div>
      <div className="dock-item">
        <Link to="/pickup" className="tooltip" data-tip="Pickup">
          <i className="bi bi-bag-check text-xl"></i>
        </Link>
      </div>
      <div className="dock-item">
        <Link to="/delivery" className="tooltip" data-tip="Delivery">
          <i className="bi bi-car-front-fill text-xl"></i>
        </Link>
      </div>
      <div className="dock-item">
        <Link to="/catering" className="tooltip" data-tip="Catering">
          <i className="bi bi-fork-knife text-xl"></i>
        </Link>
      </div>
    </div>
  );
}