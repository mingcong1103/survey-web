<script setup>

</script>

<template>
  <div class="container">
    <footer>
      <div class="footer-nav">
        <div class="footer-nav-item">
          <span>About Us</span>
        </div>
        <div class="footer-nav-item">
          <span>Contact Us</span>
        </div>
        <div class="footer-nav-item">
          <span>Terms of Service</span>
        </div>
        <div class="footer-nav-item">
          <span>Privacy Policy</span>
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