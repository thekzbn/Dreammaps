<template>
  <div class="full-page">
    <!-- Navigation Bar -->
    <AuthNavigation :canLogin="canLogin" :canRegister="canRegister" />

    <!-- Hero Section -->
    <div class="hero-section">
      <div class="overlay"></div>
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">Transform Learning with DreamMaps</h1>
          <p class="hero-subtitle">Join us to make learning interactive, fun, and effective</p>
          <Link :href="route('register')" class="hero-button">Get Started</Link>
        </div>
        <div class="hero-image">
          <img src="/assets/images/wave_2.png" alt="Hero Image">
        </div>
      </div>
    </div>

    <!-- About Section -->
    <div class="about-section">
      <div class="about-content">
        <div class="about-image">
          <img src="/assets/images/group.png" alt="About Us">
        </div>
        <div class="about-text">
          <span class="about-title">About DreamMaps</span>
          <div class="about-description">
            DreamMaps is your go-to platform for an engaging and interactive learning experience. We bring education to life with dynamic content, personalized learning paths, and tools that make education both enjoyable and effective. Let’s help you reach your fullest potential.
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="features-section">
      <div class="section-title">Our Features</div>
      <div class="features-grid">
        <div class="feature-item">
          <div class="feature-icon"><img src="/assets/images/icons/play-icon.png" alt="Interactive Lessons"></div>
          <div class="feature-title">Interactive Lessons</div>
          <div class="feature-description">Engage with content through videos, quizzes, and activities.</div>
        </div>
        <div class="feature-item">
          <div class="feature-icon"><img src="/assets/images/icons/path-icon.png" alt="Personalized Learning"></div>
          <div class="feature-title">Personalized Learning Paths</div>
          <div class="feature-description">Tailor your learning experience to match your goals and interests.</div>
        </div>
        <div class="feature-item">
          <div class="feature-icon"><img src="/assets/images/icons/rewards-icon.png" alt="Gamification"></div>
          <div class="feature-title">Gamification</div>
          <div class="feature-description">Earn rewards and badges as you progress through your courses.</div>
        </div>
        <div class="feature-item">
          <div class="feature-icon"><img src="/assets/images/icons/community-icon.png" alt="Community"></div>
          <div class="feature-title">Supportive Community</div>
          <div class="feature-description">Connect with peers and mentors to stay motivated.</div>
        </div>
      </div>
    </div>

    <!-- Testimonials Section -->
    <div class="testimonials-section">
      <div class="section-title">What Our Learners Say</div>
      <div class="testimonials-grid">
        <div class="testimonial-item">
          <div class="testimonial-text">"DreamMaps turned studying into something I actually enjoy! The interactive lessons make it easy to learn."</div>
          <div class="testimonial-author">- John Doe</div>
        </div>
        <div class="testimonial-item">
          <div class="testimonial-text">"The personalized paths helped me focus on the skills I needed most. I couldn’t be happier with my progress!"</div>
          <div class="testimonial-author">- Jane Smith</div>
        </div>
        <div class="testimonial-item">
          <div class="testimonial-text">"Earning badges and rewards keeps me motivated. DreamMaps made learning fun!"</div>
          <div class="testimonial-author">- Mark Johnson</div>
        </div>
        <div class="testimonial-item">
          <div class="testimonial-text">"Being part of a community where I can ask questions and share ideas has been incredibly valuable."</div>
          <div class="testimonial-author">- Sarah Brown</div>
        </div>
      </div>
    </div>

    <!-- Call to Action Section -->
    <div class="cta-section">
      <div class="cta-content">
        <div class="cta-text">
          <span class="cta-title">Ready to Learn with DreamMaps?</span>
          <span class="cta-subtitle">Start your journey towards success with fun and engaging courses.</span>
        </div>
        <Link :href="route('register')" class="cta-button">Sign Up Now</Link>
      </div>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import Footer from '@/Components/Footer.vue';
import AuthNavigation from '@/Components/AuthNavigation.vue';
import { Link } from '@inertiajs/vue3';

defineProps({
    canLogin: {
        type: Boolean,
        required: true
    },
    canRegister: {
        type: Boolean,
        required: true
    },
});
</script>

<style scoped>
.full-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #FAFAFA;
  padding: 20px;
}

/* Hero Section */
.hero-section {
  width: 100%;
  max-width: 1500px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px 20px;
  box-sizing: border-box;
  background-color: #D6AD60;
  border-radius: 10px;
  margin: 20px 0;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}

.hero-content {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: #FFFFFF;
}

.hero-text {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 600px;
}

.hero-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 800;
  font-size: 48px;
  line-height: 1.2;
  color: #FFFFFF;
}

.hero-subtitle {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 500;
  font-size: 24px;
  color: #FFFFFF;
}

.hero-button {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #FFFFFF;
  background-color: #D6AD60;
  border: none;
  border-radius: 10px;
  padding: 12px 24px;
  cursor: pointer;
  text-decoration: none;
}

.hero-image img {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
}

/* About Section */
.about-section {
  width: 100%;
  max-width: 1500px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 20px;
  box-sizing: border-box;
  background-color: #FFFFFF;
  border-radius: 10px;
  margin: 20px 0;
}

.about-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.about-image img {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
}

.about-text {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 600px;
}

.about-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 800;
  font-size: 36px;
  color: #18181B;
}

.about-description {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #18181B;
}

/* Features Section */
.features-section {
  width: 100%;
  max-width: 1500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 20px;
  box-sizing: border-box;
  background-color: #FFFFFF;
  border-radius: 10px;
  margin: 20px 0;
}

.section-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 800;
  font-size: 36px;
  color: #18181B;
  margin-bottom: 30px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #F1F1F1;
  border-radius: 10px;
  padding: 20px;
}

.feature-icon img {
  max-width: 50px;
  height: auto;
  margin-bottom: 20px;
}

.feature-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: #18181B;
}

.feature-description {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #18181B;
}

/* Testimonials Section */
.testimonials-section {
  width: 100%;
  max-width: 1500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 20px;
  box-sizing: border-box;
  background-color: #D6AD60;
  border-radius: 10px;
  margin: 20px 0;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
}

.testimonial-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #FFFFFF;
  border-radius: 10px;
  padding: 20px;
}

.testimonial-text {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #18181B;
  margin-bottom: 10px;
}

.testimonial-author {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #18181B;
}

/* Call to Action Section */
.cta-section {
  width: 100%;
  max-width: 1500px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 20px;
  box-sizing: border-box;
  background-color: #F1F1F1;
  border-radius: 10px;
  margin: 20px 0;
}

.cta-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.cta-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 800;
  font-size: 36px;
  color: #18181B;
  margin-bottom: 10px;
}

.cta-subtitle {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 500;
  font-size: 18px;
  color: #18181B;
  margin-bottom: 20px;
}

.cta-button {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #FFFFFF;
  background-color: #D6AD60;
  border: none;
  border-radius: 10px;
  padding: 12px 24px;
  cursor: pointer;
  text-decoration: none;
}
</style>
