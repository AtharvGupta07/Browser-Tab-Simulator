const addBtn = document.querySelector(".Add-Btn");
const content = document.querySelector(".searchResult");
const tabContainer = document.querySelector(".AddTab");
const main = document.querySelector(".main");

function genricContent(){
    let genricResultInput = document.createElement("input");
    let genricResultBtn = document.createElement("button");
    genricResultInput.classList.add("genricResult_input");
    genricResultBtn.classList.add("genricResult-btn");
    genricResultInput.type = "text";
    genricResultInput.placeholder = "E.g., Leetcode";
    genricResultBtn.textContent = "Search";

    let genricDiv = document.createElement("div");
    genricDiv.classList.add("genricResult")
    genricDiv.appendChild(genricResultInput);
    genricDiv.appendChild(genricResultBtn);
    content.appendChild(genricDiv);
}

const tabList = new Array();
let count = 1;

let defaultTab = {
    id: 0,
    name:  "New Tab", 
    active: true,
    pinned: false,
    content: ""
}
function defaultNature(){
    tabList.push(defaultTab);
    renderTab();
}
defaultNature();

addBtn.addEventListener("click",()=>{
    console.log("Add btn clicked")
    for(let i = 0; i < tabList.length; i++){
        tabList[i].active = false;
    }

    let tabDetail = {
        id: count,
        name:  "New Tab", 
        active: true,
        pinned: false,
        content: ""
    }
    tabList.push(tabDetail);
    count++;

    renderTab();
});

function renderTab(){
    console.log("Tab render start");
    tabContainer.innerHTML = "";
    
    for(let i = 0; i < tabList.length; i++){
        let name = document.createElement("span");
        let closeBtn = document.createElement("button");
        name.textContent = tabList[i].name;
        closeBtn.textContent = "x";
        closeBtn.addEventListener("click", (event)=>{
            event.stopPropagation();
            closeTab(tabList[i].id)
        });
        let container =  document.createElement("span");
        container.appendChild(name);
        container.appendChild(closeBtn);
        container.classList.add("dummyTab");
        tabContainer.appendChild(container);
        container.addEventListener("click",() => chngActive(tabList[i].id));
        if(tabList[i].active)
            container.classList.add("activeTab");
    }
    renderContent();
}

function closeTab(id){
    for(let i = 0; i < tabList.length; i++){
        if(tabList[i].id === id){
            if(tabList[i].active){
                if(i-1 >= 0){
                    tabList[i-1].active = true;
                }else if(i + 1 < tabList.length-1){
                    tabList[i+1].active = true;
                }else{

                    if(document.querySelector(".noTab")){
                        return;
                    }

                    let errPara = document.createElement("p");
                    errPara.innerHTML = "You need atleast one tab to keep this project running";

                    let closeErr = document.createElement("button");
                    closeErr.textContent = "x";

                    let preventErr = document.createElement("div");
                    preventErr.appendChild(errPara);
                    preventErr.appendChild(closeErr);
                    preventErr.classList.add("noTab");
                    
                    main.appendChild(preventErr);
                    let timer = setTimeout(()=>{
                        preventErr.remove();
                        defaultNature();
                    },2000);

                    closeErr.addEventListener("click", () => {
                        preventErr.remove();
                        clearTimeout(timer);
                        defaultNature();
                    });
                }
            }
            tabList.splice(i,1);
            renderTab();
            break;
        }
    }
}

function chngActive(id){
    for(let i = 0; i < tabList.length; i++){
        if(tabList[i].id === id){
            tabList[i].active = true;
        }else{
            tabList[i].active = false;
        }
    }
    renderTab();
}

function renderContent(){
    content.innerHTML = "";
    for(let i = 0; i < tabList.length; i++){
        if(tabList[i].active){
            if(tabList[i].content === ""){
                genricContent();
            }
        }
    }
}