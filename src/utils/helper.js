/**
 * @name 助手函数
 * @author 相左
 * @link https://www.ztyang.com
 * @version 1.0.0
 */
class helper {
  /**
   * @name 构造器
   * @description 初始化函数
   */
  constructor() {
    // 链式操作 is 属性
    this.is = {
      empty: (value) => this.isEmpty(value),
      NULL: (value) => this.isNull(value),
    };

    // 链式操作 fetch 属性
    this.fetch = {
      get: (url, params, config) => this.fetchGet(url, params, config),
      session: (namespace, key) => this.getSession(namespace, key),
    };

    // 链式操作 get 属性
    this.get = {
      storage: (namespace, key) => this.getStorage(namespace, key),
      cookie: (name) => this.getCookie(name),
      session: (namespace, key, value) =>
        this.getSession(namespace, key, value),
      random: {
        num: (min, max) => this.getRandomNum(min, max),
      },
    };

    // 链式操作 set 属性
    this.set = {
      storage: (namespace, key, value) =>
        this.setStorage(namespace, key, value),
      cookie: (name, value, exdays) => this.setCookie(name, value, exdays),
      session: (namespace, key, value) =>
        this.setSession(namespace, key, value),
    };

    // 链式操作 has 属性
    this.has = {
      storage: (namespace, key) => this.hasStorage(namespace, key),
      cookie: (key) => this.hasCookie(key),
      session: (key) => this.hasSession(key),
    };

    // 链式操作 delete 属性
    this.clear = {
      cookie: (name) => this.clearCookie(name),
      storage: (key) => this.clearStorage(key),
      session: (key) => this.clearSession(key),
    };

    // 链式操作 time 属性
    this.time = {
      nature: (timestamp, type) => this.natureTime(timestamp, type),
      to: {
        date: (unixTime, type) => this.timeToDate(unixTime, type),
      },
    };
  }

  /**
   * @name 判断是否为空
   * @param {any} value 字符串 | 空格 | 数组 | 对象
   * @return {boolean}
   */
  isEmpty(value = null) {
    let result = false;
    if (Array.isArray(value)) {
      if (Array.prototype.isPrototypeof(value) && data.length === 0)
        return true;
    } else if (typeof value === "Number") {
      result = isNaN(value);
    } else if (!this.isNull(value)) {
      if (value instanceof Object) {
        if (JSON.stringify(value) == "{}") result = true;
      } else if ((value + "").replace(/(^\s*)|(\s*$)/g, "").length === 0)
        result = true;
    } else result = true;

    return result;
  }

  /**
   * @name 是否为NULL
   * @param {string} value 字符串
   * @return {boolean} result
   */
  isNull(value = "") {
    let result = false;

    if (
      value == null ||
      typeof value == "undefined" ||
      value === undefined ||
      value.length === 0
    )
      result = true;
    else result = false;

    return result;
  }

  /*
   * @name 获取范围内的随机数
   */
  getRandomNum(min = 0, max = 100) {
    let range = max - min;
    let rand = Math.random();
    // 四舍五入
    let result = min + Math.round(rand * range);
    return result;
  }

  /**
   * @name 网络请求 - GET
   * @param {string} url    [请求地址]
   * @param {object} params [请求参数]
   * @param {object} config [请求配置]
   * @return {object}
   */
  async fetchGet(url, params = {}, config = {}) {
    const response = await fetch(
      url + (this.isEmpty(params) ? "" : "?" + this.stringfy(params)),
      config
    );
    return await response.json();
  }

  /**
   *
   * @name   对象序列化
   * @param  {Object} obj
   * @return {String}
   */
  stringfy(obj) {
    let s = [],
      add = (key, value) => {
        // 空数据处理
        value = encodeURIComponent(value) == "undefined" ? "" : value;
        s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
      };

    if (Array.isArray(obj)) for (let v in obj) add(v, obj[v]);
    else
      for (let prefix in obj) {
        this.stringfyBuild(prefix, obj[prefix], add);
      }

    return s.join("&");
  }

