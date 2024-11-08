<script setup>

</script>

<template>
  <div class="container">
    <footer>
      <div class="footer-nav">
        <div class="footer-nav-item">
          <router-link to="/userCenter/newDetails/90">
            <span class="has-text-grey">About Us</span>
          </router-link>
        </div>
        <div class="footer-nav-item">
          <router-link to="/userCenter/newDetails/92">
            <span class="has-text-grey">Contact Us</span>
          </router-link>
        </div>
        <div class="footer-nav-item">
          <router-link to="/userCenter/newDetails/93">
            <span class="has-text-grey">Terms of Service</span>
          </router-link>
        </div>
        <div class="footer-nav-item">
          <router-link to="/userCenter/newDetails/94">
            <span class="has-text-grey">Privacy Policy</span>
          </router-link>
        </div>
      </div>
      <div class="footer-copyright">
        <p class="has-text-grey">Copyright © 2019-2024 SurveyClub All Rights Reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.footer-nav{
  display: flex;
  flex-wrap: wrap;
  align-items: center; /* 垂直居中 */
  padding: 20px 20px 10px 0;
}
.footer-nav-item{
  padding: 10px 20px;
  position: relative; /* 为伪元素定位 */
}
.footer-nav-item:not(:last-child)::after {
  content: ''; /* 伪元素内容为空 */
  width: 1px; /* 竖线的宽度 */
  height: 20px; /* 竖线的高度 */
  background-color: #cccccc; /* 竖线的颜色 */
  position: absolute; /* 绝对定位 */
  right: 0; /* 竖线与右侧元素的间距 */
  top: 50%; /* 垂直居中 */
  transform: translateY(-50%); /* 垂直居中调整 */
}
.footer-copyright {
  padding: 0 20px 50px 20px;
}
</style>