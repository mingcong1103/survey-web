<script setup>
import NavBar from "../components/NavBar.vue";
import Footer from "../components/Footer.vue";
</script>

<template>
  <div class="form-box">
    <NavBar></NavBar>
    <section class="section" id="carousel-section">
      <div class="container">
        <div id="carousel-demo" class="carousel pb-6">
          <div class="item-1">
            <div class="columns mt-6">
              <div class="column is-half">
                <h2 class="title is-1">Welcome to SurveyMonkey</h2>
                <p>
                  Find paid research opportunities in your area. Earn cash for participating in online surveys, private panels, focus groups, clinical trials, in-home usage tests, online bulletin boards, taste tests, and mystery shopping studies. surveyMonkey will connect you with the best available paid research studies.
                </p>
                <br />

                <div class="buttons is-left">
                  <button class="button is-medium is-orange button is-link is-light">
                    <router-link to="/login">
                      Involved Now
                    </router-link>
                  </button>
                  <a href="#footer" class="button is-medium is-black is-primary is-light">Contact Us</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- End Carousel -->
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="has-text-centered" id="services-text-container">
          <h1 class="title is-1">Our Rewards</h1>
          <h4 class="subtitle">
            You can earn the following rewards for participating in our survey
          </h4>
        </div>
        <br />
        <div class="columns">
          <div class="column">
            <div class="card">
              <div class="card-content">
                <div class="has-text-centered">
                  <img style="height: 150px;" src="../assets/images/cash.jpg" />
                </div>
<!--                <h3 class="title is-3 has-text-centered" id="card-product-description">Orange</h3>-->
<!--                <p class="has-text-centered">-->
<!--                  Through our points redemption system, you can redeem virtual currency equal to the US dollar, and pay the cash you redeem through the world's largest exchange Binance-->
<!--                </p>-->
              </div>
            </div>
          </div>
          <div class="column">
            <div class="card">
              <div class="card-content">
                <div class="has-text-centered">
                  <img style="height: 150px;" src="../assets/images/shopping.png" />
                </div>
<!--                <h3 class="title is-3 has-text-centered" id="card-product-description">Orange</h3>-->
<!--                <p class="has-text-centered">-->
<!--                  In our points redemption system, we also set up shopping cards, including shopping cards from Amazon, eBay, Walmart, Shopee and other platforms. We will send your shopping card to your email when you redeem it.-->
<!--                </p>-->
              </div>
            </div>
          </div>
          <div class="column">
            <div class="card">
              <div class="card-content">
                <div class="has-text-centered">
                  <img style="height: 150px;" src="../assets/images/car.jpg" />
                </div>
<!--                <h3 class="title is-3 has-text-centered" id="card-product-description">Orange</h3>-->
<!--                <p class="has-text-centered">-->
<!--                  In addition to cash and shopping cards, we will also offer free car redemption during the anniversary celebration. Join us and we will tell you the date of the anniversary celebration.-->
<!--                </p>-->
              </div>
            </div>
          </div>
        </div>
<!--        <div class="container has-text-centered mt-6">-->
<!--          <div class="columns is-8 is-variable ">-->
<!--            <div class="column is-two-thirds has-text-left">-->
<!--              <h1 class="title is-1">Contact Us</h1>-->
<!--              <p class="is-size-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla eligendi soluta-->
<!--                voluptate facere molestiae consequatur.</p>-->
<!--              <div class="social-media">-->
<!--                <a href="https://facebook.com" target="_blank" class="button is-light"><i class="bi bi-facebook"></i></a>-->
<!--                <a href="https://instagram.com" target="_blank" class="button is-light mx-2"><i class="bi bi-instagram"></i></a>-->
<!--                <a href="https://twitter.com" target="_blank" class="button is-light"><i class="bi bi-twitter-x"></i></a>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="column is-one-third has-text-left">-->
<!--              <div class="field">-->
<!--                <label class="label">Name</label>-->
<!--                <div class="control">-->
<!--                  <input class="input is-medium" type="text">-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="field">-->
<!--                <label class="label">Email</label>-->
<!--                <div class="control">-->
<!--                  <input class="input is-medium" type="text">-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="field">-->
<!--                <label class="label">Message</label>-->
<!--                <div class="control">-->
<!--                  <textarea class="textarea is-medium"></textarea>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="control">-->
<!--                <button type="submit" class="button is-primary is-fullwidth has-text-white is-medium">Send Message</button>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
      </div>
    </section>
    <Footer id="footer"></Footer>
  </div>
</template>

<style scoped>
.form-box {
  //height: 100vh;
  //background: url("../assets/bg-two.jpeg");
  //background-size: 100% 100%;
  //background-position: center;
  //background-repeat: no-repeat;
  //background-attachment: fixed; /* 可选，使背景图固定 */
}
</style>