<template>
  <div class="full-page">
    <!-- Navigation Bar -->
    <AuthNavigation />

    <!-- Title Section -->
    <div class="title-section">
      <span class="title-text">Pricing</span>
    </div>

    <!-- Pricing Sections -->
    <div class="pricing-table">
      <div class="ptable-item">
        <div class="ptable-single">
          <div class="ptable-header">
            <div class="ptable-title">
              <h2>Basic Plan</h2>
            </div>
            <div class="ptable-price">
              <h2><small>$</small>9.99<span>/ M</span></h2>
            </div>
          </div>
          <div class="ptable-body">
            <div class="ptable-description">
              <ul>
                <li>Pure HTML & CSS</li>
                <li>Responsive Design</li>
                <li>Well-commented Code</li>
                <li>Easy to Use</li>
              </ul>
            </div>
          </div>
          <div class="ptable-footer">
            <div class="ptable-action">
              <a href="#">Buy Now</a>
            </div>
          </div>
        </div>
      </div>

      <div class="ptable-item featured-item">
        <div class="ptable-single">
          <div class="ptable-header">
            <div class="ptable-status">
              <span>Hot</span>
            </div>
            <div class="ptable-title">
              <h2>Standard Plan</h2>
            </div>
            <div class="ptable-price">
              <h2><small>$</small>19.99<span>/ M</span></h2>
            </div>
          </div>
          <div class="ptable-body">
            <div class="ptable-description">
              <ul>
                <li>Pure HTML & CSS</li>
                <li>Responsive Design</li>
                <li>Well-commented Code</li>
                <li>Easy to Use</li>
              </ul>
            </div>
          </div>
          <div class="ptable-footer">
            <div class="ptable-action">
              <a href="#">Buy Now</a>
            </div>
          </div>
        </div>
      </div>

      <div class="ptable-item">
        <div class="ptable-single">
          <div class="ptable-header">
            <div class="ptable-title">
              <h2>Premium Plan</h2>
            </div>
            <div class="ptable-price">
              <h2><small>$</small>29.99<span>/ M</span></h2>
            </div>
          </div>
          <div class="ptable-body">
            <div class="ptable-description">
              <ul>
                <li>Pure HTML & CSS</li>
                <li>Responsive Design</li>
                <li>Well-commented Code</li>
                <li>Easy to Use</li>
              </ul>
            </div>
          </div>
          <div class="ptable-footer">
            <div class="ptable-action">
              <a href="#">Buy Now</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import Footer from '@/Components/Footer.vue';
import AuthNavigation from '@/Components/AuthNavigation.vue'
</script>

<style scoped>
.full-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #FAFAFA;
  padding: 20px;
}

/* Title Section */
.title-section {
  margin: 150px 0 20px 0;
}

.title-text {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 800;
  font-size: 52px;
  background: linear-gradient(91.19deg, #D6AD60 33.5%, #705B32 64.3%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  white-space: nowrap;
}

/* Pricing Table */
.pricing-table {
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  background: transparent;
}

.pricing-table .ptable-item {
  width: 33.33%;
  padding: 0 15px;
  margin-bottom: 30px;
}

@media (max-width: 992px) {
  .pricing-table .ptable-item {
    width: 33.33%;
  }
}

@media (max-width: 768px) {
  .pricing-table .ptable-item {
    width: 50%;
  }
}

@media (max-width: 576px) {
  .pricing-table .ptable-item {
    width: 100%;
  }
}

.pricing-table .ptable-single {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
}

.pricing-table .ptable-single:hover {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.pricing-table .ptable-header,
.pricing-table .ptable-body,
.pricing-table .ptable-footer {
  position: relative;
  width: 100%;
  text-align: center;
  overflow: hidden;
}

.pricing-table .ptable-status,
.pricing-table .ptable-title,
.pricing-table .ptable-price,
.pricing-table .ptable-description,
.pricing-table .ptable-action {
  position: relative;
  width: 100%;
  text-align: center;
}

.pricing-table .ptable-single {
  background: #ffffff;
}

.pricing-table .ptable-header {
  margin: 0 30px;
  padding: 30px 0 45px 0;
  width: auto;
  background: #2A293E;
}

.pricing-table .ptable-header::before,
.pricing-table .ptable-header::after {
  content: "";
  position: absolute;
  bottom: 0;
  width: 0;
  height: 0;
  border-bottom: 100px solid #f6f8fa;
}

.pricing-table .ptable-header::before {
  right: 50%;
  border-right: 250px solid transparent;
}

.pricing-table .ptable-header::after {
  left: 50%;
  border-left: 250px solid transparent;
}

.pricing-table .ptable-item.featured-item .ptable-header {
  background: #FF6F61;
}

.pricing-table .ptable-status {
  margin-top: -30px;
}

.pricing-table .ptable-status span {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 30px;
  padding: 5px 0;
  text-align: center;
  color: #FF6F61;
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 1px;
  background: #2A293E; /* Keep status background same */
}

.pricing-table .ptable-status span::before,
.pricing-table .ptable-status span::after {
  content: "";
  position: absolute;
  bottom: 0;
  width: 0;
  height: 0;
  border-bottom: 10px solid #FF6F61;
}

.pricing-table .ptable-status span::before {
  right: 50%;
  border-right: 25px solid transparent;
}

.pricing-table .ptable-status span::after {
  left: 50%;
  border-left: 25px solid transparent;
}

.pricing-table .ptable-title h2 {
  color: #ffffff;
  font-size: 24px;
  font-weight: 300;
  letter-spacing: 2px;
}

.pricing-table .ptable-price h2 {
  margin: 0;
  color: #ffffff;
  font-size: 45px;
  font-weight: 700;
  margin-left: 15px;
}

.pricing-table .ptable-price h2 small {
  position: absolute;
  font-size: 18px;
  font-weight: 300;
  margin-top: 16px;
  margin-left: -15px;
}

.pricing-table .ptable-price h2 span {
  margin-left: 3px;
  font-size: 16px;
  font-weight: 300;
}

.pricing-table .ptable-body {
  padding: 20px 0;
}

.pricing-table .ptable-description ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.pricing-table .ptable-description ul li {
  color: #2A293E;
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 1px;
  padding: 7px;
  border-bottom: 1px solid #f6f8fa;
}

.pricing-table .ptable-footer {
  padding: 25px 0 40px 0;
}

.pricing-table .ptable-action a {
  position: relative;
  display: inline-block;
  padding: 10px 30px;
  color: #FF6F61;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1px;
  background: transparent;
  border: 1px solid #FF6F61;
  transition: all 0.3s ease;
}

.pricing-table .ptable-action a:hover {
  color: #ffffff;
  background: #FF6F61;
}
</style>
