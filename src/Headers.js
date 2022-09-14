/**
 * Created by quanchen on 2022/9/13.
 */

export default class Headers {
  constructor(init) {
    console.log('Headers',init);
    this.data=null;
    if(init instanceof Array){
      this.data=init;
    }else if(init instanceof Headers){
      this.data=init.data;
    }else{
      this.data=[]
      for (const initKey in init)
      {
        this.data.push([initKey,init[initKey]])
      }
    }
  }

  append(name,value){
    this.data.push([name,value])
  }

  delete(name){
    if(this.has(name)){
      this.data=this.data.filter(value => value[0]!==name);
    }
  }

  get(name){
    const arr=[]
    this.data.forEach(value =>{
      if(value[0]===name) arr.push(value[1])
    })
    return arr.length?arr:null;
  }

  has(name){
    return this.data.find(value => value[0]===name)!==-1;
  }

  set(name,value){
    if(this.has(name)){
      // delete;
      this.delete(name);
    }
    this.data.push([name,value]);
  }

  forEach(){

  }
}
