<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            All Conversations
        </div>
        <div class="panel-body">
            <div class="loader" v-if="loading"></div>
            <div class="media" v-else-if="conversations.length" v-for="conversation in conversations">
                <div class="media-body">
                    <a href="" @click.prevent="getConversation(conversation.id)">{{ conversation.body | substr(3) }}</a>
                    <p class="text-muted">You and {{ conversation.participants_count }} {{ pluralize('other',conversation.participants_count) }}</p>
                    <ul class="list-inline">
                        <li>
                            <img :src="user.avatar" :title="user.name" :alt="user.name + ' avatar '" v-for="user in conversation.users.data">
                        </li>
                        <li>Last reply {{ conversation.last_reply_human }}</li>
                    </ul>
                </div>
            </div>
            <div v-else> No Conversations Yet !</div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import pluralize from 'pluralize'

export default {
    name: 'conversations',
    mounted() {
        this.getConversations(1)
    },
    computed: mapGetters({
        conversations: 'allConversations',
        loading: 'loadingConversations'
    }),
    methods: {
        ...mapActions(['getConversations', 'getConversation']),
        pluralize
    }
}
</script>
