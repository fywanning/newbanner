const Koa=require('koa')
const app=new Koa()
const homerouter=require('./router/index')
const static = require('koa-static')
const path = require('path')
const bodyparser = require('koa-bodyparser')

app.use(static(path.join(process.cwd(),'public')))
app.use(bodyparser())
app.use(homerouter.routes())

app.listen(8006,()=>{
  console.log('起服务成功')
})
