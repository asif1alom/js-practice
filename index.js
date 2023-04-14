class RAndM{
    constructor(){
        this.currentPage = 1;
        this.returnedResult = "";
    }


    // get chars .
    async getChargs(){
        // fetch ... 
        const response = await fetch('https://rickandmortyapi.com/api/character'); 
        const chars = await response.json();

        if(chars){
            // store.. 
            this.returnedResult = chars;
        }
        console.log("chars", this.returnedResult);
        // construct ui.. and show ui
        let html = this.makeCharacterUI();
        document.querySelector(".charWrapper").insertAdjacentHTML("beforeend", html);
        // handle click.... 
        this.handleCardClicks();
    }

    getCurrentPageNumber(){
        return this.currentPage;
    }

    showModel(result){
        console.log(result);


        let text = `<div>
            <div class="mdl">
                <div class="mdl-content">
                    <img src="${result.image}" alt="" />
                    <div>
                        <h1>${result.name}</h1>  
                        <h3>${result.gender}</h3>  
                    </div>
                    
                            
                </div>
                <button class="closeBtn">X</button>  
                <div>
                    
                </div>
            
            </div>
        </div>`;

        console.log(text);
        document.querySelector("#model").innerHTML = "";
        document.querySelector("#model").insertAdjacentHTML("beforeend", text);

       
        document.querySelector(".closeBtn").addEventListener("click",()=>{
            document.querySelector("#model").innerHTML = "";
        })
    }

    async fetchApiByLink(url){
        // fetch ... 
        const response = await fetch(url); 
        const chars = await response.json();
        return chars;
    }

    handleCardClicks(){
        // this handle click..
        document.querySelectorAll(".eachCharCard").forEach((each)=>{
            each.addEventListener("click",(event)=>{
                console.log(event.target)
                let charid = event.target.closest(".eachCharCard").getAttribute("charid");
                console.log(charid)

                let filterdChar = this.returnedResult.results.filter((where)=> where.id == charid);
                console.log("char details", filterdChar);

                this.showModel(filterdChar[0]);
            })
        })

        // next button click ... 
        let next = document.getElementById('nextPage')
        next.addEventListener("click",async()=>{
            let nextLink = this.returnedResult.info.next;
            console.log("next", nextLink);
            let nextPageResult = await this.fetchApiByLink(nextLink);
            console.log("next page result", nextPageResult);
            this.returnedResult = nextPageResult;
            
            // construct ui.. and show ui
            let html = this.makeCharacterUI();
            document.querySelector(".charWrapper").innerHTML = "";
            document.querySelector(".charWrapper").insertAdjacentHTML("beforeend", html);
            // handle click.... 
            this.handleCardClicks();

        })
        
    }

    // this function makes chars ... 
    makeCharacterUI(){
        
        let text = "";
        
        this.returnedResult.results.forEach((each)=>{
            text += `<div class="eachCharCard" charId="${each.id}">
                <img src="${each.image}" alt="" />
                <div>${each.name}</div>
            </div>`
        })

        return text;
    }
}

// make the class obj.
const cartoon = new RAndM();

document.addEventListener("DOMContentLoaded",()=>{
    // first get chareter .. 
    cartoon.getChargs();

    console.log(cartoon.getCurrentPageNumber());
})