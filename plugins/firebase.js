import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import firebaseConfig from '~/firebase.json'
import twitterConfig from '~/twitter.json'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
	Vue.prototype.$firebase = firebase
	Vue.prototype.$fireauth = firebase.auth()
	Vue.prototype.$firestore = firebase.firestore()
	Vue.prototype.$twitterConfig = twitterConfig
}

export default firebase