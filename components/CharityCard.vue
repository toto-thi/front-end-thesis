<template>
  <v-main fill-height>
    <v-row align="center" justify="center">
      <v-card color="#44496c">
        <v-row align="center">
          <v-col cols="6" xl="6" sm="12" md="12">
            <v-img
              src="/charity-pic-1.png"
              contain
              height="400"
              width="600"
            ></v-img>
          </v-col>
          <v-col cols="6" xl="6" sm="12" md="12">
            <v-img
              src="/charity-pic-2.png"
              contain
              height="400"
              width="600"
            ></v-img>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
    <br />
    <br />
    <br />

    <v-row justify="center" align="center" class="mt-16">
      <v-col
        cols="4"
        xl="4"
        sm="6"
        md="6"
        v-for="project in dummyProjects"
        :key="project.id"
      >
        <v-card color="#44496c" class="white--text mb-10 mx-10">
          <v-card-title>
            <v-avatar>
              <v-img :src="project.imgUrl"></v-img>
            </v-avatar>
            <span class="subheadline ml-3"> {{ project.title }}</span>
          </v-card-title>
          <v-divider inset color="white"></v-divider>
          <v-card-text class="white--text">
            {{ project.description }}</v-card-text
          >
          <v-card-text class="white--text">
            Project Start: {{ project.startDate }} <br />
            Project Close: {{ project.closeDate }}
          </v-card-text>
          <v-card-actions class="mr-4">
            <v-row align="center" justify="end">
              <v-btn rounded color="white" class="text-capitalize mb-4">
                Donate Now
                <v-icon>mdi-arrow-right</v-icon>
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
export default {
  name: 'CharityPage',
  data() {
    return {
      dummyProjects: [
        {
          id: 'aiufhewanONepwn',
          title: 'Charity Project 1',
          imgUrl:
            'https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cmFuZG9tfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
          description:
            "lorem ipsum  simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
          startDate: '22-04-2021',
          closeDate: '22-08-2021',
        },
        {
          id: 'OkslONndsnfoa',
          title: 'Charity Project 2',
          imgUrl:
            'https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cmFuZG9tfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
          description:
            "lorem ipsum  simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
          startDate: '22-04-2021',
          closeDate: '22-08-2021',
        },
        {
          id: 'PnnsdPU8hn',
          title: 'Charity Project 3',
          imgUrl:
            'https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cmFuZG9tfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
          description:
            "lorem ipsum  simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
          startDate: '22-04-2021',
          closeDate: '22-08-2021',
        },
        {
          id: 'aOJPNUBDKFF',
          title: 'Charity Project 4',
          imgUrl:
            'https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cmFuZG9tfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
          description:
            "lorem ipsum  simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
          startDate: '22-04-2021',
          closeDate: '22-08-2021',
        },
        {
          id: 'PPMDFWB7FEaknsbdb',
          title: 'Charity Project 5',
          imgUrl:
            'https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cmFuZG9tfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
          description:
            "lorem ipsum  simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
          startDate: '22-04-2021',
          closeDate: '22-08-2021',
        },
        {
          id: 'aiufhewanONepwn',
          title: 'Charity Project 6',
          imgUrl:
            'https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cmFuZG9tfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
          description:
            "lorem ipsum  simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
          startDate: '22-04-2021',
          closeDate: '22-08-2021',
        },
        {
          id: 'aiufhewanONepwn',
          title: 'Charity Project 7',
          imgUrl:
            'https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cmFuZG9tfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
          description:
            "lorem ipsum  simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
          startDate: '22-04-2021',
          closeDate: '22-08-2021',
        },
      ],
    }
  },
}
</script>

<style>
</style>