window.cathy={
    create(string){
        const container = document.createElement("template");
        //用template来做一个容器来容纳各种标签
        container.innerHTML = string.trim();//去除开头空格
        return container.content.firstChild;
        //返回容器的内容的第一个孩子
    },
    after(node,node2){//把node2插入到node的后面
        node.parentNode.insertBefore(node2,node.nextSibling)//node2插入到node的下一个兄弟的前面
    },
    before(node,node2){//把node2插入到node的前面
        node.parentNode.insertBefore(node2,node)//x插入到y的前面
    },
    append(parent,node){
        parent.appendChild(node)
    },
    wrap(node,parent){
        cathy.before(node,parent)//爸爸先作为哥哥来到儿子前面,是我写的，所以要加cathy
        cathy.append(parent,node)//然后爸爸再把弟弟收为儿子😂,是我写的，所以要加cathy
    },
    //=================以上为增====================
    remove(node){
        node.parentNode.removeChild(node)//删除爸爸节点中的这个孩子节点
        return node//返回的话外面就还可以保留对这个节点的引用
    },
    empty(node){
        const array = []
        let x =node.firstChild
        while(x){//只要还有孩子，就继续
            array.push(cathy.remove(x))//用刚刚写的remove删除第一个孩子，push进array里备份
            x = node.firstChild//之前的第二个孩子晋级成了第一个孩子，把它赋给x，继续搞它
        }
        return array
    },
    //=================以上为删====================
    attr(node,name,value){
        if(arguments.length === 3){//看来这人想要改写
            node.setAttribute(name,value)
        }else if(arguments.length === 2){//看来这人只是想要读取
            // else if用来写设想的第二种情况！！！
            return node.getAttribute(name)// 因为是读取，返回值就好
        }
    },
    text(node,string){
        if(arguments.length === 2){
            if('innerText' in node){//IE
                node.innerText = string
            }else{// 考虑不同浏览器的说法不同，这叫适配！
                node.textContent = string //firefox/chrome
            }
        }else if(arguments.length === 1){
            return node.innerText || node.textContent
        }
    },
    html(node,string){
        if(arguments.length ===2){
            node.innerHTML = string
        }else if(arguments.length ===1){
            return node.innerHTML
        }
    },
    style(node,name,value){
        if(arguments.length===3){ // 可以想象dom.style(div, 'color', 'red')以判断用户想要改颜色
            node.style[name] = value
        }else if(arguments.length ===2){
            if(typeof name ==='string'){// 可以想象dom.style(div, 'color')，判断用户想要读取color的内容
            return node.style[name]
            }else if(name instanceof Object){//如果name是Object的格式展现出来， dom.style(div, {color: 'red'})，也可以知道用户想要改颜色
                const object = name
                for(let k in object){//相当于把'color'之类的key赋值给了k k= 'color' 然后搜寻此object里的key
                    // console.log(k)
                    // console.log(object[k])
                    node.style[k] =object[k]//style[key]要用[]扩起来!!如果直接用style.k === style[`k`] 然后用object[k]取到value
                }
            }
        }
},
    class:{
        add(node, className){
            node.classList.add(className)
        },
        remove(node, className){
            node.classList.remove(className)

        },
        has(node, className){
            return node.classList.contains(className)

        }
    },
    on(node, eventName, fn){
        node.addEventListener(eventName, fn)
    },
    off(node,eventName,fn){
        node.removeEventListener(eventName,fn)
    },
    find(selector, scope){
        return (scope||document).querySelectorAll(selector)//这也是重载的思想！or的短路逻辑是前者如果为假，还会看后者，所以我们可以把设想的备用情况放在前面～有则执行，无也无妨。
    },
    siblings(node){
        return Array.from(node.parentNode.children).filter(item => item!==node)
    },//children本身是一个伪数组！需要转化成数组!然后要注意filter的用法
    parent(node){
        return node.parentNode
    },
    children(node){
        return node.children
    },
    next(node){
        let x = node.nextSibling
        while (x && x.nodeType === 3){
            x = x.nextSibling
        }
        return  x
    },
    previous(node){
        let x = node.previousSibling
        while(x && x.nodeType ===3){
            x = x.previousSibling
        }
        return x
    },
    each(nodeList,fn){//必须得是nodelist，才可以获得长度，进行遍历
       for(let i=0;i<nodeList.length;i++){
           fn.call(null,nodeList[i])
       }
    },
    index(node){
        const list = cathy.children(node.parentNode) //伪数组
        let i
        for(i =0;i<list.length; i++){//但伪数组是有length和index的！！
                if(node === list[i]){
                    break
                }
        }
        return i+1//我觉得加1更加直观～
    }

}