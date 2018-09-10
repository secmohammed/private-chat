import aloglia from 'algoliasearch'
import autocomplete from 'autocomplete.js'

var index = aloglia('6RFDNY4MD7', '6c74ca27b3529684ddc084197c4fafd6')
export const userautocomplete = selector => {
    let users = index.initIndex('users')
    return autocomplete(
        selector,
        {},
        {
            source: autocomplete.sources.hits(users, {
                hitsPerPage: 10
            }),
            displayKey: 'name',
            template: {
                suggestion(suggestion) {
                    return '<span>' + suggestion.name + '</span>'
                },
                empty: '<div class="aa-empty">No people found.</div>'
            }
        }
    )
}
