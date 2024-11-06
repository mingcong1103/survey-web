<script>
import request from "../utils/request.js";
import Footer from "../components/Footer.vue";

export default {
  components: {Footer},
  data() {
    return{
      id: '',
      newsData: {
        title: '',
        content: '',
        created_at: ''
      },
      newsList: [],
      customStyle: {
        padding: '0',
      }
    }
  },
  created() {
    this.id = this.$route.params.id;
  },
  mounted() {
    this.getNewsList();
    this.getNewsData();
  },
  methods:{
    getNewsList(){
      request.post('/survey/news/new_list').then(res => {
        if (res.code === 200) {
          this.newsList = res.data;
        }else {
          console.log(res.msg);
        }
      });
    },
    getNewsData(){
      request.post('/survey/news/new_detail',{
       news_id: this.id
      }).then(res => {
        if (res.code === 200) {
          this.newsData = res.data;
        }else {
          console.log(res.msg);
        }
      });
    },
    listClick(news_id) {
      this.id = news_id;
      this.getNewsData();
    }
  }
}
</script>

<template>
  <div>
    <div class="has-background-light">
      <div class="container py-5 px-3">
        <a-row :gutter="[12,12]">
          <a-col  :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
            <a-card :bordered="false" >
              <div>
                <p class="is-size-5 has-text-weight-bold">{{ newsData.title }}</p>
                <p class="is-size-6 has-text-grey mt-2">{{ newsData.created_at }}</p>
                <div class="content mt-4 is-size-6" v-html="newsData.content"></div>
              </div>
            </a-card>
          </a-col>
          <a-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
            <a-card title="News List"  :bordered="false" :bodyStyle="customStyle">
              <a-list :data-source="newsList">
                <template #renderItem="{ item }">
                  <a-list-item @click="listClick(item.id)">
                    <a-list-item-meta :title="item.title" />
                  </a-list-item>
                </template>
              </a-list>
            </a-card>
          </a-col>
        </a-row>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<style scoped>

</style>