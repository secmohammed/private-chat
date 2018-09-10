export default {
    getConversations(page) {
        return axios.get('/webapi/conversations?page=' + page)
    }
}
