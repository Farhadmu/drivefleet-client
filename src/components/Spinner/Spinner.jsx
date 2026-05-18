const Spinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-dark-border rounded-full animate-spin border-t-primary"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-primary text-xs font-heading tracking-widest">DF</span>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
