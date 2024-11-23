import React from 'react';


const HomePage = () => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to GroceryMart</h1>
          <p>Your one-stop shop for fresh groceries and more</p>
          <button className="cta-button">Shop Now</button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <h2>Shop by Categories</h2>
        <div className="category-list">
          <div className="category-card">
            <img src="https://via.placeholder.com/150" alt="Fruits" />
            <h3>Fruits</h3>
          </div>
          <div className="category-card">
            <img src="https://via.placeholder.com/150" alt="Vegetables" />
            <h3>Vegetables</h3>
          </div>
          <div className="category-card">
            <img src="https://via.placeholder.com/150" alt="Dairy" />
            <h3>Dairy</h3>
          </div>
          <div className="category-card">
            <img src="https://via.placeholder.com/150" alt="Beverages" />
            <h3>Beverages</h3>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-list">
          <div className="product-card">
            <img src="https://via.placeholder.com/200" alt="Apple" />
            <h3>Fresh Apple</h3>
            <p>$2.99 / lb</p>
          </div>
          <div className="product-card">
            <img src="https://via.placeholder.com/200" alt="Carrot" />
            <h3>Organic Carrot</h3>
            <p>$1.99 / lb</p>
          </div>
          <div className="product-card">
            <img src="https://via.placeholder.com/200" alt="Milk" />
            <h3>Whole Milk</h3>
            <p>$1.50 / gallon</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 GroceryMart. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
