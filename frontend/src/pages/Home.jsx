import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../api'; 
import '../styles/Home.css';
import image1 from '../assets/images/restaurant_inside_alternative.jpg';
import image2 from '../assets/images/restaurant_inside.jpg';
import { useNavigate } from 'react-router-dom'; 

function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [menuItems, setMenuItems] = useState([]); 
    const [categories, setCategories] = useState([]); 
    const [activeCategory, setActiveCategory] = useState(null); 
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null); 
    const images = [image1, image2, image1, image2];
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
        }, 5000); 
        return () => clearInterval(interval);
    }, [images.length]);

    const goToNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    };

    const goToPrevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                const menuResponse = await api.get('/api/menu/');
                const categoriesResponse = await api.get('/api/categories');
                console.log('Menu Items:', menuResponse.data);
                console.log('Categories:', categoriesResponse.data);

                setMenuItems(menuResponse.data);
                setCategories(categoriesResponse.data);
            } catch (error) {
                console.error('Error fetching menu data:', error);
                setError('Failed to load menu items. Please try again later.');
            } finally {
                setIsLoading(false); 
            }
        };

        fetchMenuData();
    }, []);


    const filteredMenuItems = activeCategory
        ? menuItems.filter((item) => item.category.name === activeCategory)
        : menuItems;

    return (
        <div className="home">
            <Header />
            {/* Introduction Section */}
            <section className="intro">
                <div className="container">
                    <h1 className="heading">Down the Alleyway...</h1>
                    <p>
                        In the fall of 2004, we happened upon a perfect cozy space at the end of an unused alley off the Bowery, and Freemans Restaurant was born.
                    </p>
                    <p>
                        The idea of the restaurant was to make a rugged clandestine colonial American Tavern. The cuisine was also imagined to early American: Simple, Rustic, and inspired by Old World traditions.
                    </p>
                </div>
            </section>

            {/* Hours Section */}
            <section className="hours">
                <div className="container">
                    <h2 className="heading">Hours</h2>
                    <div className="hours-container">
                        <div className="hours-item">
                            <h3>Lunch</h3>
                            <p>Mon-Fri 11:00AM to 3:00PM</p>
                        </div>
                        <div className="hours-item">
                            <h3>Brunch</h3>
                            <p>Sat-Sun 11:00AM to 3:00PM</p>
                        </div>
                        <div className="hours-item">
                            <h3>Dinner</h3>
                            <p>Sun-Mon 5:00PM to 10:00PM</p>
                            <p>Tue-Sat 5:00PM to 11:00PM</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Carousel Section */}
            <div className="carousel">
                {/* Left Arrow */}
                <button className="carousel-control left" onClick={goToPrevSlide} aria-label="Previous Slide">
                    &lt;
                </button>

                {/* Carousel Images */}
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className={`carousel-image ${currentSlide === index ? 'active' : ''}`}
                    />
                ))}

                {/* Right Arrow */}
                <button className="carousel-control right" onClick={goToNextSlide} aria-label="Next Slide">
                    &gt;
                </button>
            </div>

            {/* Dots Navigation */}
            <div className="dots">
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${currentSlide === index ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Slide ${index + 1}`}
                    ></span>
                ))}
            </div>

            {/* Categories Section */}
            <section className="categories">
                <div className="container">
                    <h2 className="heading">Our Menu</h2>
                    <div className="category-buttons">
                        {categories.length > 0 ? (
                            categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.name)}
                                    className={`category-button ${activeCategory === category.name ? 'active' : ''}`}
                                    aria-label={`Category: ${category.name}`}
                                >
                                    {category.name}
                                </button>
                            ))
                        ) : (
                            <p>Loading categories...</p>
                        )}
                    </div>
                    {/* Reset button */}
                    {activeCategory && (
                        <button
                            onClick={() => {
                                setActiveCategory(null); 
                                navigate('/menu');
                            }}
                            className="reset-category"
                            aria-label="Show All Menu Items"
                        >
                            Show All
                        </button>
                    )}
                </div>
            </section>

            {/* Highlighted Menu Section */}
            {/* Highlighted Menu Section */}
            <section className="highlighted-menu">
                <div className="container">
                    {isLoading ? (
                        <p>Loading menu items...</p>
                    ) : error ? (
                        <p>{error}</p> 
                    ) : (
                        <div className="menu-items">
                            {filteredMenuItems.length > 0 ? (
                                filteredMenuItems.slice(0, 4).map((item) => ( 
                                    <div key={item.id} className="menu-item-card">
                                        <img src={item.image} alt={item.name} />
                                        <h3>{item.name}</h3>
                                        
                                        <span className="menu-item-price">${item.price}</span>
                                        <button className="login-button" aria-label={`Add ${item.name} to cart`} onClick={() => navigate('/cart')}>
                                            Add to Cart
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p>No items available in this category.</p>
                            )}
                        </div>
                    )}
                </div>
            </section>
            <section className="reservation-policy">
                <div className="container">
                    <h2 className="heading">Reservation Policy</h2>
                    <p>
                        Little Lemon accepts reservations for parties of 1-8 guests 14 days in advance.
                    </p>
                    <p>
                        Groups of 9 and above are accommodated in a private room. Please email us for more details.
                    </p>
                    <p>
                        Please email us for options for private parties.
                    </p>
                    <p>
                        Walk-ins for small parties are encouraged at any time.
                    </p>
                    <p>
                        A portion of seating is held for walk-in guests. We seat only completed parties on a first-come, first-served basis.
                    </p>
                    
                    <button className="login-button" onClick={() => { navigate('/book');}}>
                        Book Now
                    </button>
                </div>
            </section>



            {/* Footer Section */}
            <Footer />
        </div>
    );
}

export default Home;
