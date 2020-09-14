
<script>
  // import { $ } from 'jquery'
  // import { ajax } from 'jquery'
  export default {
    name: 'Member',
    data() {
      return {
        fields: [
          {
            key: 'name',
            label: 'Member name',
            sortable: true,
            sortDirection: 'desc'
          },
          { key: 'id', label: 'MemberID', sortable: true, class: 'text-center' },

          { key: 'actions', label: 'Actions' },
          {
            key: 'status',
            label: 'Member Status',
            sortable: true,
            class: 'text-center'
          }
        ],
        totalRows: 1,
        currentPage: 10,
        perPage: 10,
        pageOptions: [10, 15],
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        filterOn: [],
        infoModal: {
          id: 'info-modal',
          title: '',
          content: ''
        }
      }
    },
    computed: {
      item() {
        return this.$store.state.member
      },
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      }
    },
    mounted() {
      // Set the initial number of items
      this.totalRows = this.item.length
      this.$store.dispatch('INIT_MEMBER')
    },
    methods: {
      info(item, index, button) {
        this.infoModal.title = `Row index: ${index}`
        this.infoModal.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      modifystatus(event) {
        console.log('ssssss')
        console.log(`${event.currentTarget.selectedIndex}`)
        var sta = event.currentTarget.selectedIndex
        var ms = JSON.stringify({
          Id: event.path[3].children[1].innerText,
          Status: sta
        })
        this.$store.dispatch('UPDATE_STATUS', ms)
        // console.log(`${ms.Id},${ms.Status}`)

        // ajax({
        //   type: 'post',
        //   url: 'https://localhost:44306/Member/ChangeStatus',
        //   data: ms,
        //   dataType: 'json',
        //   contentType: 'application/json',
        //   success: function(response) {
        //     console.log('scc', response)
        //   }
        // })
      }
    }
  }
</script>
<template src='./template.html'></template>
