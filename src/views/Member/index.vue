
<script>
  import { ajax } from 'jquery'
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
          {
            key: 'status',
            label: 'Member Status',
            sortable: true,
            class: 'text-center'
          },

          { key: 'actions', label: 'Actions' }
        ],
        fill: 'fill',
        //totalRows: 3,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15],
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        filterOn: [],
        infoModal: {
          id: 'info-modal',
          title: '',
          content: {}
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
        this.infoModal.content = item
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = {}
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      modifystatus(event) {
        console.log('ssssss')
        var sta = event.currentTarget.selectedIndex
        var ms = JSON.stringify({
          Id: event.path[3].children[1].innerText,
          Status: sta
        })
        this.$store.commit('UPDATE_STATUS', ms)
        console.log('fffffffff')
      },
      modifyInfo() {
        let info = this.infoModal.content
        let data = JSON.stringify({
          Id: info.id,
          Name: info.name,
          Mail: info.mail,
          PostCode: parseInt(info.postCode),
          Address: info.address,
          Phone: info.phone,
          Memberlevel: parseInt(info.memberlevel)
        })
        this.$store.commit('UPDATE_MEMBERSinfo', data)
      }
    }
  }
</script>
<template src='./template.html'></template>
<style src='./style.scss' lang="scss" scoped>