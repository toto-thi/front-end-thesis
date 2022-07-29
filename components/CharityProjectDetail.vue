<template>
  <div id="app">
    <v-container class="mt-12" fluid>
      <v-row>
        <v-col cols="9">
          <v-row align="start" justify="center">
            <v-card
              color="primary"
              class="rounded-xl white--text mt-4"
              width="100%"
              height="15vh"
            >
              <v-card-title class="mt-6 text-capitalize display-2">
                {{ $t('kProjectTitle') }}: {{ project.title }}
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
              <v-card-title
                class="justify-center pt-8 text-capitalize display-1"
              >
                {{ $t('kProjectDetail') }}
              </v-card-title>
              <v-card-text class="mt-8 px-16 mx-16 headline">
                {{ $t('kStory') }}:
                <br />
                <p class="headline pt-4">{{ project.description }}</p>
                <br />
                <p class="mt-4 headline">
                  <v-icon>mdi-map-marker</v-icon>
                  {{ project.location }}
                </p>
                <v-carousel
                  cycle
                  hide-delimiter-background
                  show-arrows-on-hover
                  class="mt-8"
                >
                  <v-carousel-item
                    v-for="(item, i) in items"
                    :key="i"
                    reverse-transition="fade-transition"
                    transition="fade-transition"
                  >
                    <v-img :src="item.src" contain height="500px"></v-img>
                  </v-carousel-item>
                </v-carousel>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="primary"
                  class="text-capitalize mb-4 mr-5 title"
                  rounded
                  outlined
                  @click="donationBox"
                  >{{ $t('kDonate') }}
                  <v-icon>mdi-ethereum</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
            <DonationBox
              :status="donateDialog"
              :data="tempData"
              @closeBox="closeDialog"
            />
          </v-row>
        </v-col>
        <v-col cols="3">
          <v-card
            color="white"
            class="white--text rounded-xl"
            height="100%"
            fill-height
          >
            <v-card-text class="text-center pt-16 text-capitalize">
              <p class="headline">{{ $t('kProjectDuration') }}</p>

              <p class="title mt-4">{{ project.endDate }}</p>

              <br />
              <p class="headline">{{ $t('kExpectAmount') }}</p>
              <p class="mt-4 title">
                <v-icon>mdi-ethereum</v-icon>
                {{ project.targetAmount }}
                ({{ $t('kEstimatedPrice') }}: ${{ estPriceInUSD }}).
              </p>
              <br />
              <p class="headline">{{ $t('kCurrentDonatedAmount') }}</p>
              <p class="mt-4 title">
                <v-icon>mdi-ethereum</v-icon>
                {{ project.donateAmount }}
                ({{ $t('kEstimatedPrice') }}: ${{ currentEstPriceInUSD }}).
              </p>
              <br />
            </v-card-text>
            <v-card-text class="px-4 mx-4 text-capitalize">
              <h3>{{ $t('kCreatorInfo') }}</h3>
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
            </v-card-text>
            <v-card-text class="mt-10 px-4 mx-4 text-capitalize">
              <h2 class="font-weight-black">{{ $t('kShareTitle') }}</h2>
              <br />
              <v-row align="center">
                <v-btn icon color="primary" class="mx-2">
                  <ShareNetwork
                    network="facebook"
                    url="www.google.com"
                    :title="`${project.title}`"
                    description="Blablabla"
                    quote="GooGOOGOOOO"
                    hashtags="tjcharity, cryptocurrency"
                    style="text-decoration: none"
                  >
                    <v-icon large>mdi-facebook</v-icon>
                  </ShareNetwork>
                </v-btn>
                <v-btn icon color="primary" class="mx-2">
                  <ShareNetwork
                    network="whatsApp"
                    url="www.google.com"
                    :title="`${project.title}`"
                    description="Blablabla"
                    style="text-decoration: none"
                  >
                    <v-icon large>mdi-whatsapp</v-icon>
                  </ShareNetwork>
                </v-btn>
                <v-btn icon color="primary" class="mx-2">
                  <ShareNetwork
                    network="twitter"
                    url="www.google.com"
                    :title="`${project.title}`"
                    description="Blablabla"
                    hashtags="tjcharity, cryptocurrency"
                    twitter-user="random_user"
                    style="text-decoration: none"
                  >
                    <v-icon large>mdi-twitter</v-icon>
                  </ShareNetwork>
                </v-btn>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Last Transaction-->
      <v-row
        class="mt-8 text-capitalize"
        align="center"
        justify="center"
        style="text-decoration: underline"
      >
        <h1>{{ $t('kLatestDonation') }}</h1>
      </v-row>
      <v-row class="mt-12" align="center" justify="center">
        <v-data-iterator
          :items="showTransaction"
          :items-per-page.sync="perPage"
          :page.sync="page"
          hide-default-footer
        >
          <template v-slot:default="props">
            <v-row justify="center" align="center">
              <v-col cols="4" xs="12" v-for="(item, i) in props.items" :key="i">
                <v-card
                  color="primary"
                  width="450px"
                  class="white--text rounded-xl"
                >
                  <v-card-title class="justify-center">
                    <!-- {{ $t('kTxnHash') }}: {{ item.txnHash }} -->
                  </v-card-title>
                  <v-card-text class="white--text px-12">
                    <p class="subtitle-1">
                      {{ $t('kTransferFrom') }}:
                      {{ shortAddress(item.addressFrom) }}
                    </p>
                    <p class="subtitle-1">
                      {{ $t('kTransferTo') }}:
                      {{ shortAddress(item.addressTo) }}
                    </p>
                    <p class="subtitle-1">
                      {{ $t('kAmount') }}:
                      <v-icon small color="white">mdi-ethereum</v-icon>
                      {{ item.amount }}
                    </p>
                    <p class="subtitle-1">
                      {{ $t('kMessage') }}: {{ item.message }}
                    </p>
                    <p class="subtitle-1">
                      {{ $t('kDonateTime') }}: {{ item.timestamp }}
                    </p>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </template>
          <template v-slot:footer>
            <v-row justify="center" align="center" class="mt-8">
              <v-pagination
                v-model="page"
                :length="totalPage"
                :total-visible="Math.ceil(showTransaction.length / perPage)"
              ></v-pagination>
            </v-row>
          </template>
        </v-data-iterator>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DonationBox from '@/components/DonationBox.vue'
