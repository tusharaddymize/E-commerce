const HeroDots = ({ slides, current, setCurrent }) => {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">

      {slides.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrent(index)}
          className={`transition-all duration-300 rounded-full ${
            current === index
              ? "w-8 h-3 bg-orange-500"
              : "w-3 h-3 bg-gray-300 hover:bg-orange-300"
          }`}
        />
      ))}

    </div>
  );
};

export default HeroDots;