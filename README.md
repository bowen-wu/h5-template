# umi project

## Getting Started

Install dependencies,

```bash
$ yarn
```

Start the dev server,

```bash
$ yarn start
```

## dva([Use umi with dva](https://v2.umijs.org/zh/guide/with-dva.html#%E4%BD%BF%E7%94%A8))

### model 注册
model 分两类，一是全局 model，二是页面 model。全局 model 存于 ` /src/models/ ` 目录，所有页面都可引用；页面 model 不能被其他页面所引用

- ` src/models/**/*.js ` 为 global model
- ` src/pages/**/models/**/*.js ` 为 page model

