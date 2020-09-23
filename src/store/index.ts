import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { data } from 'jquery'

Vue.use(Vuex)

const url = 'https://localhost:44306/'
const shipment = url + 'Shipment/GetShipment/'
const memberurl = url + 'TZMember/GetMember'
const memberpost = url + 'TZMember/ChangeStatus/'
const membermod = url + 'TZMember/ChangeMifo/'
export default new Vuex.Store({
  strict: false,
  state: {
    stock: [
      {
        id: 'OR001',
        memberId: 'MB001',
        shipAddress: '707, Sec.2, WuFu Rd., Hsinchu, 30012 Taiwan (ROC)',
        status: null,
        orderDate: '2020-06-14T08:55:00',
        shippedDate: '2020-06-16T16:51:00',
        deliveryMethod: null,
        paymentMethod: '信用卡',
        quantity: 3,
        unitPrice: 435.0,
        order: [
          {
            color: '',
            discount: '',
            mfName: '',
            orderID: '',
            price: '',
            productName: '',
            quantity: '',
            unitPrice: '',
          },
        ],
        name: 'TOKYO MARUI M4 CQB-R SOPMOD EBB Rifle (Next Gen, Black)',
      },
    ],
    member: [],
  },
  //拿處理過的state - 使用getter
  getters: {
    getstock(state) {
      return state.stock
    },
  },
  mutations: {
    SET_STOCK(state, data) {
      state.stock = data
      console.log('mutation-set', data)
    },
    SET_MEMBER(state, data) {
      state.member = data
      console.log('mutation-set', data)
    },
    ADD_STOCK(state, data) {
      state.stock.push(data)
      console.log('mutation-add', data)
    },
    UPDATE_STOCK(state, { id, data }) {
      let index = state.stock.findIndex((x) => x.id == id)
      state.stock[index] = data
      console.log('update - data', index, data)
    },
    UPDATE_ORDERDETAIL(state, { id, index, data }) {
      let n = state.stock.findIndex((x) => x.id == id)

      state.stock[n].order[index] = data
      console.log('update - data', index, data)
    },
    REMOVE_STOCK(state, id) {
      let index = state.stock.findIndex((x) => x.id == id)
      state.stock.splice(index, 1)
      console.log('mutation-delete', index, state.stock[index])
    },
    UPDATE_STATUS(context, data) {
      console.log(`${data}`)

      axios
        .post(memberpost, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log('update data', data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    UPDATE_MEMBERSinfo(context, data) {
      console.log(`${data}`)
      axios
        .post(membermod, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log('update data', data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  actions: {
    // 從api取得資料
    INIT_STOCK(context) {
      axios
        .get(shipment)
        .then((res) => {
          console.log('get-data-axios-stock', res.data.data)
          context.commit('SET_STOCK', res.data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    POST_STOCK(context, data) {
      axios
        .post(shipment, data)
        .then((res) => {
          console.log('post-data-axios', data)
          context.commit('POST_STOCK', data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    UPDATE_STOCK(context, { id, data }) {
      axios
        .put(shipment + id, data)
        .then((res) => {
          console.log('put-data-axios', data)
          context.commit('UPDATE_STOCK', { id, data })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    REMOVE_STOCK(context, id) {
      axios
        .delete(url + id)
        .then((res) => {
          console.log('delete-data-axios')
          context.commit('REMOVE_STOCK', id)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    //===============MEMBER=================================
    INIT_MEMBER(context) {
      axios
        .get(memberurl)
        .then((res) => {
          console.log('get-data-axios', res.data.data)
          context.commit('SET_MEMBER', res.data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
  modules: {},
})
