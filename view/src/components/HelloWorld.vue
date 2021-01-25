<template>
  <div class="hello">
    <div>
      <!-- <a-icon type="plus" /> -->
      <div>
        <a-button icon="plus" @click="showModal">
          添加
        </a-button>
      </div>
      <div>
        <a-modal v-model="visible" title="Basic Modal" @ok="handleOk">
          <a-form :layout="formLayout">
            <div>
              <div>自身属性</div>
              <a-form-item
                label="属性名称"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-input
                  placeholder="请输入属性名称"
                  v-model="addData.selfAtter.label"
                />
              </a-form-item>
              <a-form-item
                label="属性值"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-input
                  placeholder="请输入属性值"
                  v-model="addData.selfAtter.value"
                />
              </a-form-item>
            </div>
            <div>
              <div>子属性</div>
              <a-form-item
                label="属性名称"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-input
                  placeholder="请输入属性名称"
                  v-model="addData.childAtter.label"
                />
              </a-form-item>
              <a-form-item
                label="属性值"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
              >
                <a-input
                  placeholder="请输入属性值"
                  v-model="addData.childAtter.value"
                />
              </a-form-item>
            </div>
          </a-form>
        </a-modal>
      </div>

      <div>
        <a-input-search
          style="margin-bottom: 8px"
          placeholder="Search"
          @change="onChange"
        />
        <a-tree
          :expanded-keys="expandedKeys"
          :auto-expand-parent="autoExpandParent"
          :tree-data="gData"
          @expand="onExpand"
          :selected-keys="selectedKeys"
          @select="onSelect"
        >
          <!-- :selected-keys="selectedKeys" -->
          <template slot="title" slot-scope="{ title }">
            <span v-if="title.indexOf(searchValue) > -1">
              {{ title.substr(0, title.indexOf(searchValue)) }}
              <span style="color: #f50">{{ searchValue }}</span>
              {{
                title.substr(title.indexOf(searchValue) + searchValue.length)
              }}
            </span>
            <span v-else>{{ title }}</span>
          </template>
        </a-tree>
      </div>
    </div>
  </div>
</template>

<script>
// const x = 3;
// const y = 2;
// const z = 1;
const gData = [
  {
    title: "root",
    key: "root",
    scopedSlots: {
      title: "title"
    },
    children: []
    // children: [l
    //   {
    //     title: "0-0",
    //     key: "0",
    //     scopedSlots: {
    //       title: "title"
    //     },
    //     children: []
    //   },
    //   {
    //     title: "0-1",
    //     key: "1",
    //     scopedSlots: {
    //       title: "title"
    //     },
    //     children: [
    //       {
    //         title: "0-1-0-0",
    //         key: "0-1-0-0",
    //         scopedSlots: {
    //           title: "title"
    //         },
    //         children: []
    //       },
    //       {
    //         title: "0-1-0-1",
    //         key: "0-1-0-1",
    //         scopedSlots: {
    //           title: "title"
    //         },
    //         children: []
    //       },
    //       {
    //         title: "0-1-0-2",
    //         key: "0-1-0-2",
    //         scopedSlots: {
    //           title: "title"
    //         },
    //         children: []
    //       }
    //     ]
    //   },
    //   {
    //     title: "0-2",
    //     key: "123",
    //     scopedSlots: {
    //       title: "title"
    //     },
    //     children: []
    //   }
    // ]
  }
];

const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || "0";
  const tns = _tns || gData;

  const children = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({ title: key, key, scopedSlots: { title: "title" } });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};
// generateData(z);

const dataList = [];
const generateList = data => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const key = node.key;
    dataList.push({ key, title: key });
    if (node.children) {
      generateList(node.children);
    }
  }
};
generateList(gData);

const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};
export default {
  name: "HelloWorld",
  data() {
    return {
      expandedKeys: [],
      searchValue: "",
      autoExpandParent: true,
      gData,
      selectedKeys: [],
      currentSelectTreeData: "root",
      findMenuObj: {},

      visible: false,
      formLayout: "horizontal",
      addData: {
        selfAtter: {
          label: "",
          value: ""
        },
        childAtter: {
          label: "",
          value: ""
        }
      }
    };
  },
  computed: {
    formItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 }
          }
        : {};
    },
    buttonItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
        ? {
            wrapperCol: { span: 14, offset: 4 }
          }
        : {};
    }
  },
  methods: {
    handleFormLayoutChange(e) {
      // this.formLayout = e.target.value;
    },
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys;
      console.log(this.expandedKeys, 123123123132);
      this.autoExpandParent = false;
    },
    onChange(e) {
      const value = e.target.value;
      const expandedKeys = dataList
        .map(item => {
          if (item.title.indexOf(value) > -1) {
            return getParentKey(item.key, gData);
          }
          return null;
        })
        .filter((item, i, self) => item && self.indexOf(item) === i);
      Object.assign(this, {
        expandedKeys,
        searchValue: value,
        autoExpandParent: true
      });
    },
    onSelect(selectedKeys, info) {
      console.log("onSelect", info);
      this.selectedKeys = selectedKeys;
      this.currentSelectTreeData = selectedKeys;
    },
    addMenu(newChild) {
      //添加

      const root = this.gData[0];
      // 添加到根目录
      if (String(this.currentSelectTreeData) === "root") {
        this.gData[0].children.push(newChild);
      } else {
        // 添加到子目录
        this.findMenu(root, this.currentSelectTreeData);
        this.findMenuObj.children.push(newChild);
      }
      generateList(this.gData);
    },
    // 查找菜单在树的节点位置
    findMenu(data, key) {
      data.children.filter(item => this.searchMenu(item, key));
    },
    searchMenu(item, key) {
      if (String(item.key) === String(key)) {
        this.findMenuObj = item;
        return true;
      } else {
        if (item.children.length > 0) {
          this.findMenu(item, key);
        } else {
          return false;
        }
      }
    },
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
      //调用添加方法
      console.log(123123, this.addData);
      let data = this.addData;
      let childAtter = {
        title: data.childAtter.label + " : " + data.childAtter.value,
        key: data.childAtter.label + " : " + data.childAtter.value,
        value: data.childAtter.value,
        scopedSlots: { title: "title" },
        children: []
      };
      this.addMenu(childAtter);
      let selfAtter = {
        title: data.selfAtter.label + " : " + data.selfAtter.value,
        key: data.selfAtter.label + " : " + data.selfAtter.value,
        value: data.selfAtter.value,
        scopedSlots: { title: "title" },
        children: []
      };
      this.addMenu(selfAtter);
    }
    // handleCancel(e) {
    //   console.log("Clicked cancel button");
    //   this.visible = false;
    // }
  },
  mounted() {
    console.log(this.gData);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
