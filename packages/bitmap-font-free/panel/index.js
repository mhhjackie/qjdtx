const fs = require('fs');
const {dialog} = require('electron').remote;
// panel/index.js, this filename needs to match the one registered in package.json
Editor.Panel.extend({
  // css style for panel
  style: `
  #app {
    background: #454545;
    color: #bdbdbd;
}

input {
    background: #252525;
    border: solid 1px #bdbdbd;
    border-radius: 3px;
    height: 20px;
    color: #bdbdbd;
}

button {
    background: #4e4e4e;
    border: solid 1px #252525;
    color: #bdbdbd;
    border-radius: 3px;

}

button:hover {
    background: #585858;
    cursor: pointer;
}

canvas {
    border: dashed 1px #585858;
    margin: 0 auto;
}

#imageList {
    border: solid 2px red;
    border-radius: 10px;
    width: 96%;
    margin: 0 auto;
}

#imageList tr td,
#imageList tr th {
    text-align: center;
}

#fieldList tr td:first-child {
    width: 80px;
}

.mini {
    font-size: 12px;
}
  `,

  // html template for panel
  template: `
  <div id="app">
    <h1>BitmapFont(永久免费)</h1>
    <hr />
    <table id="fieldList">
        <tr>
            <td>字体路径：</td>
            <td><input v-model="fontPath" /></td>
            <td>
                <button @click="selectFolder">选择</button>
                <input type="file" webkitdirectory directory hidden ref="inputFolder" @change="onFolderChange" />
            </td>
        </tr>
        <tr>
            <td>字体名称：</td>
            <td><input v-model="fontName" /></td>
            <td><button @click="save">生成</button></td>
        </tr>
        <tr>
            <td>字体大小：</td>
            <td><input type="number" v-model="fontSize" /></td>
            <td><span class="mini">单位：px</span></td>
        </tr>
        <tr>
            <td>间隙大小：</td>
            <td><input type="number" v-model="space" @change="updateImgCanvas" /></td>
            <td><span class="mini">单位：px</span></td>
        </tr>
        <tr>
            <td>画布尺寸：</td>
            <td><input type="number" v-model="canvasWidth" style="width: 60px;" @change="updateImgCanvas" /> × <input type="number" v-model="canvasHeight" style="width: 60px;" @change="updateImgCanvas" /></td>
            <td><button @click="canvasMini">最小化</button> <span class="mini">建议使用：128,268,512,1024,2048等数值</span></td>
        </tr>
    </table>
    <table id="imageList" ref="imageList" @dragenter="onDragenter" @dragover="onDragover" @drop="onDrop">
        <thead>
            <tr>
                <th>序号</th>
                <th>位置</th>
                <th>尺寸</th>
                <th>图片</th>
                <th title="自动提取文件名的第一个字符">
                    字符
                    <button @click="onSort(-1)">▲</button>
                    <button @click="onSort(1)">▼</button>
                </th>
                <th>操作<button @click="delAll">清空</button></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="( index,item) in imageList" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ item.x }},{{ item.y }}</td>
                <td>{{ item.width }}*{{ item.height }}</td>
                <td><img :src="item.img" /></td>
                <td>
                    <input v-model="item.char" style="width: 40px; text-align: center" />
                </td>
                <td><button @click="del(index)">删除</button></td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="6" style="border: dashed 1px #585858; border-radius:10px;">
                    <span class="mini">请拖入位图字体图片到红色线框内</span>
                </td>
            </tr>
        </tfoot>
    </table>

    <br>
    <div>
        <canvas id="fontCanvas" ref="fontCanvas" :width="canvasWidth" :height="canvasHeight"></canvas>
    </div>
    <p>画布尺寸{{canvasWidth}}x{{canvasHeight}} <button @click="updateImgCanvas">刷新画布</button></p>
    <br>
    <textarea :rows="imageList.length + 5" cols="150" v-model="info" hidden></textarea>
</div>
  `,

  // element and variable binding
  $: {
    fontCanvas: "#fontCanvas",
  },

  // method executed when template and styles are successfully loaded and initialized
  ready() {
    window._bitmap_font_free_global = this;
    new window.Vue({
      el: this.shadowRoot,
      data() {
        return {
          fontPath: "fonts/",
          fontName: "font1",
          fontSize: 32,
          imageList: [],
          updateImageList: [], //已经上传的图片标识
          canvasWidth: 512,
          canvasHeight: 512,
          canvasMinWidth: 512,
          canvasMinHeight: 512,
          info: '',
          space: 5,
        }
      }, methods: {
        selectFolder() {
          // this.$refs.inputFolder.click();
          this.fontPath = dialog.showOpenDialog({title:"选择保存目录", properties: ['openDirectory', ] })[0];
        },
        onFolderChange(e) {
          console.log(e);
        },
        onDragenter(e) {
          e.stopPropagation();
          e.preventDefault();
        },
        onDragover(e) {
          e.stopPropagation();
          e.preventDefault();
        },
        onDrop(e) {
          e.stopPropagation();
          e.preventDefault();

          var dt = e.dataTransfer; // eslint-disable-line no-unused-vars
          var files = dt.files; // eslint-disable-line no-unused-vars

          this.handleFiles(files);
        },
        handleFiles(files) {
          let that = this;
          console.log("----------------------");
          if (files.length) {
            for (var i = 0; i < files.length; i++) {
              let file = files[i];
              if (!/^image\//.test(file.type)) continue;
              console.log(file);
              let reader = new FileReader();
              reader.onload = (function () {
                return function (e) {
                  console.log("e", e.target.result);
                  if (that.updateImageList.indexOf(e.target.result) !== -1) return;
                  var img = new Image();
                  img.src = e.target.result;
                  img.onload = () => {
                    console.log(img.width, img.height);
                    that.imageList.push({
                      img: e.target.result,
                      char: file.name.substr(0, 1),
                      width: img.width,
                      height: img.height,
                      x: 0,
                      y: 0,
                    });
                    that.updateImageList.push(e.target.result);
                    that.updateImgCanvas();
                  };
                };
              })();
              reader.readAsDataURL(file);
            }
          }
        },
        del(index) {
          this.imageList.splice(index, 1);
          this.updateImgCanvas();
        },
        delAll() {
          this.imageList = [];
          this.updateImgCanvas();
        },
        canvasMini() {
          this.canvasWidth = this.canvasMinWidth;
          this.canvasHeight = this.canvasMinHeight;
          this.updateImgCanvas();
        },
        updateImgCanvas() {
          if (!this.imageList.length) return;
          let that = this;
          let height = 0;
          let x = this.space;
          let y = this.space;
          let xArr = [];
          this.imageList.forEach(item1 => {
            if (item1.height > height) height = item1.height;
          });
          height = Math.ceil(height);
          this.fontSize = height;
          let cxt = _bitmap_font_free_global.$fontCanvas.getContext('2d');
          cxt.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
          this.imageList.forEach(item2 => {
            let img = new Image();
            img.src = item2.img;
            if (x + item2.width + that.space > that.canvasWidth) {
              x = that.space;
              y += height + that.space;
              xArr.push(x);
            }
            cxt.drawImage(img, x, y);
            item2.x = x;
            item2.y = y;
            x += item2.width + that.space;
            console.log(item2, x, y, cxt);
          });
          xArr.push(x);
          this.canvasMinWidth = Math.max(...xArr);
          this.canvasMinHeight = y + height + this.space;
          this.updateInfo();
        },
        updateInfo() {
          let str = `info face="BitmapFontFree" size=${this.fontSize} bold=0 italic=0 charset="" unicode=1 stretchH=100 smooth=1 aa=1 padding=0,0,0,0 spacing=1,1 outline=0
common lineHeight=${this.fontSize} base=23 scaleW=${this.canvasWidth} scaleH=${this.canvasHeight} pages=1 packed=0 alphaChnl=4 redChnl=0 greenChnl=0 blueChnl=0
page id=0 file="${this.fontName}_0.png"
chars count=${this.imageList.length}
`;
          this.imageList.forEach(item => {
            str += `char id=${item.char.charCodeAt(0)} x=${item.x} y=${item.y} width=${item.width} height=${item.height} xoffset=0 yoffset=0 xadvance=${item.width} page=0 chnl=0\n`;
          })
          this.info = str;
        },
        //排序
        onSort(d) {
          let obj = {};
          let nameList = [];
          let list = [];
          this.imageList.forEach((item) => {
            let name = item.char + Math.floor(Math.random() * 900 + 100);
            obj[name] = item;
            nameList.push(name);
          });
          nameList.sort(function (a, b) {
            return d > 0 ? a - b : b - a;
          });
          nameList.forEach((_name) => {
            list.push(obj[_name]);
          });
          this.imageList = list;
          this.updateImgCanvas();
        },
        save() {
          this.saveImage();
          this.saveTxt();
        },
        saveTxt() {
          fs.writeFileSync(this.fontPath.replace(/\\/g,"/") + '/' + this.fontName + '.fnt', this.info);
        },
        saveImage() {
          let data = _bitmap_font_free_global.$fontCanvas.toDataURL("image/png");
          let base64Data = data.replace(/^data:image\/\w+;base64,/, "");
          let dataBuffer = new window.Buffer(base64Data, 'base64');
          fs.writeFileSync(this.fontPath.replace(/\\/g,"/") + '/' + this.fontName + '_0.png', dataBuffer);
        }
      },
    });
  },

  // register your ipc messages here
  messages: {
    'bitmap-font-free:hello'(event) {

    }
  }
});