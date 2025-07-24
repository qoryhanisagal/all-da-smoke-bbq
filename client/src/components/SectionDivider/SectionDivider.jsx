const SectionDivider = ({ className = '' }) => {
  return (
    <div className={`divider divider-neutral my-8 ${className}`}>
      <span className="text-base-content/30 font-mono tracking-[0.5em]">
        ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
      </span>
    </div>
  );
};

export default SectionDivider;
