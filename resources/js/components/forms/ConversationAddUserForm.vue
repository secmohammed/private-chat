<template>
    <form action="#">
        <div class="form-group">
            <input type="text" id="users-add" placeholder="Start adding others to this conversation." class="form-control">
        </div>
    </form>
</template>
<script>
import { userautocomplete } from '../../helpers/autocomplete'
import { mapActions, mapGetters } from 'vuex'
export default {
    methods: {
        ...mapActions(['addConversationUsers'])
    },
    computed: mapGetters({
        conversation: 'currentConversation'
    }),
    mounted() {
        var users = userautocomplete('#users-add').on(
            'autocomplete:selected',
            (e, selection) => {
                this.addConversationUsers({
                    id: this.conversation.id,
                    recipientIds: [selection].map(recipient => recipient.id)
                })
                users.autocomplete.setVal('')
            }
        )
    }
}
</script>
