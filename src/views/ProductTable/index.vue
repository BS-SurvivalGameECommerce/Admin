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
            { value: '未繳費', text: '未繳費' },
            { value: '訂單成立', text: '訂單成立' },
            { value: '送貨中', text: '送貨中' },
            { value: '貨物抵達', text: '貨物抵達' },
            { value: '待收貨', text: '待收貨' },
            { value: '已收貨', text: '已收貨' }
          ],
          payment: [
            { value: null, text: 'Please select method' },
            { value: 'ATM', text: 'ATM' },
            { value: '超商繳費', text: '超商繳費' },
            { value: '信用卡', text: '信用卡' }
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
        editOD: {
          orderid: '',
          odindex: '',
          orderdetail: ''
        },
        modes: ['multi', 'single', 'range'],
        fields: [
          { key: 'id', sortable: true }, //訂單id
          // { key: 'name', sortable: true }, //品名
          { key: 'orderDate', sortable: true }, //下訂時間
          { key: 'status', sortable: true }, //訂單狀態
          { key: 'paymentMethod', sortable: true }, //付款方式
          // { key: 'unitPrice', sortable: true }, //價格
          { key: 'shippedDate', sortable: true }, //抵達時間
          // { key: 'deliveryMethod', sortable: true },
          // { key: 'quantity', sortable: true },
          // { key: 'memberId', sortable: true },//會員id
          // { key: 'shipAddress', sortable: true },//地址

          { key: 'TotalPrice', sortable: true },
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
        },
        editDetailModal: {
          id: 'edit-detail-modal',
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
        // return this.$store.getters.getstock
      }
    },
    mounted() {
      this.$store.dispatch('INIT_STOCK')
    },
    methods: {
      // 計算total price
      totalPrice(order) {
        let total = 0
        order.forEach(x => {
          total += x.price * x.quantity * x.discount
        })
        return Math.ceil(total) //無條件進位
      },
      onRowSelected(items) {
        this.selected = items
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      //顯示 order 詳細資訊
      info(item, index, button) {
        this.infoModal.title = `ID: ${item.id}`
        this.infoModal.content = {
          id: { value: item.id },
          memberID: { value: item.memberID },
          orderDate: { value: item.orderDate },
          paymentMethod: { value: item.paymentMethod },
          shipAddress: { value: item.shipAddress },
          status: { value: item.status }
        }
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
        console.log('info item - order', item)
      },
      // 顯示 order detail 詳細資訊
      info_detail(item, index, button) {
        this.infoModal.title = `ODID: ${item.orderID}`
        this.infoModal.content = {
          orderID: { value: item.orderID },
          productName: { value: item.productName },
          quantity: { value: item.quantity },
          unitPrice: { value: item.unitPrice },
          discount: { value: item.discount },
          color: { value: item.color[0].color },
          mfName: { value: item.mfName }
        }
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
        console.log('info item - od', item)
      },
      //顯示編輯頁面
      edit(item, index, button) {
        this.editModal.title = `Current Item: ID - ${item.id}`
        //將資料導入EditingItem
        this.EditingItem = item
        console.log('open edit-item', this.EditingItem)
        this.$root.$emit('bv::show::modal', this.editModal.id, button)
      },
      //顯示編輯頁面
      editdetail(order, od, index, button) {
        this.editDetailModal.title = `Current Item: ID - ${od.orderID}`
        //將資料導入EditingItem
        this.editOD.orderid = order.id
        this.editOD.odindex = index
        this.editOD.orderdetail = od
        console.log('open edit-item', this.editOD.orderid, this.editOD.odindex)
        this.$root.$emit('bv::show::modal', this.editDetailModal.id, button)
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
        // this.$store.dispatch('ADD_STOCK', this.order)
        this.$store.commit('ADD_STOCK', this.order)
        this.Clear_Order()
      },
      editHandler() {
        // this.$store.dispatch('UPDATE_STOCK', {
        //   id: this.EditingItem.id,
        //   data: this.EditingItem
        // })
        this.$store.commit('UPDATE_STOCK', {
          id: this.EditingItem.id,
          data: this.EditingItem
        })

        this.$refs.table.refresh()
        this.Clear_Edit()
        this.hideModal('edit-modal')
      },
      editHandler_OD() {
        console.log('handler', this.editOD.orderid, this.editOD.odindex)

        this.$store.commit('UPDATE_ORDERDETAIL', {
          id: this.editOD.orderid,
          index: this.editOD.odindex,
          data: this.editOD.orderdetail
        })
        this.$refs.table.refresh()
        // this.Clear_OD()
        this.hideModal('edit-detail-modal')
      },
      deleteHandler(id) {
        console.log('delete row.item.id', id)
        this.$store.commit('REMOVE_STOCK', id)
        // this.$store.dispatch('REMOVE_STOCK', id)
      },
      deleteHandler_od(id, index) {
        this.$store.commit('REMOVE_OD', { id: id, index: index })
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
      // Clear_OD() {
      //   ;(this.editOD.orderid = ''),
      //     (this.editOD.odindex = ''),
      //     (this.editOD.orderdetail = '')
      // },
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
