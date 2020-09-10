<script>
  // @ is an alias to /src

  export default {
    name: 'Product_Table',
    data() {
      return {
        order: {
          id: '',
          memberId: '',
          shipAddress: '',
          status: null,
          orderDate: '',
          shippedDate: '',
          deliveryMethod: null,
          paymentMethod: '',
          quantity: null,
          unitPrice: null,
          name: ''
        },
        Product_Options: {
          names: [
            'KJ WORKS M4 CQB GBB Rifle',
            'TOKYO MARUI SCAR-L 82RD AEG Magazine (Next Gen, Tan)',
            'CYBERGUN THOMPSON M1A1 30RD Gas Magazine'
          ],
          sizes: [
            { value: null, text: 'Please select size' },
            { value: 'S', text: 'Small' },
            { value: 'M', text: 'Medium' },
            { value: 'L', text: 'Large' }
          ],
          colors: [
            { value: null, text: 'Please select color' },
            { value: 'Black', text: 'Black' },
            { value: 'White', text: 'White' }
          ],
          status: [
            { value: null, text: 'Please select status' },
            { value: 'Waiting', text: 'Waiting' },
            { value: 'Arrivaled', text: 'Arrivaled' }
          ]
        },
        EditingItem: {
          id: '',
          memberId: '',
          shipAddress: '',
          status: null,
          orderDate: '',
          shippedDate: '',
          deliveryMethod: null,
          paymentMethod: '',
          quantity: null,
          unitPrice: null,
          name: ''
        },
        modes: ['multi', 'single', 'range'],
        fields: [
          { key: 'id', sortable: true }, //訂單id
          // { key: 'name', sortable: true }, //品名
          { key: 'orderDate', sortable: true }, //下訂時間
          { key: 'status', sortable: true }, //訂單狀態
          { key: 'paymentMethod', sortable: true }, //付款方式
          { key: 'unitPrice', sortable: true }, //價格
          { key: 'shippedDate', sortable: true }, //抵達時間
          // { key: 'deliveryMethod', sortable: true },
          // { key: 'quantity', sortable: true },
          // { key: 'memberId', sortable: true },//會員id
          // { key: 'shipAddress', sortable: true },//地址

          { key: 'Action', sortable: true }
        ],
        fill: 'fill',
        selectMode: 'single',
        selected: [],
        // totalRows: 1,
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
          content: ''
        },
        editModal: {
          id: 'edit-modal',
          title: '',
          content: ''
        }
      }
    },
    computed: {
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      },
      totalRows() {
        return this.items.length
      },
      //table data list
      items() {
        return this.$store.state.stock
      }
    },
    mounted() {
      // Set the initial number of items
      // this.totalRows = this.items.length
      this.$store.dispatch('INIT_STOCK')
    },
    methods: {
      onRowSelected(items) {
        this.selected = items
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      //顯示詳細資訊
      info(item, index, button) {
        this.infoModal.title = `Row index: ${index}`
        this.infoModal.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
        console.log('info item', item)
      },
      //顯示編輯頁面
      edit(item, index, button) {
        this.editModal.title = `Current Item: ID - ${item.id}`
        //將資料導入EditingItem
        this.EditingItem.id = item.id
        this.EditingItem.memberId = item.memberId
        this.EditingItem.shipAddress = item.shipAddress
        this.EditingItem.status = item.status
        this.EditingItem.orderDate = item.orderDate
        this.EditingItem.shippedDate = item.shippedDate
        this.EditingItem.deliveryMethod = item.deliveryMethod
        this.EditingItem.paymentMethod = item.paymentMethod
        this.EditingItem.quantity = item.quantity
        this.EditingItem.unitPrice = item.unitPrice
        this.EditingItem.name = item.name
        // this.EditingItem = item

        console.log('open edit-item', this.EditingItem)
        this.$root.$emit('bv::show::modal', this.editModal.id, button)
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
      resetEditModal() {
        this.editModal.title = ''
        this.editModal.content = ''
      },
      hideModal(id) {
        this.$bvModal.hide(id)
      },
      submitHandler() {
        this.$store.commit('ADD_STOCK', this.order)
        this.Clear_Order()
      },
      editHandler() {
        this.$store.commit('UPDATE_STOCK', {
          id: this.EditingItem.id,
          data: this.EditingItem
        })
        this.$refs.table.refresh()
        this.Clear_Edit()
        this.hideModal('edit-modal')
      },
      deleteHandler(id) {
        console.log('delete row.item.id', id)
        this.$store.commit('REMOVE_STOCK', id)
      },
      Clear_Order() {
        this.order = {
          id: '',
          memberId: '',
          shipAddress: '',
          status: null,
          orderDate: '',
          shippedDate: '',
          deliveryMethod: null,
          paymentMethod: null,
          quantity: '',
          unitPrice: '',
          name: ''
        }
      },
      Clear_Edit() {
        this.EditingItem = {
          id: '',
          memberId: '',
          shipAddress: '',
          status: null,
          orderDate: '',
          shippedDate: '',
          deliveryMethod: null,
          paymentMethod: null,
          quantity: '',
          unitPrice: '',
          name: ''
        }
      }
    }
  }
</script>
<template src='./template.html'></template>
<style src='./style.scss' lang="scss" scoped>
</style>
