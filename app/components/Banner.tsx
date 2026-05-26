export default function Banner() {
  return (
    <section className="banner">
      <div className="banner-left">
        <div className="banner-icon"><i className="fa-solid fa-award"></i></div>
        <div>
          <strong>You have access to all Gold features!</strong>
          <p>Make the most of AI-powered tools, live training, and expert support to ace your PMP® exam.</p>
        </div>
      </div>
      <button className="banner-btn">
        <i className="fa-solid fa-crown"></i> Explore Gold Features <i className="fa-solid fa-arrow-right"></i>
      </button>
    </section>
  );
}
