<template>
  <!-- 포스트 카드 -->
  <div id="post-card" :class="$mq">
    <template>
      <header class="post-header">
        <p>
          <button @click.prevent="deleteMemo">
            <i class="fas fa-times"></i>
          </button>
        </p>
      </header>
      <section class="post-content">
        <div v-if="!onEditor">
          <span v-for="(node, i) in nodes" :value="node" :key="i">
            <nuxt-link v-if="word(node)" :to="`/hashtag/${node.slice(1)}`">{{node}}</nuxt-link>
            <span v-else class="node">{{node}}</span>
          </span>
        </div>
        <div v-else>
          <textarea class="editor" v-model="edit"></textarea>
        </div>
      </section>
      <footer>
        <ul class="btn-list">
          <li>
            <a href @click.prevent="setStar">
              <!-- 텅빈 별(안 중요 false) -->
              <i class="far fa-star" v-if="!star"></i>
              <!-- 꽉찬 별( 중요 true)-->
              <i class="fas fa-star" v-else></i>
            </a>
          </li>
          <li>
            <a href @click.prevent="onEdit">
              <!-- 메뉴 -->
              <i class="far fa-edit"></i>
            </a>
          </li>
          <li>
            <p>{{$moment(post.createdAt).fromNow()}}</p>
          </li>
        </ul>
      </footer>
    </template>
  </div>
</template>

<script>

export default {
  props: {
    post: { type: Object, required: true }
  },
  computed: {
    nodes() {
      return this.post.content.split(/(#[^\s#]+)/);
    },
    star() {
      return this.post.important;
    }
  },
  data() {
    return {
      onEditor: false,
      edit: this.post.content,
      // copyNode:'',
    };
  },
  methods: {
    async onEdit() {
      if (this.onEditor === false) {
        return (this.onEditor = !this.onEditor);
      } else {
        //에디터 활성
        await this.$store.dispatch("post/editPost", {
          postId: this.post.id,
          content: this.edit
        });
        return (this.onEditor = !this.onEditor);
      }
    },
    word(node) {
      return node.startsWith("#") && !node.startsWith("##");
    },
    async setStar() {
      await this.$store.dispatch("post/setStar", {
        postId: this.post.id,
        important: this.post.important
      });
    },
    deleteMemo() {
      this.$store.dispatch("post/deletePost", {
        postId: this.post.id
      });
    }
  }
};
</script>
<style scoped>
#post-card {
  min-height: 100%;
  display: flex;
  overflow-y: auto;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  border: none;
}
#post-card.mobile {
  max-width: 90%;
  margin: 0;
}
.post-header > p {
  display: flex;
  min-height: 100%;
  justify-content: flex-end;
}
.post-content {
  overflow-y: auto;
  max-height: 350px;
}
/* .node{
  overflow-y: auto;
} */
.editor {
  background: transparent;
  min-width: 100%;
  min-height: 100%;
  resize: none;
}
footer,
footer li {
  display: inline-block;
  margin: 7px 0 0 0;
  padding-right: 10px;
  font-size: 20px;
}
</style>