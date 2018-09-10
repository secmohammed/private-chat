export default {
    getConversation(id) {
        return axios.get('/webapi/conversations/' + id)
    },
    storeConversationReply(id, { body }) {
        return axios.post('/webapi/conversations/' + id + '/reply', {
            body: body
        })
    },
    storeConversation({ body, recipientIds }) {
        return axios.post('/webapi/conversations', {
            body: body,
            recipients: recipientIds
        })
    },
    storeConversationUsers(id, { recipientIds }) {
        return axios.post(`/webapi/conversations/${id}/users`, {
            recipients: recipientIds
        })
    }
}
