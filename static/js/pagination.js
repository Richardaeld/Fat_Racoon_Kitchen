// ---- Pagination
// Creates Pagination's frame
var findFeature = document.querySelectorAll(".recipe-lists");
findFeature.forEach(selectFeature);
function selectFeature(pagination){
    let liLength = pagination.getElementsByTagName("li").length;
    // Reveals column items that dont need pagination
    if(liLength < 5 && liLength >= 1){
        for(let nonPag = 0; nonPag < liLength; nonPag++ ){
            pagination.getElementsByTagName("li")[nonPag].classList.remove("make-invis");
        }
    // Reveals column items that need pagination
    }else if(liLength > 5) {
        for(let usePag = 0; usePag < 5; usePag++ ){
            pagination.getElementsByTagName("li")[usePag].classList.remove("make-invis");
        }

        // Creates DOM frame for pagination
        let createUl = document.createElement("ul");
        createUl.className = "row no-gutters justify-content-center list-group list-group-horizontal recipe-lists-no-padding pagination-ul";
        for (let pagNumFrame = 0; pagNumFrame < liLength/5; pagNumFrame++){
            // Creates start ellipses
            if (pagNumFrame == 0){
                let createLi = document.createElement("li");
                createLi.className = "col list-group-item pagination-content first-ellipses make-invis";
                createLi.textContent = "...";
                createUl.appendChild(createLi);
            }

            // Creates number content of pagination
            let createLi = document.createElement("li");
            createLi.className = "col list-group-item pagination-content pagination-number";
            createLi.textContent = pagNumFrame + 1;
            createUl.appendChild(createLi);

            // Creates end ellipses
            if (pagNumFrame == Math.floor(liLength/5) ){
                let createLi = document.createElement("li");
                createLi.className = "col list-group-item pagination-content last-ellipses make-invis";
                createLi.textContent = "...";
                createUl.appendChild(createLi);
            }
        }

        // Sets inline height to stop collapsing on last pagination number
        pagination.style.height = pagination.offsetHeight + "px";

        // Inserts UL to DOM with all appropiate LI
        pagination.insertAdjacentElement('afterend', createUl);

        // Finds all points where a pagination li was created
        var findPagination = pagination.parentElement.querySelectorAll(".pagination-number");
        
        // Sets max amount of pagination visible at start
        if(findPagination.length > 3){
            for(let paginationMax = 3; paginationMax < findPagination.length; paginationMax++){
                pagination.parentElement.getElementsByClassName("pagination-number")[paginationMax].classList.add("make-invis");
            }
            pagination.parentElement.getElementsByClassName("last-ellipses")[0].classList.remove("make-invis");
        } 
        
        // Creates Pagination functionality
        findPagination.forEach(selectPagination);
        function selectPagination(paginationNumber){
            paginationNumber.addEventListener("click", function () {
                // Find pagination number position
                let paginationPosition = 5 * (parseInt(paginationNumber.textContent)- 1);
                let paginationLi = pagination.getElementsByTagName("li");
                // Hides all items that are invisible
                for(let allInvis = 0; allInvis < liLength; allInvis++ ){
                    paginationLi[allInvis].classList.add("make-invis");
                }

                // Reveals only items needed
                for(let removeInvis = 0; removeInvis < 5; removeInvis++ ){
                    if(paginationLi[removeInvis + paginationPosition]){
                        paginationLi[removeInvis + paginationPosition].classList.remove("make-invis");
                    } 
                }

                var paginationTotal = paginationNumber.parentElement.getElementsByClassName("pagination-number").length;
                let pagNumLoc = paginationNumber.parentElement.getElementsByClassName("pagination-number");
                //reveals all pagination if invisible and removes selected pagination class
                for(let revealPagNum = 0; revealPagNum < paginationTotal; revealPagNum++){
                    pagNumLoc[revealPagNum].classList.remove("make-invis");
                    pagNumLoc[revealPagNum].classList.remove("pagination-selected");
                }

                // Adds seleceted class to clicked pagination number
                paginationNumber.classList.add("pagination-selected");
                let firstEllipLoc = paginationNumber.parentElement.getElementsByClassName("first-ellipses")[0];
                let lastEllipLoc = paginationNumber.parentElement.getElementsByClassName("last-ellipses")[0];
                //hides unused pagination and reveals appropiate ellipses
                for(let invisPagNum = 0; invisPagNum < paginationTotal; invisPagNum++){

                    // Removes pagination 2 greater than clicked pagination and adds ellipses
                    if(parseInt(paginationNumber.textContent) +1 < parseInt(pagNumLoc[invisPagNum].textContent) ){
                        pagNumLoc[invisPagNum].classList.add("make-invis");
                        lastEllipLoc.classList.remove("make-invis");
                    }
                    
                    // Removes pagination 2 lesser than clicked pagination and adds ellipses
                    if(parseInt(paginationNumber.textContent) -1 > parseInt(pagNumLoc[invisPagNum].textContent) ){
                        pagNumLoc[invisPagNum].classList.add("make-invis");
                        firstEllipLoc.classList.remove("make-invis");
                    }
                }

                // Checks for start/end ellipses to be removed
                if(pagNumLoc[0].classList.contains('make-invis') != true){
                    firstEllipLoc.classList.add("make-invis");
                } else if(pagNumLoc[parseInt(paginationTotal)-1].classList.contains('make-invis') != true){
                    lastEllipLoc.classList.add("make-invis");
                }
            });     
        }
    }
}
