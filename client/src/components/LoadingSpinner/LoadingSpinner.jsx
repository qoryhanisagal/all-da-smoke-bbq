const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <span className="loading loading-spinner loading-lg text-primary mb-4"></span>
        <h2 className="text-2xl font-semibold mb-2">{message}</h2>
        <p className="text-base-content/70">Please wait while we fetch the latest menu data</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;