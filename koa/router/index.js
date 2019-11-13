const router = require('koa-router')();
const query = require('../db/query');

router.get('/api/list',async ctx=>{
  let data=await query('select * from tenlist');
  if(data.msg==='error'){
    ctx.body={
      code:0,
      msg:error
    }
  }
  else{
    ctx.body={
      code:1,
      data
    }
  }
})


router.post('/api/add',async ctx => {
  let {name,text,id} = ctx.request.body;
  if(name&& text&&id){ 
      let userData=await query('select * from tenlist where id=?',[id]);
      if(userData.data.length){
          ctx.body={
              code:3,
              msg:'此人已存在'
          }
      }else{
          try{
              await query('insert into tenlist (name,text) values (?,?)',[name,text])
              ctx.body={
                  code:1,
                  msg:'添加成功'
              }
          }catch(e){
              ctx.body={
                  code:0,
                  msg:e.error
              }
          }
      }
  }else{
      ctx.body={
          code:2,
          msg:'缺失参数'
      }
  }    
})

router.get('/api/del',async ctx => {
  let {id}=ctx.query;
  if(id||id=== 0){
      try{
          await query('delete from tenlist where id=?',[id]);
          ctx.body={
              code:1,
              msg:'删除成功'
          }
      }catch(e){
          ctx.body={
              code:0,
              msg:e.error
          }
      }
  }else{
      ctx.body={
          code:2,
          msg:'缺失参数'
      }
  }
})

router.post('/api/edit',async ctx => {
  let {name,text,id}=ctx.request.body;
  if(name&&text&&id){
      try{
          await query('update tenlist set name=?,text=? where id=?',[name,text,id])
          ctx.body={
              code:1,
              msg:'修改成功'
          }
      }catch(e){
          ctx.body={
              code:0,
              msg:e.error
          }
      }
  }else{
      ctx.body={
          code:2,
          mgs:'丢失参数'
      }
  }
})
module.exports=router