import { PriceInUSD } from '~/helpers/calETHPrice'
import { shortenAddress } from '~/helpers/shortenAddress'

export default {
  name: 'CharityProjectDetail',
  head() {
    return {
      title: this.project.title,
    }
  },
  props: {
    project: {
      required: true,
      type: Object,
    },
    showTransaction: {
      required: true,
      type: Array,
    },
  },
  computed: {
    ...mapGetters(['authenticated']),
    totalPage() {
      return Math.ceil(this.showTransaction.length / this.perPage)
    },
  },
  data() {
    return {
      page: 1,
      perPage: 3,
      donateDialog: false,
      estPriceInUSD: null,
      currentEstPriceInUSD: null,
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
      tempData: {},
    }
  },
  methods: {
    donationBox() {
      if (this.authenticated == false) {
        this.$router.push('/login')
      } else {
        this.donateDialog = true
        const senderWalletID = this.$store.getters.user.walletID
        const targetWallet = this.project.createdBy.walletID
        const uid = this.$store.getters.user.id
        const cAddress = this.project.contractAddress
        const currentDonate = this.project.donateAmount
        const targetAmount = this.project.targetAmount

        const data = {
          id: this.project.id,
          sender: senderWalletID,
          userID: uid,
          targetWallet: targetWallet,
          contractAddress: cAddress,
          currentDonate: currentDonate,
          targetAmount: targetAmount,
        }

        this.tempData = Object.assign({}, data)
      }
    },
    closeDialog() {
      this.donateDialog = false
      this.tempData = {}
    },
    shortAddress(address) {
      return shortenAddress(address)
    },
    async estimateInUSD() {
      this.estPriceInUSD = (
        await PriceInUSD(this.$axios, this.project.targetAmount)
      ).toLocaleString('en-US')
    },
    async currentPriceUSD() {
      this.currentEstPriceInUSD = (
        await PriceInUSD(this.$axios, this.project.donateAmount)
      ).toLocaleString('en-US')
    },
  },
  async mounted() {
    await this.estimateInUSD()
    await this.currentPriceUSD()
  },
  components: { DonationBox },
}
</script>

<style>
</style>