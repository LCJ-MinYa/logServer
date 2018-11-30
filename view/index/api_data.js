define({ "api": [
  {
    "type": "post",
    "url": "/login",
    "title": "用户登录",
    "description": "<p>根据用户信息（email, password）登录恣意游</p>",
    "group": "loginGroup",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>用户邮箱地址</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>用户密码</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "timestamp",
            "description": "<p>请求时间戳</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>请求验证token</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "uid",
            "description": "<p>用户uid</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "请求参数格式:",
          "content": "{\n    \"email\": \"ceshi@ziyiu.com\",\n    \"password\": \"123456\",\n    \"timestamp\": 1543578242441,\n    \"accessToken\": 'e2b06cd',\n    \"uid\": ''\n}",
          "type": "string"
        }
      ]
    },
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "正确返回值:",
          "content": "{\n    \"data\": {\n        \"uid\": \"5c097013-3d8a-482f-8131-50a833983175\",\n        \"userName\": \"123\",\n    },\n    \"errno\": 0,\n    \"errmsg\": \"登录成功\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "错误返回值:",
          "content": "{\n\t\"errno\": 401,\n\t\"errmsg\": \"用户名或密码错误!\"\n}",
          "type": "json"
        },
        {
          "title": "非法请求401",
          "content": "{\n    \"errno\": 401,\n    \"errmsg\": \"瞎请求干啥，心疼我的服务器!\"\n}",
          "type": "json"
        },
        {
          "title": "不支持GET请求",
          "content": "{\n    \"errno\": 403,\n    \"errmsg\": \"请求不支持GET方法！\"\n}",
          "type": "json"
        },
        {
          "title": "不支持POST请求",
          "content": "{\n    \"errno\": 403,\n    \"errmsg\": \"请求不支持POST方法！\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controller/life/login.js",
    "groupTitle": "用户信息",
    "name": "PostLogin",
    "sampleRequest": [
      {
        "url": "https://api.ziyiu.com/life/login"
      }
    ]
  },
  {
    "type": "post",
    "url": "/password/passwordList",
    "title": "获取密码存储列表",
    "description": "<p>根据密码类型（type）获取密码存储列表</p>",
    "group": "passwordGroup",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>密码类型</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "timestamp",
            "description": "<p>请求时间戳</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>请求验证token</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "uid",
            "description": "<p>用户uid</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "请求参数格式:",
          "content": "{\n    \"type\": \"social\",\n    \"timestamp\": 1543578242441,\n    \"accessToken\": 'e2b06cd',\n    \"uid\": 'user-uid'\n}",
          "type": "string"
        }
      ]
    },
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "正确返回值:",
          "content": "{\n    \"data\": [{\n        \"_id\": \"_id\",\n        \"userName\": \"userName\", //用户名\n        \"importance\": \"importance\", //重要性\n        \"notes\": \"notes\", //备注\n        \"password\": \"password\", //密码\n        \"timestamp\": \"timestamp\", //创建时间\n        \"title\": \"title\", //标题\n        \"type\": \"type\", //密码类型\n        \"uid\": \"uid\", //用户uid\n        \"url\": \"url\", //密码所属网站\n    }],\n    \"errno\": 0,\n    \"errmsg\": \"获取密码列表成功\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controller/life/password/passwordList.js",
    "groupTitle": "密码存储",
    "name": "PostPasswordPasswordlist",
    "sampleRequest": [
      {
        "url": "https://api.ziyiu.com/life/password/passwordList"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "无用户信息",
          "content": "{\n    \"errno\": 203,\n    \"errmsg\": \"未获取到用户信息，请重新登陆!\"\n}",
          "type": "json"
        },
        {
          "title": "非法请求401",
          "content": "{\n    \"errno\": 401,\n    \"errmsg\": \"瞎请求干啥，心疼我的服务器!\"\n}",
          "type": "json"
        },
        {
          "title": "不支持GET请求",
          "content": "{\n    \"errno\": 403,\n    \"errmsg\": \"请求不支持GET方法！\"\n}",
          "type": "json"
        },
        {
          "title": "不支持POST请求",
          "content": "{\n    \"errno\": 403,\n    \"errmsg\": \"请求不支持POST方法！\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/search/searchSuggestion",
    "title": "导航关键字搜索",
    "description": "<p>根据用户输入的关键字（wd）返回百度结果</p>",
    "group": "searchGroup",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "wd",
            "description": "<p>用户输入的关键字</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "timestamp",
            "description": "<p>请求时间戳</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>请求验证token</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "uid",
            "description": "<p>用户uid</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "请求参数格式:",
          "content": "{\n    \"wd\": \"a\",\n    \"timestamp\": 1543578242441,\n    \"accessToken\": 'e2b06cd',\n    \"uid\": ''\n}",
          "type": "string"
        }
      ]
    },
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "正确返回值:",
          "content": "{\n    \"data\": [{\n        \"value\": \"爱奇艺\"\n    },{\n        \"value\": \"adidas字体\"\n    },{\n        \"value\": \"阿里云\"\n    },{\n        \"value\": \"阿里巴巴\"\n    },{\n        \"value\": \"安居客\"\n    },{\n        \"value\": \"artifact\"\n    }...],\n    \"errno\": 0,\n    \"errmsg\": \"获取搜索建议文本成功\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controller/life/search/searchSuggestion.js",
    "groupTitle": "搜索",
    "name": "GetSearchSearchsuggestion",
    "sampleRequest": [
      {
        "url": "https://api.ziyiu.com/life/search/searchSuggestion"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "非法请求401",
          "content": "{\n    \"errno\": 401,\n    \"errmsg\": \"瞎请求干啥，心疼我的服务器!\"\n}",
          "type": "json"
        },
        {
          "title": "不支持GET请求",
          "content": "{\n    \"errno\": 403,\n    \"errmsg\": \"请求不支持GET方法！\"\n}",
          "type": "json"
        },
        {
          "title": "不支持POST请求",
          "content": "{\n    \"errno\": 403,\n    \"errmsg\": \"请求不支持POST方法！\"\n}",
          "type": "json"
        }
      ]
    }
  }
] });
