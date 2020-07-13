const firstDiv = cathy.create(`<div>我是第一个div</div>`);
//新建的节点如果不做其它操作是不会体现在网页上的
cathy.after(newSib,firstDiv)//这样子插入就体现在网页上来
//所以是可以直接用元素的ID名字test指代那个元素的
cathy.before(newSib,firstDiv)
const newSon = cathy.create(`<div>我是第一个div的儿子</div>`)
cathy.append(firstDiv,newSon)
const daddy = cathy.create(`<div>我是第一个div的daddy</div>`)
cathy.wrap(firstDiv,daddy)
//=================以上为增====================
// cathy.remove(remove)//成功删除～得瑟
// console.log(cathy.empty(empty))//因为有return，可以拿到被删除的数组
//=================以上为删====================
cathy.attr(attr,'style','color:red')//改变了（给它增加了）style属性～
// console.log(cathy.attr(attr,'style'))//读取到了它的style属性～
// cathy.text(text,`让我改写你试一试`)//火狐谷歌和IE都既可以读也可以写
// cathy.html(html,`<button>CLICK!</button>`)
// console.log(cathy.html(html))
cathy.style(style,{color:'red',background:'black'})
cathy.class.add(classTest,'screen1')//添加的className一定得是字符串啊！！
// cathy.class.remove(classTest,'screen1')
// console.log(cathy.class.has(classTest,'screen1'))
const fn = ()=>{
    alert('Thanks for clicking!')
}
cathy.on(eventTest, 'click', fn)
// cathy.off(eventTest,'click', fn)
//=================以上为改====================
const t = cathy.find('#find')
console.log(t)//.find也就是querySelectorAll(selector)找到的是包含div#find的NodeList,在页面上选择不到
console.log(Array.from(t))
// console.log(t[0])//加上下标[0]之后才是div#find，才在页面上选择得到
// console.log(t[0].children)//.children找到的是包含孩子的HTMLCollection
// console.log(t[0].children[0])

// console.log(cathy.parent(empty))
// console.log(cathy.children(empty))
// console.log(cathy.siblings(empty))
// console.log(cathy.next(empty))


// cathy.each(t,(n)=>cathy.style(n,'color','red'))//对t这个list里的内容进行遍历
// cathy.each(t[0],(n)=>cathy.style(n,'color','red')) ❌t[0]是一个div了，无法遍历呀
// cathy.each(t[0].children,(n)=>cathy.style(n,'color','red'))
// console.log(cathy.siblings(newSib))
// let n = newSib.parentNode.children
// console.log(Array.from(n))
// console.log(cathy.previous(newSib))
console.log(cathy.index(remove))
//=================以上为查====================

