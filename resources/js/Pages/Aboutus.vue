<template>
  <div class="full-page">
    <!-- Navigation Bar -->
    <AuthNavigation />

    <!-- Title Section -->
    <div class="title-section">
      <span class="title-text">About Us</span>
    </div>

    <!-- About Us Sections -->
    <div class="about-container">
      <div class="about-grid">
        <div class="about-item">
          <div class="about-title">Our Mission</div>
          <div class="about-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec ipsum id ligula ultricies volutpat pharetra a nulla. Vestibulum vel orci sed purus euismod tincidunt. Sed sem ex, feugiat eget pretium nec, malesuada non turpis. Aliquam quis vehicula turpis. Suspendisse imperdiet dui quis lobortis aliquet. Mauris rutrum tortor gravida massa dignissim scelerisque. Donec laoreet, turpis nec vehicula mattis, orci ante condimentum diam, auctor bibendum mauris diam nec nulla.
          </div>
        </div>
        <div class="about-item">
          <div class="about-title">Our Team</div>
          <div class="about-description">
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

/* About Container */
.about-container {
  width: 100%;
  max-width: 1500px;
  display: flex;
  flex-direction: column;
  gap: 70px; /* Increased gap */
  margin-bottom: 100px; /* Added margin-bottom */
}

.about-grid {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px; /* Increased gap */
}

.about-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
}

.about-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 800;
  font-size: 30px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #18181B;
}

.about-description {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #000000;
  text-align: left;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .title-text {
    font-size: 40px;
  }

  .about-container {
    gap: 50px;
  }

  .about-grid {
    flex-direction: column;
    gap: 20px;
  }

  .about-title {
    font-size: 26px;
  }

  .about-description {
    font-size: 14px;
  }
}

@media (max-width: 768px) {
  .title-text {
    font-size: 36px;
  }

  .about-title {
    font-size: 22px;
  }

  .about-description {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .title-text {
    font-size: 28px;
  }

  .about-title {
    font-size: 18px;
  }

  .about-description {
    font-size: 10px;
  }
}
</style>
