<template>
    <div class="footer-wrapper">
    <footer class="bg-light container-fluid">
        <span class="text-muted row">
            <div class="col" href="#"><a href="#">Imprint</a></div>
            <div class="col"><a href="#">Contact</a></div>
            <div class="col"><a href="#">Help</a></div>
            <div class="col"><a href="#">Privacy Statement</a></div>
        </span>
    </footer>
    </div>
    <!-- <v-footer class="bg-grey-lighten-1">
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        variant="text"
        class="mx-2"
        rounded="xl"
      >
        {{ link }}
      </v-btn>
      <v-col class="text-center mt-4" cols="12">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-col>
    </v-row>
  </v-footer> -->
</template>

<script>
export default {
  name: 'Footer',
  data: () => ({
      links: [
        'Home',
        'About Us',
        'Team',
        'Services',
        'Blog',
        'Contact Us',
      ],
    }),
}
</script>

<style scoped>
.footer-wrapper{
  line-height: 60px;
}
a:link{
  text-decoration: none;
  color: black;
}
a:visited{
  color: rbg(154, 205, 224);
  text-decoration: none;
}
a:hover{
  color: rbg(154, 205, 224);
  text-decoration: none;
}
a:active{
  color: rbg(154, 205, 224);
  text-decoration: none;
}
</style>