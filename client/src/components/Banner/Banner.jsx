const TopBanner = () => {
  return (
    <div className="w-full bg-gradient-to-bl from-accent via-secondary to-primary text-base-content text-sm px-0 py-0 overflow-x-hidden">
      <div className="flex justify-evenly items-center gap-x-1 w-full px-0">
        {/* Social Icons */}
        <div className="pl-4 pr-6 py-2 flex items-center space-x-3 text-primary-content">
          <i className="bi bi-facebook"></i>
          <i className="bi bi-twitter"></i>
          <i className="bi bi-instagram"></i>
          <i className="bi bi-youtube"></i>
        </div>

        {/* Location */}
        <div className="flex-1 flex justify-center items-center space-x-1 text-primary-content">
          <i className="bi bi-geo-alt-fill text-primary-content"></i>
          <span>Victorville, California 92392</span>
        </div>

        {/* Phone Icon with number */}
        <div className="flex-1 flex justify-center items-center space-x-1 text-sm">
          <i className="bi bi-telephone text-primary-content"></i>
          <span className="text-xs font-semibold text-primary-content">
            +1 (760) 885–7425
          </span>
        </div>

        {/* Login / Register */}
        <div className="flex items-center space-x-2 me-4 text-primary-content">
          <i className="bi bi-person-circle text-primary-content"></i>
          <a href="#" className="hover:underline">
            Login or Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
