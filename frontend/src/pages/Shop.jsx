import React from 'react';

const products = [
  {
    id: 1,
    name: "Classic Campaign T-Shirt",
    price: 25.00,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=500",
    category: "Apparel"
  },
  {
    id: 2,
    name: "Official Logo Hoodie",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=500",
    category: "Apparel"
  },
  {
    id: 3,
    name: "Caledon Strong Tote",
    price: 15.00,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=500",
    category: "Accessories"
  },
  {
    id: 4,
    name: "Campaign Lawn Sign (Pack of 5)",
    price: 40.00,
    image: "https://images.unsplash.com/photo-1532622785990-d2c36a76f5a6?auto=format&fit=crop&q=80&w=500",
    category: "Signage"
  },
  {
    id: 5,
    name: "Jagdeep 2026 Bumper Sticker",
    price: 5.00,
    image: "https://images.unsplash.com/photo-1572375927502-1210c16905d4?auto=format&fit=crop&q=80&w=500",
    category: "Accessories"
  },
  {
    id: 6,
    name: "Signature Campaign Hat",
    price: 20.00,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e1c7?auto=format&fit=crop&q=80&w=500",
    category: "Apparel"
  }
];

function Shop() {
  return (
    <main className="shop-page">
      <section className="section shop-hero">
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
          <span className="section-subtitle">CAMPAIGN MERCHANDISE</span>
          <h1 className="section-title">WEAR THE MOVEMENT</h1>
          <p style={{ maxWidth: '700px', margin: '1rem auto', fontSize: '1.2rem', color: '#666' }}>
            Show your support for Jagdeep across Caledon. All proceeds go directly to funding our campaign for a better community.
          </p>
        </div>

        <div className="shop-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-wrap">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-overlay">
                  <button className="btn btn-primary">ADD TO CART</button>
                </div>
              </div>
              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <span className="product-price">${product.price.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Shop;
