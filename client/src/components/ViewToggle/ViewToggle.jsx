export default function ViewToggle({ view, onChange }) {
  return (
    <div className="flex bg-base-300 rounded-lg p-1 w-fit">
      <button
        className={`px-6 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-200 rounded-md ${
          view === 'carousel'
            ? 'bg-base-100 text-base-content shadow-sm'
            : 'text-base-content/70 hover:text-base-content'
        }`}
        onClick={() => onChange('carousel')}
      >
        Carousel View
      </button>
      <button
        className={`px-6 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-200 rounded-md ${
          view === 'list'
            ? 'bg-base-100 text-base-content shadow-sm'
            : 'text-base-content/70 hover:text-base-content'
        }`}
        onClick={() => onChange('list')}
      >
        List View
      </button>
    </div>
  );
}