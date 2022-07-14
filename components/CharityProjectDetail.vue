<template>
  <div id="app">
    <v-container class="px-16 mt-12" fluid>
      <v-row>
        <v-col cols="9">
          <v-row align="start" justify="center">
            <v-card
              color="primary"
              class="rounded-xl white--text mt-4"
              width="100%"
              height="15vh"
            >
              <v-card-title class="mt-6">
                Topic: {{ project.title }}
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <h3 style="color: #53a700" class="pr-5">
                  {{ project.isApproved ? 'Active' : 'Close' }}
                </h3>
              </v-card-actions>
            </v-card>
          </v-row>
          <v-row align="center" justify="center" class="mt-8">
            <v-card color="white" class="rounded-xl" width="100%" height="100%">
              <v-card-title class="justify-center pt-8">
                <h2>Project Details</h2>
              </v-card-title>
              <v-card-text class="px-8">
                <h3>Story:</h3>
                <br />
                {{ project.description }}. <br />
                <v-carousel
                  cycle
                  hide-delimiter-background
                  show-arrows-on-hover
                  class="mt-6"
                >
                  <v-carousel-item
                    v-for="(item, i) in items"
                    :key="i"
                    :src="item.src"
                    reverse-transition="fade-transition"
                    transition="fade-transition"
                  >
                  </v-carousel-item>
                </v-carousel>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="primary"
                  class="text-capitalize mb-4 mr-5"
                  rounded
                  outlined
                  >Donate Now
                  <v-icon small>mdi-ethereum</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-row>
        </v-col>
        <v-col cols="3">
          <v-card
            color="white"
            class="white--text rounded-xl"
            height="100%"
            fill-height
          >
            <v-card-text class="text-center pt-16">
              <h3 class="pt-16">Project Duration</h3>
              <br />

              <h2>{{ project.startDate }} left.</h2>

              <br />
              <h3>Expected Amount</h3>
              <br />

              <h2>
                <v-icon>mdi-ethereum</v-icon>
                {{ project.targetAmount }}
              </h2>
              <br />
            </v-card-text>
            <v-card-text class="px-4 mx-4">
              <h3>About Creator</h3>
              <br />
              <v-row align="start">
                <v-col cols="3">
                  <v-img
                    :src="project.createdBy.imgUrl"
                    contain
                    height="70px"
                    width="70px"
                  ></v-img>
                </v-col>
                <v-col cols="9" align-self="center">
                  <h3>
                    {{ project.createdBy.firstname }}
                    {{ project.createdBy.lastname }}.
                  </h3>
                </v-col>
              </v-row>
              <h4 class="mt-4">
                <v-icon>mdi-map-marker</v-icon>
                Vientiane, Laos.
              </h4>
            </v-card-text>
            <v-card-text class="mt-10 px-4 mx-4">
              <h2 class="font-weight-black">Share This Project</h2>
              <br />
              <v-row align="center">
                <v-btn icon color="primary" class="mx-2">
                  <s-facebook
                    :window-features="windowFeatures"
                    :share-options="facebookShareOptions"
                    :user-native-behavior="useNativeBehavior"
                    @popup-close="onClose"
                    @popup-open="onOpen"
                    @popup-block="onBlock"
                    @popup-focus="onFocus"
                    style="text-decoration: none"
                  >
                    <v-icon large>mdi-facebook</v-icon>
                  </s-facebook>
                </v-btn>
                <v-btn icon color="primary" class="mx-2">
                  <s-whats-app
                    :window-features="windowFeatures"
                    :share-options="whatsAppShareOptions"
                    :user-native-behavior="useNativeBehavior"
                    @popup-close="onClose"
                    @popup-open="onOpen"
                    @popup-block="onBlock"
                    @popup-focus="onFocus"
                    style="text-decoration: none"
                  >
                    <v-icon large>mdi-whatsapp</v-icon>
                  </s-whats-app>
                </v-btn>
                <v-btn icon color="primary" class="mx-2">
                  <s-twitter
                    :window-features="windowFeatures"
                    :share-options="twitterShareOptions"
                    :user-native-behavior="useNativeBehavior"
                    @popup-close="onClose"
                    @popup-open="onOpen"
                    @popup-block="onBlock"
                    @popup-focus="onFocus"
                    style="text-decoration: none"
                  >
                    <v-icon large>mdi-twitter</v-icon>
                  </s-twitter>
                </v-btn>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Last Transaction-->
      <v-row
        class="mt-8"
        align="center"
        justify="center"
        style="text-decoration: underline"
      >
        <h1>Latest Donations</h1>
      </v-row>
      <v-row class="mt-6" align="center" justify="center">
        <v-col cols="4" xs="12">
          <v-card
            color="primary"
            max-height="500px"
            class="white--text rounded-xl"
          >
            <v-card-title class="justify-center">
              TxnHash: 90Yfsh56Hk22h23bds442p9sd32fs4
            </v-card-title>
            <v-card-text class="white--text px-8">
              From: xxxxx <br />
              To: xxxxx <br />
              Message: Keep doing what's good for our society
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4" xs="12">
          <v-card
            color="primary"
            max-height="500px"
            class="white--text rounded-xl"
          >
            <v-card-title class="justify-center">
              TxnHash: 90Yfsh56Hk22h23bds442p9sd32fs4
            </v-card-title>
            <v-card-text class="white--text px-8">
              From: xxxxx <br />
              To: xxxxx <br />
              Message: Keep doing what's good for our society
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4" xs="12">
          <v-card
            color="primary"
            max-height="500px"
            class="white--text rounded-xl"
          >
            <v-card-title class="justify-center">
              TxnHash: 90Yfsh56Hk22h23bds442p9sd32fs4
            </v-card-title>
            <v-card-text class="white--text px-8">
              From: xxxxx <br />
              To: xxxxx <br />
              Message: Keep doing what's good for our society
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { SFacebook, STwitter, SWhatsApp } from 'vue-socials'

export default {
  name: 'CharityProjectDetail',
  components: { SFacebook, STwitter, SWhatsApp },
  props: {
    project: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      // this is the way to do dynamic URL `https://localhost:3000${this.$route.path}`
      windowFeatures: {},
      facebookShareOptions: {
        url: 'https://www.google.com',
        quote: 'Donate for those who are in need...',
        hashtag: '#TJCharity',
      },
      twitterShareOptions: {
        url: 'https://www.google.com',
        text: 'Donate for those who are in need...',
        hashtag: ['TJCharity', 'Thesis'],
        via: 'TJDev',
      },
      whatsAppShareOptions: {
        number: '8562092070847',
        text: 'Donate for those who are in need... https://www.google.com',
      },
      useNativeBehavior: false,
      items: [
        {
          src: 'https://images.unsplash.com/photo-1589825029592-e857f30a76bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y3V0ZSUyMHRpZ2VyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        },
        {
          src: 'https://images.unsplash.com/photo-1577376059855-afca4e1ff59c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y3V0ZSUyMHRpZ2VyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        },
        {
          src: 'https://images.unsplash.com/photo-1577375838286-e43f53e54632?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y3V0ZSUyMHRpZ2VyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        },
        {
          src: 'https://images.unsplash.com/photo-1505810176942-54d98851165f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y3V0ZSUyMHRpZ2VyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        },
      ],
    }
  },
  methods: {
    onClose() {},
    onOpen() {},
    onBlock() {},
    onFocus() {},
  },
}
</script>

<style>
</style>