let connection=require('./index')
module.exports=function(sql,params){
  return new Promise((resolve,reject)=>{
    connection.query(sql,params,(err,res)=>{
      if(err){
        reject({msg:'error',err})
      }
      else{
        resolve({msg:'sucess',res})
      }
    })
  })
}