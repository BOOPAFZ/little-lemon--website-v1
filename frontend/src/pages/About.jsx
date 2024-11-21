import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/About.css";
import restaurantImage from "../assets/images/restaurant_inside.jpg";

function About() {
  return (
    <div>
      <Header />
      <main className="about-page">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-overlay">
            <div className="hero-content">
              <h1>Welcome to Little Lemon</h1>
              <p>
                Where traditional Mediterranean recipes meet a modern twist. Experience a world of flavor, inspired by Italy, Greece, and Turkey.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="story-section">
          <div className="container">
            <h2>Our Story</h2>
            <div className="story-content">
              <div className="story-text">
                <p>
                  Based in Chicago, Illinois, Little Lemon was founded by two Italian brothers, Mario and Adrian. Together, they combined their passion for Mediterranean cuisine to create a one-of-a-kind restaurant that balances rustic charm with contemporary elegance.
                </p>
                <p>
                  Our rotating menu of 12-15 items ensures that every visit offers something fresh and exciting, with dishes inspired by authentic family recipes and seasonal ingredients.
                </p>
              </div>
              <img
                src={restaurantImage}
                alt="Little Lemon interior"
                className="story-image"
              />
            </div>
          </div>
        </section>

        {/* Meet the Owners Section */}
        <section className="owners-section">
          <div className="container">
            <h2>Meet the Owners</h2>
            <div className="owners">
              <div className="owner-card">
                <div className="owner-image-wrapper">
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Mario"
                    className="owner-image"
                  />
                </div>
                <h3>Mario</h3>
                <p>
                  Mario is the creative chef behind Little Lemon, crafting dishes with a blend of tradition and innovation. His recipes are inspired by his childhood in Italy and his experience working in top kitchens across Europe.
                </p>
              </div>
              <div className="owner-card">
                <div className="owner-image-wrapper">
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Adrian"
                    className="owner-image"
                  />
                </div>
                <h3>Adrian</h3>
                <p>
                  Adrian oversees marketing and strategy, ensuring Little Lemon stays true to its roots while reaching a wider audience. His vision brought in Greek and Turkish influences, expanding the menu beyond classic Italian.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="cta-section">
          <div className="cta-content">
            <h2>Visit Us Today</h2>
            <p>Experience Mediterranean hospitality and indulge in dishes crafted with care and love.</p>
            <a href="/reserve" className="cta-button">
              Reserve a Table
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default About;