  /**
   *
   * @name   对象序列化 - 格式数据
   * @param  {String} prefix 前缀
   * @param  {Object} obj 对象数据
   * @param  {function} add 回调函数
   */
  stringfyBuild(prefix, obj, add) {
    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        this.stringfyBuild(
          prefix + "[" + (typeof obj[i] === "object" ? i : "") + "]",
          obj[i],
          add
        );
      }
    } else if (typeof obj == "object") {
      for (let name in obj) {
        this.stringfyBuild(prefix + "[" + name + "]", obj[name], add);
      }
    } else add(prefix, obj);
  }

  /**
   * @name 获取localStorage数据
   * @param {string} namespace [localStorage的key值]
   * @param {string} key [localStorage的value中JSON对象的key值]
   * @return {string}
   */
  getStorage(namespace, key = true) {
    let result = false;
    let time = Math.round(new Date() / 1000);

    if (this.isEmpty(namespace)) console.warn("请输入需要查询的key!");
    else {
      let storage = localStorage.getItem(namespace);

      if (!this.isEmpty(storage)) {
        if (typeof key == "boolean" && key) {
          result = JSON.parse(storage);
          // 判断是否已过期
          if (
            result.hasOwnProperty("end_time") &&
            !this.isEmpty(result.end_time) &&
            result.end_time <= time
          )
            result = "expire";
        } else if (typeof key == "boolean") result = storage;
        else {
          storage = JSON.parse(storage);

          if (this.isEmpty(storage[key])) result = null;
          else {
            result = storage[key];
            // 判断是否已过期
            if (
              typeof result == "object" &&
              result.hasOwnProperty("end_time") &&
              !this.isEmpty(result.end_time) &&
              result.end_time <= time
            )
              result = "expire";
          }
        }
      }
    }

    return result;
  }

  /**
   * @name 设置localStorage数据
   * @param {string} namespace [localStorage的key值]
   * @param {string || object} key [localStorage的value中JSON对象的key值]
   * @param {string} value [localStorage的value中JSON对象的value值]
   * @return {boolean}
   */
  setStorage(namespace, key, value) {
    // 返回结果
    let result = false;

    if (this.isEmpty(namespace)) console.warn("请输入需要存储的key名称！");
    else if (this.isEmpty(key)) console.warn("键值key不得为空！");
    else {
      let storage = localStorage.getItem(namespace);

      // 如果不存在，则新建
      if (!storage) storage = {};
      else storage = JSON.parse(storage);

      if (typeof key == "string") {
        // 如果不存在，则新建
        if (!storage[key]) storage[key] = {};

        if (typeof value == "object") {
          // 动态保存
          for (let item in value) {
            if (item == "time" && this.isEmpty(value[item]))
              storage[key]["end_time"] = null;
            else if (item == "time")
              storage[key]["end_time"] =
                value[item] + Math.round(new Date() / 1000);
            else storage[key][item] = value[item];
          }
        } else {
          storage[key]["value"] = value;
        }
      } else if (typeof key == "object")
        for (let item in key) {
          if (item == "time" && this.isEmpty(key[item]))
            storage["end_time"] = null;
          else if (item == "time")
            storage["end_time"] = key[item] + Math.round(new Date() / 1000);
          else storage[item] = key[item];
        }

      result = true;
      localStorage.setItem(namespace, JSON.stringify(storage));
    }

    return result;
  }

  /**
   * @name 判断缓存是否存在
   * @param {string} key
   * @return {object}
   */
  hasStorage(key) {
    let result = false;

    if (this.isEmpty(key)) console.warn("请给一个localStorage的key值");
    else if (localStorage.getItem(key) != null) result = true;

    return result;
  }

  /**
   * @name 清除指定缓存
   * @param {string} key
   * @return {object}
   */
  clearStorage(key) {
    let result = false;

    if (this.isEmpty(key)) console.warn("请给一个localStorage的key值");
    else {
      localStorage.removeItem(key);
      result = true;
    }

    return result;
  }

  /**
   * @name 设置cookie
   * @param {string} name
   * @param {string} value
   * @param {number} exdays 单位秒
   */
  setCookie(name, value, exdays = 3600) {
    let result = true;

    if (this.isEmpty(name)) result = "请设置 cookie 名称！";
    else {
      let time = new Date();

      time.setTime(time.getTime() + exdays * 1000);

      let expires = "expires=" + time.toUTCString();

      document.cookie = name + "=" + value + "; " + expires;
    }

    return result;
  }

  /**
   * @name 获取cookie
   * @param {string} name
   * @return {string} [result=null]
   */
  getCookie(name) {
    let result = null;
    if (this.isEmpty(name)) result = "请输入需要查询的 cookie 名称！";
    else if (document.cookie.length > 0) {
      let begin = document.cookie.indexOf(name + "=");

      if (begin !== -1) {
        // cookie值的初始位置
        begin += name.length + 1;
        // 结束位置
        let end = document.cookie.indexOf(";", begin);
        if (end === -1) {
          // 没有;则end为字符串结束位置
          end = document.cookie.length;
        }
        result = unescape(document.cookie.substring(begin, end));
      }
    }
    return result;
  }

  /**
   * @name 检查cookie是否存在
   * @param {string} name
   */
  hasCookie(name) {
    let result = false;
    if (this.isEmpty(name)) result = "请输入需要查询的 cookie 名称！";
    else if (document.cookie.length > 0) {
      let begin = document.cookie.indexOf(name + "=");
      if (begin !== -1) result = true;
    }
    return result;
  }

  /**
   * @name 清除cookie
   * @param {string} name
   */
  clearCookie(name) {
    let result = true;

    if (this.isEmpty(name)) result = "请输入需要删除的 cookie 名称！";
    else this.setCookie(name, "", -1);

    return result;
  }

  /**
   * @name 获取sessionStorage数据
   * @param {string} namespace [sessionStorage的key值]
   * @param {string} key [sessionStorage的value中JSON对象的key值]
   * @return {string}
   */
  getSession(namespace, key = true) {
    let result = false;
    let time = Math.round(new Date() / 1000);

    if (this.isEmpty(namespace)) console.warn("请输入需要查询的key!");
    else {
      let storage = sessionStorage.getItem(namespace);

      if (!this.isEmpty(storage)) {
        if (typeof key == "boolean" && key) {
          result = JSON.parse(storage);
          // 判断是否已过期
          if (
            result.hasOwnProperty("end_time") &&
            !this.isEmpty(result.end_time) &&
            result.end_time <= time
          )
            result = "expire";
        } else if (typeof key == "boolean") result = storage;
        else {
          storage = JSON.parse(storage);

          if (this.isEmpty(storage[key])) result = null;
          else {
            result = storage[key];
            // 判断是否已过期
            if (
              typeof result == "object" &&
              result.hasOwnProperty("end_time") &&
              !this.isEmpty(result.end_time) &&
              result.end_time <= time
            )
              result = "expire";
          }
        }
      }
    }

    return result;
  }

  /**
   * @name 设置sessionStorage数据
   * @param {string} namespace [sessionStorage的key值]
   * @param {string || object} key [sessionStorage的value中JSON对象的key值]
   * @param {string} value [sessionStorage的value中JSON对象的value值]
   * @return {boolean}
   */
  setSession(namespace, key, value) {
    // 返回结果
    let result = false;

    if (this.isEmpty(namespace)) console.warn("请输入需要存储的key名称！");
    else if (this.isEmpty(key)) console.warn("键值key不得为空！");
    else {
      let storage = sessionStorage.getItem(namespace);

      // 如果不存在，则新建
      if (!storage) storage = {};
      else storage = JSON.parse(storage);

      if (typeof key == "string") {
        // 如果不存在，则新建
        if (!storage[key]) storage[key] = {};

        if (typeof value == "object") {
          // 动态保存
          for (let item in value) {
            if (item == "time" && this.isEmpty(value[item]))
              storage[key]["end_time"] = null;
            else if (item == "time")
              storage[key]["end_time"] =
                value[item] + Math.round(new Date() / 1000);
            else storage[key][item] = value[item];
          }
        } else storage[key]["value"] = value;
      } else if (typeof key == "object")
        for (let item in key) {
          if (item == "time" && this.isEmpty(key[item]))
            storage["end_time"] = null;
          else if (item == "time")
            storage["end_time"] = key[item] + Math.round(new Date() / 1000);
          else storage[item] = key[item];
        }

      result = true;
      sessionStorage.setItem(namespace, JSON.stringify(storage));
    }

    return result;
  }

  /**
   * @name 判断缓存是否存在
   * @param {string} key
   * @return {object}
   */
  hasSession(key) {
    let result = false;

    if (this.isEmpty(key)) console.warn("请给一个sessionStorage的key值");
    else if (!this.isEmpty(sessionStorage.getItem(key))) result = true;

    return result;
  }

  /**
   * @name 清除指定缓存
   * @param {string} key
   * @return {object}
   */
  clearSession(key) {
    let result = false;

    if (this.isEmpty(key)) console.warn("请给一个sessionStorage的key值");
    else {
      sessionStorage.removeItem(key);
      result = true;
    }

    return result;
  }

  /**
   * @name 人性化时间
   * @param {number} timestamp 时间戳
   * @return {string} result
   */
  natureTime(timestamp) {
    const length = timestamp.toString().length;
    const date =
      length === 13 ? new Date(timestamp) : new Date(timestamp * 1000);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);

    if (diff < 60) {
      return "刚刚";
    } else if (diff < 3600) {
      return `${Math.floor(diff / 60)} 分钟前`;
    } else if (diff < 86400) {
      return `${Math.floor(diff / 3600)} 小时前`;
    } else if (diff < 604800) {
      return `${Math.floor(diff / 86400)} 天前`;
    } else {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`;
    }
  }

  /**
   * @name 时间戳转日期格式
   * @param {number} unixTime 时间戳
   */
  timeToDate(timestamp) {
    const length = timestamp.toString().length;
    const date =
      length === 13 ? new Date(timestamp) : new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")} ${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
  }
}

const Helper = new helper();

export default Helper;
