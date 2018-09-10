<template>
<div class="panel panel-default">
    <div class="panel-heading">
        New Message
    </div>
    <div class="panel-body">
        <form action="#" @submit.prevent="send">
            <div class="form-group">
                <input type="text" id="users" placeholder="Start Typing to someone" class="form-control">
            </div>
            <ul v-if="recipients.length">
                <li><strong>To :</strong></li>
                <li v-for="recipient in recipients">{{ recipient.name }} <span class="badge" @click.prevent="removeRecipient(recipient)">&times;</span></li>
            </ul>
            <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" cols="30" rows="4" class="form-control" v-model="body"></textarea>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-default">Send</button>
            </div>
        </form>
    </div>
</div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { userautocomplete } from '../../helpers/autocomplete'
export default {
    data() {
        return {
            body: null,
            recipients: []
        }
    },
    methods: {
        ...mapActions(['createConversation']),
        addRecipient(recipient) {
            let user = this.recipients.find(r => {
                return r.id == recipient.id
            })
            if (typeof user !== 'undefined') {
                return
            }
            this.recipients.push(recipient)
        },
        removeRecipient(recipient) {
            this.recipients = this.recipients.filter(r => r.id !== recipient.id)
        },
        send() {
            this.createConversation({
                recipientIds: this.recipients.map(r => r.id),
                body: this.body
            }).then(() => {
                this.recipients = []
                this.body = null
            })
        }
    },
    mounted() {
        var users = userautocomplete('#users').on(
            'autocomplete:selected',
            (e, selection) => {
                this.addRecipient(selection)
                users.autocomplete.setVal('')
            }
        )
    }
}
</script>
