<template>

  <div>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis eaque error et totam ea possimus, doloremque nobis similique reprehenderit ratione! Nostrum voluptatem ullam pariatur facilis numquam neque iste dolore magni.
    <p>{{ name }}</p>
    <button @click="click_">Button</button>
  </div>

</template>

<script>
export default {

  data: function() {
    return {
      name: 'fq'
    }
  },
  methods: {
    click_: function() {
      console.log('wew')
    }
  }
}
</script>

<style scoped>
    p {
        background: red;
    }
</style>