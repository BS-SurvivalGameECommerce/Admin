<script>
import axios from "axios";
var product = [];
var AllCatagory = [];
// const id = "6bf0ca08d5201bf"; // 填入 App 的 Client ID
const token = "693486dcc4b44e86173cd9f4efad156d88c5f4c0"; // 填入 token
var productid = "";

export default {
  name: "stock",
  data() {
    return {
      stockapi: this.$store.state.url + "Product/Menu",
      intpurchaseapi: this.$store.state.url + "Product/GetAllProductAttribute",
      postapi: this.$store.state.url + "Product/Purchase",
      items: product,
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
      ProductName: "",
      InvetoryQuantity: "",
      Price: "",
      imgururl: "",
      text: "",
      options: [],
      optionscolor: [],
      tagcc: [],
      tagcolor: [],
      selectedcolor: "",
      value: [],
      CatagoryName: [],
      selectedCatagory: null,
      selectedCatagoryid: null,
      ClassName: [],
      selectedClass: null,
      selectedClassid: null,
      AttrName: [],
      selectedAttrName: null,
      Attrvalue: [],
      selectedAttrvalue: null,
      AllAttr: [],
      ManufacturerName: [],
      selectedManufacturer: null,
      selectedManufacturerid: null,

      form: {
        name: "",
      },
      fs: {
        name: "", // input的圖檔名稱
        thumbnail: null, // input的圖片縮圖
        size: null, // input的圖片大小
      },
    };
  },
  computed: {
    availableOptions() {
      return this.optionscolor.filter((opt) => this.value.indexOf(opt) === -1);
    },
  },
  mounted() {
    axios({
      url: this.stockapi,
      method: "Get",
    }).then((res) => {
      let response = res.data;
      response.data.forEach((item) => {
        productid = item.pid;
        product.push(item);
      });
      this.totalRows = product.length;
    });
    axios({
      url: this.intpurchaseapi,
      method: "Get",
    }).then((res) => {
      let response = res.data;
      response.data.catagoryAttrList.forEach((item) => {
        AllCatagory.push(item);
        this.CatagoryName.push(item);
      });
      response.data.manufacturerList.forEach((item) => {
        this.ManufacturerName.push(item);
      });
      response.data.colorList.forEach((item) => {
        this.options.push(item);
        this.optionscolor.push(item.color);
      });
    });
  },
  methods: {
    Purchaseapi() {
      productid = productid.substr(2);
      productid = parseInt(productid) + 1;
      if (productid < 100) {
        productid = "PD0" + productid;
      } else {
        productid = "PD" + productid;
      }

      let data = {
        Pid: productid,
        Name: this.ProductName,
        InvetoryQuantity: parseInt(this.InvetoryQuantity),
        Price: parseFloat(this.Price),
        Img: this.imgururl,
        CatagoryId: this.selectedCatagoryid,
        ClassId: this.selectedClassid,
        AttrList: this.AllAttr,
        ManufacturerId: this.selectedManufacturerid,
        Color: this.tagcolor,
        Depiction: this.text,
      };
      console.log(data);
      axios({
        method: "POST",
        url: this.postapi,
        data: data,
      })
        .then((res) => {
          console.log(res);

          alert("新增成功");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    color() {
      let cccolor = this.options.filter(
        (item) => item.color == this.selectedcolor
      );
      this.tagcolor.push(cccolor[0]);
      this.tagcc.push(cccolor[0].cc);
      // console.log(this.tagcolor)
    },
    addattr() {
      if (this.selectedAttrName != null && this.selectedAttrvalue != null) {
        this.AllAttr.push({
          Name: this.selectedAttrName,
          Value: this.selectedAttrvalue,
        });
      }
    },
    Manufacturerchange(event) {
      let select = this.ManufacturerName.filter(
        (item) => item.manufacturerName == event.target.value
      );
      this.selectedManufacturerid = select[0].manufacturerID;
      // console.log(select[0].manufacturerID)
      // console.log(this.selectedManufacturerid)
    },
    catagorychange: function (event) {
      this.ClassName = [];
      let select = AllCatagory.filter(
        (item) => item.catagoryName == event.target.value
      );
      select[0].classAttrList.forEach((item) => {
        this._data.ClassName.push(item);
      });
      this.selectedCatagoryid = select[0].catagoryID;
      // console.log(this.selectedCatagoryid)
    },
    classchange: function (event) {
      this._data.AttrName = [];
      let num;
      let endnum;
      AllCatagory.forEach((item) => {
        num = item.classAttrList
          .map(function (aitem) {
            return aitem.className;
          })
          .indexOf(event.target.value);
        if (num != -1) {
          endnum = num;
        }
      });
      let select = AllCatagory.filter(
        (item) => item.classAttrList[endnum].className == event.target.value
      );
      select[0].classAttrList[endnum].attrList.forEach((item) => {
        if (this._data.AttrName.indexOf(item.name) == -1) {
          this._data.AttrName.push(item.name);
        }
        if (this._data.Attrvalue.indexOf(item.value) == -1) {
          this._data.Attrvalue.push(item.value);
        }
      });
      this.selectedClassid = select[0].classAttrList[endnum].classID;
      // console.log(this.selectedClassid)
    },
    showFile: function (e) {
      this.file = e.target.files[0]; // input type="file" 的值
      this.fs.name = this.file.name; // input的圖檔名稱
      this.fs.size = Math.floor(this.file.size * 0.001) + "KB"; // input的圖片大小
      this.fs.thumbnail = window.URL.createObjectURL(this.file); // input的圖片縮圖
      this.title = this.fs.name; // 預設 input 的圖檔名稱為圖片上傳時的圖片標題
      let form = new FormData();
      form.append("image", this.file);
      axios({
        method: "POST",
        url: "https://api.imgur.com/3/image",
        data: form,
        headers: { Authorization: "Bearer " + token }, //放置你剛剛申請的Client-ID
        mimeType: "multipart/form-data",
      })
        .then((res) => {
          // console.log(res.data.data.link);
          this.imgururl = res.data.data.link;
          // console.log(this.imgururl);
          alert("新增成功");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
};
</script>
<template src="./template.html"></template>
<style src="./style.scss" lang="scss"></style>