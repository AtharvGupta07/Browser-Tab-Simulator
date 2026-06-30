const addBtn = document.querySelector(".Add-Btn");
const content = document.querySelector(".searchResult");
const tabContainer = document.querySelector(".AddTab");
const main = document.querySelector(".main");

const websiteDatabase = [
    {
        id: 1,
        keyword: "leetcode",
        title: "LeetCode",
        url: "https://leetcode.com",
        description: "A platform to practice Data Structures & Algorithms and participate in coding contests.",
        logo: "🟢",
        theme: "#FFA116",
        features: [
            "3000+ Coding Problems",
            "Weekly & Biweekly Contests",
            "Company Interview Questions",
            "Global Rankings"
        ]
    },

    {
        id: 2,
        keyword: "codeforces",
        title: "Codeforces",
        url: "https://codeforces.com",
        description: "Competitive programming platform with frequent contests and a global rating system.",
        logo: "🔵",
        theme: "#1F8ACB",
        features: [
            "Rated Contests",
            "Problem Archive",
            "Virtual Participation",
            "Global Leaderboard"
        ]
    },

    {
        id: 3,
        keyword: "github",
        title: "GitHub",
        url: "https://github.com",
        description: "Host repositories, collaborate with developers, and contribute to open source.",
        logo: "⚫",
        theme: "#24292F",
        features: [
            "Repositories",
            "Pull Requests",
            "Issues",
            "GitHub Actions"
        ]
    },

    {
        id: 4,
        keyword: "linkedin",
        title: "LinkedIn",
        url: "https://linkedin.com",
        description: "Professional networking platform for jobs, networking and personal branding.",
        logo: "💼",
        theme: "#0A66C2",
        features: [
            "Build Your Profile",
            "Job Search",
            "Connect with Professionals",
            "Share Posts"
        ]
    },

    {
        id: 5,
        keyword: "google",
        title: "Google",
        url: "https://google.com",
        description: "Search billions of webpages, images, videos and more.",
        logo: "🔍",
        theme: "#4285F4",
        features: [
            "Web Search",
            "Images",
            "Maps",
            "News"
        ]
    },

    {
        id: 6,
        keyword: "instagram",
        title: "Instagram",
        url: "https://instagram.com",
        description: "Share photos, reels and stories with friends and creators.",
        logo: "📷",
        theme: "#E1306C",
        features: [
            "Posts",
            "Stories",
            "Reels",
            "Direct Messages"
        ]
    },

    {
        id: 7,
        keyword: "youtube",
        title: "YouTube",
        url: "https://youtube.com",
        description: "Watch, upload and share videos from creators around the world.",
        logo: "▶️",
        theme: "#FF0000",
        features: [
            "Trending",
            "Subscriptions",
            "Playlists",
            "Live Streams"
        ]
    },

    {
        id: 8,
        keyword: "chatgpt",
        title: "ChatGPT",
        url: "https://chatgpt.com",
        description: "AI assistant that helps with coding, writing, learning and brainstorming.",
        logo: "🤖",
        theme: "#10A37F",
        features: [
            "Ask Questions",
            "Generate Code",
            "Summarize Text",
            "Brainstorm Ideas"
        ]
    },

    {
        id: 9,
        keyword: "reddit",
        title: "Reddit",
        url: "https://reddit.com",
        description: "Community-driven discussions covering almost every topic imaginable.",
        logo: "👽",
        theme: "#FF4500",
        features: [
            "Communities",
            "Upvotes",
            "Comments",
            "Trending Discussions"
        ]
    },

    {
        id: 10,
        keyword: "x",
        title: "X (Twitter)",
        url: "https://x.com",
        description: "Discover trending topics and share short-form posts with the world.",
        logo: "🐦",
        theme: "#000000",
        features: [
            "Trending Topics",
            "Posts",
            "Communities",
            "Bookmarks"
        ]
    }
];

