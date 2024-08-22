<script setup>
import { Link, usePage } from "@inertiajs/vue3";
defineProps({
    canLogin: {
        type: Boolean,
        required: true
    },
    canRegister: {
        type: Boolean,
        required: true
    }
});
const page = usePage();
const isAuthenticated = !!page.props.auth.user;

</script>

<template>
    <div class="navigation">
      <Link href="/">
        <div class="logo">
            <span class="dream-maps">DreamMaps</span>
        </div>
      </Link>
      <div class="menu-items">
        <Link :href="route('feature')"> <span class="menu-item">Features</span> </Link>
        <Link :href="route('pricing')"> <span class="menu-item">Pricing</span> </Link>
        <Link :href="route('aboutus')"> <span class="menu-item">About Us</span> </Link>
      </div>
      <div class="auth-buttons">
        <Link v-if="isAuthenticated" :href="route('dashboard')"><span class="login">Dashboard</span> </Link>
        <template v-else>
          <Link :href="route('login')"><span class="login">Login</span> </Link>
          <Link :href="route('register')"> <button class="sign-up-button">Sign Up</button> </Link>
        </template>
      </div>
    </div>
</template>

<style scoped>

/* Navigation */
.navigation {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 50px;
  box-sizing: border-box;
}

.logo {
  display: flex;
  align-items: center;
}

.dream-maps {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 800;
  font-size: 16px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #18181B;
}

.menu-items {
  display: flex;
  align-items: center;
  gap: 20px;
}

.menu-item {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #18181B;
}

.auth-buttons {
  display: flex;
  align-items: center;
  gap: 20px;
}

.login {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #18181B;
}

.sign-up-button {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #FFFFFF;
  background: linear-gradient(270deg, #D6AD60, #D6AD60);
  border: none;
  border-radius: 10px;
  padding: 8.5px 20px;
  cursor: pointer;
}


/* Responsive Design */
@media (max-width: 1200px) {
  .navigation {
    flex-direction: column;
    padding: 10px 20px;
  }

  .menu-items {
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 10px;
  }

  .auth-buttons {
    margin-top: 10px;
  }
}

@media (max-width: 768px) {
  .navigation {
    padding: 10px 10px;
  }

  .dream-maps {
    font-size: 14px;
  }

  .menu-item {
    font-size: 14px;
  }

  .login, .sign-up-button {
    font-size: 14px;
  }
}
</style>