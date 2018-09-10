/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap')
window.Vue = require('vue')
import Vuex from 'vuex'
Vue.use(Vuex)
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component(
    'conversations-dashboard',
    require('./components/ConversationsDashboard.vue')
)
Vue.filter('substr', (string, limit = 10) => {
    return string.substr(0, limit) + '..'
})
Vue.component('conversations', require('./components/Conversations.vue'))
Vue.component(
    'conversation-form',
    require('./components/forms/ConversationForm.vue')
)
Vue.component('conversation', require('./components/Conversation.vue'))
Vue.component(
    'conversation-add-user-form',
    require('./components/forms/ConversationAddUserForm.vue')
)
Vue.component(
    'conversation-reply-form',
    require('./components/forms/ConversationReplyForm.vue')
)
import store from './store/index.js'
const app = new Vue({
    el: '#app',
    store
})
