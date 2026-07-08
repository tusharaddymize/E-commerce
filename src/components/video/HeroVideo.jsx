import heroVideo from "../../assets/videos/hero-video.mp4";

const HeroVideo = () => {
  return (
    <section className="w-full overflow-hidden bg-black">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-[650px] object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
    </section>
  );
};

export default HeroVideo;