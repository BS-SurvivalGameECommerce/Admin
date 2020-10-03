

<script>
  import Axios from 'axios'
  import Chart from 'chart.js'
  // import '../../assets/chartjs/productchart.js'
  // import '../../assets/chartjs/productclasschart.js'
  const url = 'http://sgwebapi-core.azurewebsites.net/'
  const SalesQuantity = url + 'api/Chart/SalesQuantity'
  const MonthlyTransactions = url + 'api/Chart/MonthlyTransactions'
  const ClassSalesQuantity = url + 'api/Chart/ClassSalesQuantity'
  const NewOrders = url + 'api/Chart/OrderNowQuantity'
  const ShipmentAmount = url + 'api/Chart/ShipmentAmount'
  const PurchaseAmount = url + 'api/Chart/PurchaseAmount'
  const MemberQuantity = url + 'Member/MemberQuantity'
  const WithListQuantity = url + 'api/Chart/WithListQuantity'

  export default {
    name: 'productsale',
    data() {
      return {
        NewOrders: '',
        CurrentMember: '',
        ShipmentAmount: '',
        PurchaseAmount: ''
      }
    },
    mounted() {
      var totalamountjson = []
      Axios.get(SalesQuantity)
        .then(res => {
          // console.log(res.data.data)
          totalamountjson = res.data.data
          let productname = []
          let producttotalamount = []
          let producttotalquantity = []
          totalamountjson.forEach(el => {
            productname.push(el.name)
            producttotalamount.push(el.totalAmount)
            producttotalquantity.push(el.totalQuantity)
          })
          var productdata = {
            ChartName1: '產品銷售數',
            ChartName2: '產品銷售額',
            Name: productname,
            TotalAmount: producttotalamount,
            TotalQuantity: producttotalquantity
          }
          // console.log(productdata)
          // var salesChartCanvas = $('#revenue-chart-canvas').get(0).getContext('2d')
          var productsalesChartCanvas = document.getElementById(
            'revenue-chart-canvas'
          )
          var productsalesChartData = {
            labels: productdata.Name,
            datasets: [
              {
                label: productdata.ChartName1,
                backgroundColor: 'rgba(60,141,188,0.5)',
                borderColor: 'rgba(60,141,188,0.8)',
                fill: true,
                yAxisID: 'A',
                data: productdata.TotalQuantity
              },
              {
                label: productdata.ChartName2,
                backgroundColor: 'transparent',
                borderColor: 'rgba(210, 214, 222, 1)',
                pointRadius: 10,
                pointStyle: 'circle',
                pointColor: 'rgba(210, 214, 222, 1)',
                pointBackgroundColor: 'rgba(210, 214, 222, 1)',
                pointStrokeColor: '#c1c7d1',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(220,220,220,1)',
                fill: true,
                yAxisID: 'B',
                type: 'line',
                data: productdata.TotalAmount
              }
            ]
          }
          var productsalesChartOptions = {
            maintainAspectRatio: false,
            responsive: true,
            legend: {
              position: 'bottom',
              labels: {
                fontColor: 'black'
              }
            },
            scales: {
              xAxes: [
                {
                  gridLines: {
                    display: false
                  },
                  ticks: {
                    display: false
                  }
                }
              ],
              yAxes: [
                {
                  gridLines: {
                    display: false
                  },
                  id: 'A',
                  type: 'linear',
                  position: 'left',
                  ticks: {
                    min: 0
                  }
                },
                {
                  gridLines: {
                    display: false
                  },
                  id: 'B',
                  type: 'linear',
                  position: 'right',
                  ticks: {
                    min: 0
                  }
                }
              ]
            }
          }
          // var productsalesChart =
          new Chart(productsalesChartCanvas, {
            type: 'bar',
            data: productsalesChartData,
            options: productsalesChartOptions
          })
        })
        .catch(err => {
          console.log(err)
        })

      var totalTransactionsjson = []
      Axios.get(MonthlyTransactions)
        .then(res => {
          totalTransactionsjson = res.data.data
          // console.log(totalTransactionsjson)
          let month = []
          let totaltransactions = []
          let totalturnover = []
          totalTransactionsjson.forEach(el => {
            month.push(`${el.month}月`)
            totaltransactions.push(el.totalTransactions)
            totalturnover.push(el.totalTurnover)
          })

          var data = {
            ChartName1: '月成單數',
            ChartName2: '月營業額',
            Month: month,
            TotalTransactions: totaltransactions,
            ToTalturnover: totalturnover
          }

          var salesChartCanvas = document.getElementById(
            'revenue-month-chart-canvas'
          )
          var salesChartData = {
            labels: data.Month,
            datasets: [
              {
                label: data.ChartName1,
                backgroundColor: 'rgba(60,141,188,0.5)',
                borderColor: 'rgba(60,141,188,0.8)',
                fill: true,
                yAxisID: 'A',
                data: data.TotalTransactions
              },
              {
                label: data.ChartName2,
                backgroundColor: 'transparent',
                borderColor: 'rgba(210, 214, 222, 1)',
                pointRadius: 10,
                pointStyle: 'circle',
                pointColor: 'rgba(210, 214, 222, 1)',
                pointBackgroundColor: 'rgba(210, 214, 222, 1)',
                pointStrokeColor: '#c1c7d1',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(220,220,220,1)',
                fill: true,
                yAxisID: 'B',
                type: 'line',
                data: data.ToTalturnover
              }
            ]
          }
          var salesChartOptions = {
            maintainAspectRatio: false,
            responsive: true,
            legend: {
              position: 'bottom',
              labels: {
                fontColor: 'black'
              }
            },
            scales: {
              xAxes: [
                {
                  gridLines: {
                    display: false
                  }
                }
              ],
              yAxes: [
                {
                  gridLines: {
                    display: false
                  },
                  id: 'A',
                  type: 'linear',
                  position: 'left',
                  ticks: {
                    min: 0
                  }
                },
                {
                  gridLines: {
                    display: false
                  },
                  id: 'B',
                  type: 'linear',
                  position: 'right',
                  ticks: {
                    min: 0
                  }
                }
              ]
            }
          }
          // var salesChart =
          new Chart(salesChartCanvas, {
            type: 'bar',
            data: salesChartData,
            options: salesChartOptions
          })
        })
        .catch(err => {
          console.log(err)
        })

      var productclaajson = []
      Axios.get(ClassSalesQuantity)
        .then(res => {
          productclaajson = res.data.data
          let classname = []
          let classtotalquantity = []
          productclaajson.forEach(el => {
            classname.push(el.name)
            classtotalquantity.push(el.totalQuantity)
          })
          var classdata = {
            ChartName1: '產品類別銷售數',
            Name: classname,
            TotalQuantity: classtotalquantity
          }

          var classsalesChartCanvas = document.getElementById(
            'revenue-class-chart-canvas'
          )
          var classsalesChartData = {
            labels: classdata.Name,
            datasets: [
              {
                label: classdata.ChartName1,
                backgroundColor: [
                  '#FF88C2',
                  '#FFBB66',
                  '#FFDD55',
                  '#DDFF77',
                  '#BBFF66',
                  '#66FF66',
                  '#77FFCC',
                  '#99BBFF',
                  '	#B94FFF',
                  '#E38EFF',
                  '#FF8888'
                ],
                borderColor: [
                  '#FF88C2',
                  '#FFBB66',
                  '#FFDD55',
                  '#DDFF77',
                  '#BBFF66',
                  '#66FF66',
                  '#77FFCC',
                  '#99BBFF',
                  '	#B94FFF',
                  '#E38EFF',
                  '#FF8888'
                ],
                fill: true,
                data: classdata.TotalQuantity
              }
            ]
          }
          var classsalesChartOptions = {
            maintainAspectRatio: false,
            responsive: true,
            legend: {
              position: 'bottom',
              labels: {
                fontColor: 'black'
              }
            },
            scales: {
              xAxes: [
                {
                  gridLines: {
                    display: false
                  },
                  ticks: {
                    display: false
                  }
                }
              ],
              yAxes: [
                {
                  gridLines: {
                    display: false
                  },
                  // type: 'linear',
                  position: 'left',
                  ticks: {
                    display: false
                  }
                }
              ]
            }
          }
          // var classsalesChart =
          new Chart(classsalesChartCanvas, {
            type: 'pie',
            data: classsalesChartData,
            options: classsalesChartOptions
          })
        })
        .catch(err => {
          console.log(err)
        })
      var withlistjson = []
      Axios.get(WithListQuantity)
        .then(res => {
          withlistjson = res.data.data
          console.log(withlistjson)
          let productname = []
          let totalquantity = []
          for (let i = 0; i < 7; i++) {
            productname.push(withlistjson[i].productName)
            totalquantity.push(withlistjson[i].totalQuantity)
          }
          var withlistdata = {
            ChartName1: '產品類別銷售數',
            Name: productname,
            TotalQuantity: totalquantity
          }

          var withlistChartCanvas = document.getElementById(
            'revenue-withlist-chart-canvas'
          )
          var withlistChartData = {
            labels: withlistdata.Name,
            datasets: [
              {
                label: withlistdata.ChartName1,
                backgroundColor: [
                  '#FF88C2',
                  '#FFBB66',
                  '#FFDD55',
                  '#DDFF77',
                  '#BBFF66',
                  '#66FF66',
                  '#77FFCC'
                ],
                borderColor: [
                  '#FF88C2',
                  '#FFBB66',
                  '#FFDD55',
                  '#DDFF77',
                  '#BBFF66',
                  '#66FF66',
                  '#77FFCC'
                ],
                fill: true,
                data: withlistdata.TotalQuantity
              }
            ]
          }
          var withlistChartOptions = {
            maintainAspectRatio: false,
            responsive: true,
            legend: {
              position: 'bottom',
              labels: {
                fontColor: 'black'
              }
            },
            scales: {
              xAxes: [
                {
                  gridLines: {
                    display: false
                  },
                  ticks: {
                    display: false
                  }
                }
              ],
              yAxes: [
                {
                  gridLines: {
                    display: false
                  },
                  position: 'left',
                  ticks: {
                    display: false
                  }
                }
              ]
            }
          }
          new Chart(withlistChartCanvas, {
            type: 'polarArea',
            data: withlistChartData,
            options: withlistChartOptions
          })
        })
        .catch(err => {
          console.log(err)
        })

      Axios.get(NewOrders)
        .then(res => {
          // console.log(`長度:${res.data.data.length}`)
          this.NewOrders = res.data.data.length
        })
        .catch(err => {
          console.log(err)
        })
      Axios.get(ShipmentAmount)
        .then(res => {
          console.log(res.data.data.length)
          if (res.data.data.length == 0) {
            this.ShipmentAmount = 0
          } else {
            this.ShipmentAmount = res.data.data[0].totalAmount
          }

          // console.log(res.data.data[0].totalAmount)
        })
        .catch(err => {
          console.log(err)
        })
      Axios.get(PurchaseAmount)
        .then(res => {
          if (res.data.data.length == 0) {
            this.PurchaseAmount = 0
          } else {
            this.PurchaseAmount = res.data.data[0].totalAmount
          }

          // console.log(res.data.data[0].totalAmount)
        })
        .catch(err => {
          console.log(err)
        })
      Axios.get(MemberQuantity)
        .then(res => {
          this.CurrentMember = res.data.data.totalQuantity
          // console.log(res.data.data.totalQuantity)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
</script>

<template src="./template.html"></template>
