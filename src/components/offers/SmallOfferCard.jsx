const SmallOfferCard = ({ offer }) => {
  return (
    <div className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 group cursor-pointer">
      <img
        src={offer.image}
        alt={offer.alt}
        className="w-full h-[296px] object-cover group-hover:scale-105 transition duration-500"
      />
    </div>
  );
};

export default SmallOfferCard;