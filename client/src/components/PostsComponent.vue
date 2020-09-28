<template>
<div class="container">
  <input type="text" class="input-field"
            placeholder="What needs to be done" 
            v-model="text" 
            @keyup.enter="createPost()">

  <div v-for='(post, index) in posts'
      v-bind:item='post'
      v-bind:index='index'
      v-bind:key='post._id'
      v-on:dblclick="deletePost(post._id)"
    class="todo-item">
     <div class="card">
        <div class="">
            <div class="card-content">
              <p>{{ `${post.dateCreated.getDate()} / ${post.dateCreated.getMonth()+1} / ${post.dateCreated.getFullYear()}` }}</p>
                <p class="card-title">{{ post.task }}</p>
            </div>
        </div>
     </div>
</div>
</div>
</template>

<script>
import PostService from '../PostService';

export default {
  name: 'PostComponent',
  data() {
    return {
      posts: [],
      error: '',
      text: ''
    }
  },
  // created is like a life-cycle method when component is created
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch(err) {
      this.error = err.message;
    }
  },
  methods: {
    async createPost() {
      await PostService.insertPost(this.text);
      this.posts = await PostService.getPosts();
    },
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    }
  }
};
</script>

<style lang="scss">
  @import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");

  .card {
      margin: 10px;
      width: 90%;
      text-align: left;
  }

  .todo-input {
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;

    &:focus {
      outline: 0;
    }
  }
  .todo-item {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    animation-duration: 0.3s;
  }

  .remove-item {
    cursor: pointer;
    display: inline-block;
    margin-right: 20px;
    &:hover {
      color: black;
    }
  }

  .todo-item-left { // later
    display: flex;
    align-items: center;
  }

  .todo-item-label {
    padding: 10px;
    border: 1px solid white;
    margin-left: 12px;
  }

  .todo-item-edit {
    font-size: 24px;
    color: #2c3e50;
    margin-left: 12px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc; //override defaults
    font-family: 'Avenir', Helvetica, Arial, sans-serif;

    &:focus {
      outline: none;
    }
  }

  .completed {
    text-decoration: line-through;
    color: grey;
  }

  .extra-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    border-top: 1px solid lightgrey;
    padding-top: 14px;
    margin-bottom: 14px;
  }

  button {
    font-size: 14px;
    background-color: white;
    appearance: none;

    &:hover {
      background: lightgreen;
    }

    &:focus {
      outline: none;
    }
  }

  .active {
    background: lightgreen;
  }

  // CSS Transitions
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>