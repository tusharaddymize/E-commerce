const CategoryBanner = ({
  title,
  theme,
}) => {
  return (
    <section
      className="rounded-3xl overflow-hidden text-white p-10 mb-8"
      style={{
        background: `linear-gradient(
          135deg,
          ${theme?.primaryColor || "#355E3B"},
          ${theme?.secondaryColor || "#27452d"}
        )`,
      }}
    >
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