function genericContent(i){
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

    genricResultInput.focus();

    genricResultInput.addEventListener("keydown",(event)=>{
        if(event.key == "Enter"){
            let str = genricResultInput.value;
            chngContent(str, i);
        }
    });


    genricResultBtn.addEventListener("click",()=>{
            let str = genricResultInput.value;
            chngContent(str, i)
        });
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
    tabList.length = 0;
    count = 1;
    tabList.push({...defaultTab});
    renderTab();
}
defaultNature();

addBtn.addEventListener("click",()=>{
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
        if(tabList[i].active){
            container.classList.add("activeTab");
            renderContent(i);
        }
    }
    
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
                    },5000);

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

function renderContent(index){
    content.innerHTML = "";
    for(let i = 0; i < tabList.length; i++){
        if(tabList[i].active){
            if(tabList[i].content === ""){
                genericContent(index);
            }else{
                let found = false;
                for(let i = 0; i < websiteDatabase.length; i++){
                    if(tabList[index].content === websiteDatabase[i].keyword){
                        renderDatabse(i);
                        found = true;
                        console.log(found);
                        
                        break;
                    }
                }
                if(!found){
                    console.log("Content not found");
                    let notFound = document.createElement("div");
                    notFound.innerHTML = "Database is limited to few searches.";
                    notFound.classList.add("finalResult");
                    notFound.style.backgroundColor = "grey";
                    content.appendChild(notFound);
                }
            }
        }
    }
}

function chngContent(str, index){
    if(str === "" || str.trimStart() === ""){
        let errPara = document.createElement("p");
        errPara.innerHTML = "You need to input valid value";

        let closeErr = document.createElement("button");
        closeErr.textContent = "x";

        let preventErr = document.createElement("div");
        preventErr.appendChild(errPara);
        preventErr.appendChild(closeErr);
        preventErr.classList.add("noTab");
        
        main.appendChild(preventErr);
        let timer = setTimeout(()=>{
            preventErr.remove();
        },5000);

        closeErr.addEventListener("click", () => {
            preventErr.remove();
            clearTimeout(timer);
        });
    }
    console.log("btn clicked");
    str = str.trim().toLowerCase();
    tabList[index].content = str;
    str = str[0].toUpperCase() + str.slice(1);
    tabList[index].name = str;
    console.log(tabList[index].name);
    
    renderTab();
}

function renderDatabse(i){
    let finalResult = document.createElement("div");
    finalResult.classList.add("finalResult");

    let resultHead = document.createElement("div");
    resultHead.classList.add("resultHead");

    let resultDescription = document.createElement("div");
    resultDescription.classList.add("result-description");

    let resultFeatures = document.createElement("div");
    resultFeatures.classList.add("result-features"); 
    
    let logo = document.createElement("div");
    logo.classList.add("logo");
    logo.innerHTML = websiteDatabase[i].logo;
    resultHead.appendChild(logo);

    let siteTitle = document.createElement("a");
    siteTitle.classList.add("Site-title");
    siteTitle.textContent = websiteDatabase[i].title;
    siteTitle.href = websiteDatabase[i].url;
    siteTitle.target = "_blank";
    resultHead.appendChild(siteTitle);

    resultDescription.textContent = websiteDatabase[i].description;

    let featureHeading = document.createElement("h4");
    featureHeading.textContent = "Features: ";

    let unorderedList = document.createElement("ul");
    for(let index = 0; index < websiteDatabase[i].features.length; index++){
        let listItem = document.createElement("li");
        listItem.textContent = websiteDatabase[i].features[index];
        unorderedList.appendChild(listItem);
    }

    resultFeatures.appendChild(featureHeading);
    resultFeatures.appendChild(unorderedList);


    finalResult.appendChild(resultHead);
    finalResult.appendChild(resultDescription);
    finalResult.appendChild(resultFeatures);
    content.appendChild(finalResult);
    finalResult.style.backgroundColor = websiteDatabase[i].theme;
}