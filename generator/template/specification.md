# 前端开发规范
## 格式化
- 编辑器 `VSCcode`
    - 插件 `vetur`/`eslint`/`prettier`
- 格式化
    - 格式校验和修正 - `eslint`
    - 标准 - `standard`

## Vue文件字段顺序
- name（`required`）
- mixins
- components
- data
- props
- computed
- watch
- created
- mounted
- beforeDestroy
- methods

## 命名
### 变量命名
- 小写开头的驼峰命名
- 布尔值需要以is/can/has 开头， 如`isLoading`/`hasWriteRole`

### 方法命名
- 事件方法需要以`on`开头, 如`onItemClick`
- 普通方法以动作开头，如`getUserInfo`/`deleteUser`/`createUser`
- 语义化命名，方法名概括方法内容

### 文件命名
- `views`: 对应路由路径,全小写且尽量简洁，如`/user/modify.vue`
- `components`: 大写开头的驼峰命名，如`HomeSwiper`
- 公共组件可小写
    - `components/chart/line.vue` 图表/折线图
    - `components/chart/pie.vue` 图表/饼图
- 引入组件统一大写驼峰
    - `import ChartLine from 'components/chart/line'`


## 路由
- 全部小写，尽量简短
- 避免命名冗余
- 必须加name, 跳转用name
- id参数用params
    - `this.$router.push({ name: 'field', params: { id: item.id } })`


## 目录结构
目录 | 描述
--- | ---
/apis | 服务端接口请求
/assets | 静态资源
/components | 组件
/config | 公共配置/常量
/i18n | 国际化资源目录
/mixins | Vue mixins
/router | 路由
/store | 状态管理
/utils | 公共工具方法
/views | 页面文件目录

## 其它要求
- __页面或组件内部注册全局的事件/实例/定时器/异步请求,离开时要销毁__
- 空值初始化
    - 字符串: `''`
    - 数字: `-1/0`
    - 数组: `[]`
    - 对象：`null`
    - 布尔值: `false/true`
- __不可改变字段数据类型__, 如初始化`users: []`，任何时候都不要修改`users`为数组之外其它类型，如：`this.users = JSON.stringify(this.user)`
- mixin内部方法名示例`$_myGreatMixin_update`
- 不要手动操作DOM
- `localStorage`的key需要使用公共全局**常量**，且以项目标识字符串开头，如`xaos_settings`
- 生产环境删除没用的console.log
- __自己做的功能要多测试__
- [Vue风格指南](https://cn.vuejs.org/v2/style-guide)

## TIP
- 未写在data中，直接挂在在实例上的数据不会监听，如`this.map = CreateMap(this.$refs.map)`
- 图片上传地址中加上`_width_height`以保存图片宽高

## 指标
- 时间/开发效率
- 质量
    - 功能/体验
    - 代码质量
    - 可维护性
    - 界面外观
