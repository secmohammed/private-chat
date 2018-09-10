import conversation from './conversation'
import api from '../api/conversations.js'
const state = {
    conversations: [],
    loadingConversations: true
}
const getters = {
    allConversations: state => state.conversations,
    loadingConversations: state => state.loadingConversations
}
const mutations = {
    setConversations: (state, conversations) =>
        (state.conversations = conversations),
    setConversationsLoading: (state, status) =>
        (state.loadingConversations = status),
    prependToConversations: (state, conversation) => {
        state.conversations = state.conversations.filter(
            conv => conversation.id != conv.id
        )
        state.conversations.unshift(conversation)
    },
    updateConversationInList: (state, conversation) => {
        state.conversations = state.conversations.map(conv => {
            if (conv.id == conversation.id) {
                return conversation
            }
            return conv
        })
    }
}
const actions = {
    getConversations({ dispatch, commit }, page) {
        commit('setConversationsLoading', true)
        api.getConversations(page).then(response => {
            commit('setConversations', response.data.data)
            commit('setConversationsLoading', false)
            Echo.private('user.' + Laravel.user.id)
                .listen('ConversationCreated', e => {
                    commit('prependToConversations', e.data)
                })
                .listen('ConversationReplyCreated', e => {
                    commit('prependToConversations', e.data.parent.data)
                })
                .listen('ConversationUsersAdded', e => {
                    commit('updateConversationInList', e.data)
                })
        })
    }
}
const modules = {
    conversation: conversation
}
export default {
    state,
    getters,
    mutations,
    actions,
    modules
}
