<template>
  <div class="footer">
    <div class="line"></div>
    <div class="footer-content">
      <div class="footer-top">
        <div class="footer-logo">
          <span class="footer-title">DreamMaps</span>
        </div>
        <div class="footer-right">
          <div class="address">
            <img class="address-icon" src="/assets/vectors/shape_5_x2.svg" />
            <span class="address-text">345 Faulconer Drive, Suite 4 • Charlottesville, CA, 12345</span>
          </div>
          <div class="contacts">
            <div class="phone">
              <img class="phone-icon" src="/assets/vectors/path_2_x2.svg" />
              <span class="phone-text">(123) 456-7890</span>
            </div>
            <div class="fax">
              <img class="fax-icon" src="/assets/vectors/shape_7_x2.svg" />
              <span class="fax-text">(123) 456-7890</span>
            </div>
          </div>
          <div class="social">
            <span class="social-label">Social Media</span>
            <div class="social-icons">
              <img class="social-icon" src="/assets/vectors/facebook_4_x2.svg" />
              <img class="social-icon" src="/assets/vectors/twitter_1_x2.svg" />
              <img class="social-icon" src="/assets/vectors/linked_in_2_x2.svg" />
              <img class="social-icon" src="/assets/vectors/youtube_5_x2.svg" />
              <img class="social-icon" src="/assets/vectors/instagram_8_x2.svg" />
              <img class="social-icon" src="/assets/vectors/google_plus_4_x2.svg" />
              <img class="social-icon" src="/assets/vectors/pinterest_3_x2.svg" />
              <img class="social-icon" src="/assets/vectors/rss_6_x2.svg" />
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-links">
          <span class="footer-link">About us</span>
          <span class="footer-link">Contact us</span>
          <span class="footer-link">Help</span>
          <span class="footer-link">Privacy Policy</span>
          <span class="footer-link">Disclaimer</span>
        </div>
        <div class="footer-copyright">
          <span>Copyright © 2024• connectED.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
};
</script>

<style scoped>
.footer {
  width: 100%;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 10px;
  box-sizing: border-box;
}
.line {
  background-color: #D6AD60;
  width: 969.6px;
  height: 2.1px;
  margin-bottom: 70px;
}
.footer-content {
  width: 100%;
  max-width: 1300px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.footer-top {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
}
.footer-logo {
  display: flex;
  align-items: center;
  font-size: 32px;
  font-weight: bold;
}
.footer-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 800;
  font-size: 32px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #18181B;
}
.footer-right {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.address {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.address-text {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #575757;
  margin-right: 10px;
}
.address-icon {
  width: 10.7px;
  height: 11.3px;
  margin-right: 10px;
}
.contacts {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}
.phone,
.fax {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.phone-text,
.fax-text {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #575757;
  margin-right: 10px;
}
.phone-icon,
.fax-icon {
  width: 11.3px;
  height: 11.3px;
  margin-right: 10px;
}
.social {
  display: flex;
  flex-direction: column;
}
.social-label {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-size: 12px;
  color: #18181B;
  margin-bottom: 10px;
}
.social-icons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.social-icon {
  width: 15px;
  height: 15px;
}
.footer-bottom {
  display: grid;
  grid-template-columns: 1fr auto;
  width: 100%;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid #E0E0E0;
}
.footer-links {
  display: flex;
  gap: 20px;
}
.footer-link {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: #18181B;
}
.footer-copyright {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #18181B;
}
</style>
