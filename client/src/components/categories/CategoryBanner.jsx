const CategoryBanner = ({ title }) => {
  return (
    <section className="rounded-3xl overflow-hidden bg-gradient-to-r from-[#355E3B] to-[#27452d] text-white p-10 mb-8">
      <h1 className="text-4xl font-bold capitalize">
        {title}
      </h1>

      <p className="mt-3 text-white/80 max-w-xl">
        Discover premium quality products with
        the best offers and latest arrivals.
      </p>
    </section>
  );
};

export default CategoryBanner;