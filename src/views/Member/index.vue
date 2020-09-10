<script>
  export default {
    name: 'Member',
    data() {
      return {
        item: {},
        fields: [
          {
            key: 'name',
            label: 'Person Full name',
            sortable: true,
            sortDirection: 'desc'
          },
          { key: 'id', label: 'OrderID', sortable: true, class: 'text-center' },

          { key: 'actions', label: 'Actions' }
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
    created: function() {
      $.ajax({
        url: 'https://localhost:44306/Member/GetMember',
        type: 'GET',
        data: '',
        async: true,
        success: function(response) {
          console.log(`${response}`)
          member._data.item = response.data
        }
      })
    },
    computed: {
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
      }
    }
  }
</script>
<template src='./template.html'></template>
