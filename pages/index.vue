<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">
        nuxt-twitter-mediaupload
      </h1>
      <h2 class="subtitle">
        My posh Nuxt.js project
      </h2>
      <div class="links">
        <a
          href="#"
          class="button--green"
          @click="doTweet"
        >
          Tweet
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import firebaseConfig from '~/firebase.json'
export default {
  components: {
    Logo
  },
  head () {
    return {
      script: [
        { src: '/js/codebird.js' }
      ]
    }
  },
  async mounted() {
    if (process.browser) {
      await this.$nextTick()
    }
  },
  methods: {
    doTweet() {
      // Initial Twitter Auth
      const provider = new this.$firebase.auth.TwitterAuthProvider()
      this.$fireauth.languageCode = 'ja'

      // Open Twitter SignIn
      this.$fireauth.signInWithPopup(provider).then((result) => {
        // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
        // You can use these server side with your app's credentials to access the Twitter API.
        const token = result.credential.accessToken
        const secret = result.credential.secret
        // The signed-in user info.
        const user = result.user
        // ...
        console.log(`OK`, token, secret, result, this.$twitterConfig.apiKey, this.$twitterConfig.apiSecretKey)

        // const Codebird = require(`~/assets/codebird`)
        const cb = new Codebird()
        cb.setConsumerKey(this.$twitterConfig.apiKey, this.$twitterConfig.apiSecretKey)
        cb.setToken(token, secret)
        cb.setProxy(`https://kght6123.jp/codebird-cors-proxy/`)
        // cb.__call("statuses_update", { status: `「Codebird.js」でツイート https://github.com/jublo/codebird-js #HelloWorld` }, (reply, rate, err) => {
        //   // ...
        //   console.log(reply, rate, err)
        // })

        // this.$twitterConfig.testImage
        const params = {
          "media_data": "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAB+0lEQVR42mP8//8/Ay0BEwONwagFoxZQDljI0PP8x7/Z93/e+PxXmpMpXp5dh4+ZgYHh0bd/clxYnMuINaMtfvRLgp3RVZwVU+rkuz+eRz+//wXVxcrEkKnEceXTX0dRlhoNTmKDaOvzXwHHv6x9+gtN/M9/hpjTX+GmMzAw/P7HMOnOj+ff//35x/Ds+z9iLfjPwPDt7//QE1/Sz319/RNh3PkPf+58+Yup/t7Xf9p8zFKcTMRa4CLGCrFm1v2fSjs+pJ/7uuvl7w+//yO7HRkUq3GEyrCREMk+kqy2IiyH3/xhYGD48uf/rPs/Z93/yczIwM3CiFU9Hw5xnD4ouvTt4Tf0AP37n+HTb+w+UOBmIs2CICm2R9/+EZlqGRkYzIVYSLMgRIYtUYGdSAsMBFgUuJhIy2iMDAwt2pysjAwLHv78RcgnOcrs5BQVHEyMG579Imi6Nh9zrBxZFgixMW624pXnwldYcTAzLjDhZmUit7AzE2K54c7fp8eF1QhWRobFptwmgiwkF3b//jMwMjJ8+P3/zPs/yx/9Wvr412+MgBJlZ1xsyuOOrbAibMHH3/87b32fce/nR2ypnpuFMVGevU6TQ5SdqKKeEVez5cuf/7te/j727s+9L/++/v3PzcyowM1kIcTiLs7Kz8pIfNnOONouGrVg1AIGAJ6gvN4J6V9GAAAAAElFTkSuQmCC"
        }
        cb.__call(
            "media_upload",
            params,
            function (reply, rate, err) {
                // you get a media id back:
                console.log(reply.media_id_string);

                // continue upload of 2nd image here, if any (just 1 image works, too!)
                cb.__call(
                    "statuses_update",
                    {
                        "media_ids": reply.media_id_string,
                        "status": `「Codebird.js」で画像付きツイート https://github.com/jublo/codebird-js #HelloWorld`
                    },
                    function (reply, rate, err) {
                        // ...
                    }
                )
            }
        );
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.email
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential
        // ...
        console.error(`NG`, error, errorCode, errorMessage, email, credential)
      });
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
