
// Creates a functional Pagination
var findFeature = document.querySelectorAll(".recipe-lists");
findFeature.forEach(selectFeature);
function selectFeature(item, index){
    //console.log(item.getElementsByTagName("li")[0].getElementsByTagName("h"));
//    console.log(item.getElementsByTagName("h1")[0].textContent);  //  ---- finds section name
//    console.log(item.getElementsByTagName("li").length)  // ----- finds item count in section
    let liLength = item.getElementsByTagName("li").length
    // Reveals column items that dont need pagination
    if(liLength < 5 && liLength >= 1){
        for(let i = 0; i < liLength; i++ ){
            item.getElementsByTagName("li")[i].classList.remove("make-invis");
        }
    // Reveals items that need pagination
    }else if(liLength > 5) {
        for(let i = 0; i < 5; i++ ){
            item.getElementsByTagName("li")[i].classList.remove("make-invis");
        }
        // Creates frame for pagination
        let createUl = document.createElement("ul");
        createUl.className = "row no-gutters justify-content-center list-group list-group-horizontal recipe-lists-no-padding pagination-ul"
        for (let i = 0; i < liLength/5; i++){
            // Makes start ellipses
            if (i == 0){
                let createLi = document.createElement("li");
                createLi.className = "col list-group-item pagination-content first-ellipses make-invis"
                createLi.textContent = "..."
                createUl.appendChild(createLi)
            }

            // Makes content of pagination
            let createLi = document.createElement("li");
            createLi.className = "col list-group-item pagination-content pagination-number"
            createLi.textContent = i + 1
            createUl.appendChild(createLi)

            // Makes end ellipses
            console.log(Math.floor(liLength/5))
            if (i == Math.floor(liLength/5) ){
                let createLi = document.createElement("li");
                createLi.className = "col list-group-item pagination-content last-ellipses make-invis"
                createLi.textContent = "..."
                createUl.appendChild(createLi)
            }
        }
        // Adds UL to DOM with all appropiate LI
        item.insertAdjacentElement('afterend', createUl)

        // Makes Pagination functional
        var findPagination = item.parentElement.querySelectorAll(".pagination-number")
        findPagination.forEach(selectPagination);
        function selectPagination(itemP, indexP){
            itemP.addEventListener("click", function () {
                // Find pagination position
                paginationPosition = 5 * (parseInt(itemP.textContent)- 1)
                
                // Makes all items invisible 
                for(let i = 0; i < liLength; i++ ){
                    item.getElementsByTagName("li")[i].classList.add("make-invis");
                }

                // Reveals only items needed
                for(let i = 0; i < 5; i++ ){
                    if(item.getElementsByTagName("li")[i + paginationPosition]){
                        item.getElementsByTagName("li")[i + paginationPosition].classList.remove("make-invis");
                    } 
                }


                //console.log(itemP.parentElement.getElementsByClassName("pagination-number").length)
                var paginationTotal = itemP.parentElement.getElementsByClassName("pagination-number").length
                //reveals all pagination if invisible and removed selected class
                for(let i = 0; i < paginationTotal; i++){
                    let pagLoc = itemP.parentElement.getElementsByClassName("pagination-number")[i]
                    pagLoc.classList.remove("make-invis")
                    pagLoc.classList.remove("pagination-selected")
                }

                // Adds seleceted class to clicked pagination
                itemP.classList.add("pagination-selected")

                //hides extra pagination
                for(let i = 0; i < paginationTotal; i++){
                    let pagLoc = itemP.parentElement.getElementsByClassName("pagination-number")[i]                    

                    // Removes pagination 2 greater than clicked pagination
                    if(parseInt(itemP.textContent) +1 < parseInt(pagLoc.textContent) ){
                    //    console.log("math")
                    //    console.log(parseInt(itemP.textContent) +1)
                    //    console.log(parseInt(pagLoc.textContent))
                        pagLoc.classList.add("make-invis")
                        itemP.parentElement.getElementsByClassName("last-ellipses")[0].classList.remove("make-invis")
                    }
                    
                    // Removes pagination 2 lesser than clicked pagination
                    if(parseInt(itemP.textContent) -1 > parseInt(pagLoc.textContent) ){
                    //    console.log("math")
                    //    console.log(parseInt(itemP.textContent) +1)
                    //    console.log(parseInt(pagLoc.textContent))
                        pagLoc.classList.add("make-invis")
                        itemP.parentElement.getElementsByClassName("first-ellipses")[0].classList.remove("make-invis")
                    }

                }

                // Checks for ellipses to be removed
                if(itemP.parentElement.getElementsByClassName("pagination-number")[0].classList.contains('make-invis') != true){
                    itemP.parentElement.getElementsByClassName("first-ellipses")[0].classList.add("make-invis")
                }

                console.log(paginationTotal)
                if(itemP.parentElement.getElementsByClassName("pagination-number")[parseInt(paginationTotal)-1].classList.contains('make-invis') != true){
                    itemP.parentElement.getElementsByClassName("last-ellipses")[0].classList.add("make-invis")
                }

            })
        }

    }

}

