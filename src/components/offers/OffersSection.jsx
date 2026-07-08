import LargeOfferCard from "./LargeOfferCard";
import SmallOfferCard from "./SmallOfferCard";
import { largeOffer, smallOffers } from "./offerData";

const OffersSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1450px] mx-auto px-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Large Banner */}
          <div className="lg:col-span-2">
            <LargeOfferCard offer={largeOffer} />
          </div>

          {/* Right Small Banners */}
          <div className="flex flex-col gap-8">
            {smallOffers.map((offer) => (
              <SmallOfferCard
                key={offer.id}
                offer={offer}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default OffersSection;