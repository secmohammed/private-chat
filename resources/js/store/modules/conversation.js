import api from '../api/conversation.js'
const state = {
    conversation: null,
    loadingConversation: false
}
const getters = {
    currentConversation: state => state.conversation,
    loadingConversation: state => state.loadingConversation
}
const mutations = {
    setConversation: (state, conversation) =>
        (state.conversation = conversation),
    setConversationLoading: (state, status) =>
        (state.loadingConversation = status),
    appendToConversation: (state, reply) =>
        state.conversation.replies.data.unshift(reply),
    updateUsersInConversation: (state, users) =>
        (state.conversation.users.data = users)
}
const actions = {
    getConversation({ dispatch, commit }, id) {
        commit('setConversationLoading', true)
        if (state.conversation) {
            Echo.leave('conversation.' + id)
        }
        api.getConversation(id).then(response => {
            commit('setConversationLoading', false)
            commit('setConversation', response.data.data)
            Echo.private('conversation.' + id)
                .listen('ConversationReplyCreated', e => {
                    commit('appendToConversation', e.data)
                })
                .listen('ConversationUsersAdded', e => {
                    commit('updateUsersInConversation', e.data.users.data)
                })
            window.history.pushState(null, null, '/conversations/' + id)
        })
    },
    createConversationReply({ dispatch, commit }, { id, body }) {
        return api
            .storeConversationReply(id, {
                body: body
            })
            .then(response => {
                commit('appendToConversation', response.data.data)
                commit('prependToConversations', response.data.data.parent.data)
            })
    },
    createConversation({ dispatch, commit }, { body, recipientIds }) {
        return api
            .storeConversation({
                body: body,
                recipientIds: recipientIds
            })
            .then(response => {
                dispatch('getConversation', response.data.data.id)
                commit('prependToConversations', response.data.data)
            })
    },
    addConversationUsers({ dispatch, commit }, { id, recipientIds }) {
        return api
            .storeConversationUsers(id, {
                recipientIds: recipientIds
            })
            .then(response => {
                commit(
                    'updateUsersInConversation',
                    response.data.data.users.data
                )
                commit('updateConversationInList', response.data.data)
            })
    }
}
export default {
    state,
    getters,
    mutations,
    actions
}
