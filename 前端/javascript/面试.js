/**
 * Created by heben on 2017/3/14.
 */
"use strict";

Array.prototype.reduce2=function(func){
    let len = this.length,i=1,a=this[0],b=this[1];
    while(i<len){
        a = func(a,b);
        b = this[++i];
    }
    return a;
};

console.log([1,2,3].reduce((a,b)=>(a*b)));
console.log([1,2,3].reduce2((a,b)=>(a-b)));

const arr=new Array();
console.log(arr instanceof Array);
console.log(arr instanceof Object);
console.log(arr.__proto__ === Array.prototype);
console.log(arr.__proto__ === Object.prototype);
console.log(arr.constructor === Array);
console.log(arr.constructor === Object);
console.log(arr.__proto__.constructor === Array);
console.log(arr.__proto__.constructor === Object);
console.log(arr.constructor === Array.prototype.constructor);
console.log(arr.constructor === Object.prototype.constructor);
console.log(Array.prototype.constructor === Array);

function A(){
    const obj = new Object();
    function F(){};
    F.prototype=obj;
    return new F();
}

console.log(A());
console.log(new A());

console.log([] == false);
console.log({} == false);
if([]) console.log("[] is true");
if({}) console.log("{} is true");


//克隆对象
const cloneObjFunc=function(obj){
    let cloneObj;
    if(obj instanceof Array) {
        cloneObj=[];
    }else{
        cloneObj={};
    }
    if(obj == null || typeof obj != "object") return obj;
    for(var p in obj){
        cloneObj[p] = cloneObjFunc(obj[p]);
    }
    return cloneObj;
};

const oldObj = {
    name:'heben',
    age:24,
    func:function(){
        console.log(this);
    },
    arr:[1,2,3,4]
};
const newObject = cloneObjFunc(oldObj);
console.log(newObject);

// new操作符具体干了什么呢?
//     1、创建一个空对象，并且 this 变量引用该对象，同时还继承了该函数的原型。
// 2、属性和方法被加入到 this 引用的对象中。
// 3、新创建的对象由 this 所引用，并且最后隐式的返回 this 。
// var obj  = {};
// obj.__proto__ = Base.prototype;
// Base.call(obj);

//实现一个函数，add(1)(2)=3,add(1,2,3)(10)=16,add(1)(2)(3)(4)(5)=15

const test1=function(){
    console.log(1);
};
console.log(test1);
test1.valueOf=function(){
    return 2;
};
console.log(test1);

function add(){
    const arr = Array.prototype.slice.call(arguments,0);
    let fn=function(){
        const arrf = Array.prototype.slice.call(arguments,0);
        return add.apply(null,arr.concat(arrf));
    };
    fn.valueOf=function(){
        console.log("调用了valueOf");
        return arr.reduce((a,b)=>(a+b));
    };
    return fn;
}
console.log(add(1)(2));
console.log(add(1,2,3)(10));
console.log(add(1)(2)(3));


