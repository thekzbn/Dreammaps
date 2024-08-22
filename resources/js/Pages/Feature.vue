<template>
  <div class="full-page">
    <!-- Navigation Bar -->
    <AuthNavigation />

    <!-- Title Section -->
    <div class="title-section">
      <span class="title-text">Features</span>
    </div>

    <!-- Features Sections -->
    <div class="features-container">
      <!-- First Grid -->
      <div class="feature-grid">
        <div class="empty-side">
          <img src="/assets/images/gold_transformed_1.png" alt="Gold Transform" class="responsive-image">
        </div>
        <div class="feature-item">
          <div class="feature-title">Subject Selection</div>
          <div class="feature-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec ipsum id ligula ultricies volutpat pharetra a nulla. Vestibulum vel orci sed purus euismod tincidunt. Sed sem ex, feugiat eget pretium nec, malesuada non turpis. Aliquam quis vehicula turpis. Suspendisse imperdiet dui quis lobortis aliquet. Mauris rutrum tortor gravida massa dignissim scelerisque. Donec laoreet, turpis nec vehicula mattis, orci ante condimentum diam, auctor bibendum mauris diam nec nulla.
          </div>
        </div>
      </div>

      <!-- Second Grid -->
      <div class="feature-grid">
        <div class="feature-item">
          <div class="feature-title">Career Alternative Suggestion</div>
          <div class="feature-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec ipsum id ligula ultricies volutpat pharetra a nulla. Vestibulum vel orci sed purus euismod tincidunt. Sed sem ex, feugiat eget pretium nec, malesuada non turpis. Aliquam quis vehicula turpis. Suspendisse imperdiet dui quis lobortis aliquet. Mauris rutrum tortor gravida massa dignissim scelerisque. Donec laoreet, turpis nec vehicula mattis, orci ante condimentum diam, auctor bibendum mauris diam nec nulla.
          </div>
        </div>
        <div class="empty-side"></div>
      </div>

      <!-- Third Grid -->
      <div class="feature-grid">
        <div class="empty-side"></div>
        <div class="feature-item">
          <div class="feature-title">Finance Assistance</div>
          <div class="feature-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec ipsum id ligula ultricies volutpat pharetra a nulla. Vestibulum vel orci sed purus euismod tincidunt. Sed sem ex, feugiat eget pretium nec, malesuada non turpis. Aliquam quis vehicula turpis. Suspendisse imperdiet dui quis lobortis aliquet. Mauris rutrum tortor gravida massa dignissim scelerisque. Donec laoreet, turpis nec vehicula mattis, orci ante condimentum diam, auctor bibendum mauris diam nec nulla.
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
  margin: 150px 0 20px 0; /* Added margin-top */
}

.title-text {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 800;
  font-size: 52px;
  background: linear-gradient(91.19deg, #D6AD60 33.5%, #705B32 64.3%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  white-space: nowrap; /* Prevent text from breaking */
}

/* Features Container */
.features-container {
  width: 100%;
  max-width: 1500px;
  display: flex;
  flex-direction: column;
  gap: 70px; /* Increased gap */
  margin-bottom: 100px; /* Added margin-bottom */
}

.feature-grid {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px; /* Increased gap */
}

.empty-side {
  flex: 1;
}

.feature-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
}

.feature-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 800;
  font-size: 30px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #18181B;
}

.feature-description {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #000000;
  text-align: left;
}

.feature-button {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #FFFFFF;
  background: linear-gradient(270deg, #000000, #000000);
  border: none;
  border-radius: 10px;
  padding: 16px 20px;
  cursor: pointer;
}

/* Responsive Image */
.responsive-image {
  width: 100%;
  max-width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  object-position: center;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .title-text {
    font-size: 40px;
  }

  .features-container {
    gap: 50px;
  }

  .feature-grid {
    flex-direction: column;
    gap: 20px;
  }

  .feature-title {
    font-size: 26px;
  }

  .feature-description {
    font-size: 14px;
  }
}

@media (max-width: 768px) {
  .title-text {
    font-size: 36px;
  }

  .feature-title {
    font-size: 22px;
  }

  .feature-description {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .title-text {
    font-size: 28px;
  }

  .feature-title {
    font-size: 18px;
  }

  .feature-description {
    font-size: 10px;
  }
}
</style>
