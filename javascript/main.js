// Start switch light mode and dark mode 
    let lm_dm_switcher= document.querySelector(".lm-dm-switcher");
    let mode ="light";
    let [lm_background,lm_text,lm_elements,lm_inputs,
        dm_background,dm_text,dm_elements,dm_inputs]=
        [getComputedStyle(document.documentElement).getPropertyValue("--lm-background"),
        getComputedStyle(document.documentElement).getPropertyValue("--lm-text"),
        getComputedStyle(document.documentElement).getPropertyValue("--lm-elements"),
        getComputedStyle(document.documentElement).getPropertyValue("--lm-inputs"),
        getComputedStyle(document.documentElement).getPropertyValue("--dm-background"),
        getComputedStyle(document.documentElement).getPropertyValue("--dm-text"),
        getComputedStyle(document.documentElement).getPropertyValue("--dm-elements"),
        getComputedStyle(document.documentElement).getPropertyValue("--dm-inputs")]
    lm_dm_switcher.addEventListener("click", function(){
        if(mode==="light"){
            lm_dm_switcher.querySelector("i").className="fa-regular fa-moon";
            lm_dm_switcher.querySelector("span").textContent="Light mode";

            document.documentElement.style.setProperty("--lm-background",dm_background)
            document.documentElement.style.setProperty("--lm-text",dm_text)
            document.documentElement.style.setProperty("--lm-elements",dm_elements)
            document.documentElement.style.setProperty("--lm-inputs",dm_inputs)
            mode="dark";
        }else{
            lm_dm_switcher.querySelector("i").className="fa-regular fa-lightbulb";
            lm_dm_switcher.querySelector("span").textContent="Dark mode";

            document.documentElement.style.setProperty("--lm-background",lm_background)
            document.documentElement.style.setProperty("--lm-text",lm_text)
            document.documentElement.style.setProperty("--lm-elements",lm_elements)
            document.documentElement.style.setProperty("--lm-inputs",lm_inputs)
            mode="light";
        }
    })
// End switch light mode and dark mode 
// Start showing countires's cartes

    /* this function will fetch APIS data and show every country data in a carte*/
    let dataApiFetched= false;
    let result;
    async function fetchingData(region){
        let result1;
        let thisIsRegionApi;
        /* if the user want the counties displayed filtered by region*/
        if(region){
            result1 = await fetch("https://restcountries.com/v3.1/region/"+region);
            thisIsRegionApi=true;
            dataApiFetched = true;

            let result = await result1.json(); // that's a new variable available just in that block and not affect the global variable result
            displayApiData(result,thisIsRegionApi);
        }else{
            result1 = await fetch("https://restcountries.com/v2/all");
            thisIsRegionApi=false;

            result = await result1.json(); // result referr to the global variable result
            displayApiData(result,thisIsRegionApi);
        }

    }
    fetchingData()
    /* the function start display counrties data in the screen */
    let once = false;
    console.log("t7t l once")
    function displayApiData(result,thisIsRegionApi){
        for(let i=0; i<result.length;i++){
            let template = document.querySelector("#carte");
            let templateContent = template.content.cloneNode(true);
            templateContent.querySelector(".carte__image").style.backgroundImage="url('"+result[i].flags.png+"')";
            thisIsRegionApi===false ?
            templateContent.querySelector(".carte__infos__title").textContent = result[i].name :
            templateContent.querySelector(".carte__infos__title").textContent = result[i].name.common;
            templateContent.querySelector(".population").textContent = result[i].population;
            templateContent.querySelector(".region").textContent = result[i].region;
            templateContent.querySelector(".capital").textContent = result[i].capital;
            
            templateContent.querySelector(".carte").id = "countryNumber"+i//            wa 39l 3liha add the event listener or the style before append the fragemnet to the body
            let countryId = templateContent.querySelector(".carte").id;
            let cartes = document.querySelector(".cartes");
            /* on click on a counrty's carte show the full data of that country */
            templateContent.querySelector(".carte").addEventListener("click",function(){
                showFullCountryData(result[i],thisIsRegionApi,countryId);
            })
            /* add the countries name to the datalist 'id="countries-name" options'*/
            if(once === false){
                console.log("once")
                let option = document.createElement("option");
                option.setAttribute("value",result[i].name);
                option.textContent= result[i].name;
                document.querySelector("#countries-name").append(option);
            }
            
            cartes.append(templateContent);
        }
        once=true;
    }
    let originalURL = document.URL;
    
    /* this function was called in "fetchingData" function */
    async function showFullCountryData(result,thisIsRegionApi,id){
        /* remove everything but the header*/
        let main = document.querySelector(".main");
        main.style.display="none";
        /* display the full data of the country clicked  under the header*/ 
        let template = document.querySelector("#FullcountryData")
        let templateContent = template.content.cloneNode(true);
        /* in this if statement we try to find the counrty that we are dealing with in the global api  
            "https://restcountries.com/v2/all",
            if thisIsRegionApi===true thats mean we are in this api : "https://restcountries.com/v3.1/region/..."
        */
        if(thisIsRegionApi){
            let r1 = await fetch("https://restcountries.com/v2/all");
            let r2 = await r1.json();
            let r3 = result.name.common;
            for(let i=0;i< r2.length;i++){
                if(r2[i].name == r3){
                    var r4 = r2[i];
                    break;
                }
            }
            result=r4;
        }
        console.log(result)
        templateContent.querySelector(".country-info-image").style.backgroundImage= "url('"+result.flags.png+"')";
        templateContent.querySelector(".counrty-info-data__title").textContent= result.name;
        templateContent.querySelector(".native-name1").textContent = result.nativeName;
        templateContent.querySelector(".population1").textContent = result.population;
        templateContent.querySelector(".region1").textContent = result.region;
        templateContent.querySelector(".sub-region1").textContent = result.subregion;
        templateContent.querySelector(".capital1").textContent = result.capital;
        templateContent.querySelector(".top-level-domain1").textContent = Names("topLevelDomain",""); 
        templateContent.querySelector(".currencies1").textContent = Names("currencies","name");
        templateContent.querySelector(".languages1").textContent = Names("languages","name");
        templateContent.querySelector(".border-countries1").textContent = Names("borders","");
        function Names(search,name){
            let resultNames=[];
            if(!result[search]) return ""
            for(let j=0; j<result[search].length; j++){
                let FinalResult = result[search];
                name !== "" ?  resultNames.push(result[search][j][name]) : resultNames.push(FinalResult[j]);
            } 
            return resultNames.join(",");
        }
        // Start eventListner onclick the ".back-button" button 
        templateContent.querySelector(".back-button").addEventListener("click",function(){
            document.querySelector(".main2").remove();
            document.querySelector(".main").style="block";
            window.history.replaceState({}, ""," ");
            location.replace(originalURL+"#"+id);
            window.scrollBy(0,-200);

            setTimeout(function(){
                window.history.replaceState({}, "", " ")
            },100)
        })
        // End everntListner onclick the ".back-button" button 
        document.querySelector(".header").after(templateContent)
    }
// End showing countries's cartes
// Start showing countries's cartes filtering by region 
    let filterSelection = document.querySelector(".region-filter");
    filterSelection.addEventListener("change",function(){
        let filterSelectionValue = filterSelection.value;
        let cartesChildes = [...document.querySelectorAll(".cartes > *")];
        cartesChildes.forEach(cartesChild => cartesChild.remove())
        if (filterSelectionValue === "all"){
            if(result){
                console.log("result is here")
                console.log(result)
                displayApiData(result,false);
            }else{
                console.log("result is not here")
                fetchingData();
            }
            return;
        }
        fetchingData(filterSelectionValue)
    })
// End showing countries's cartes fitlring by region 
// Start display the country searched by the user 
    let searchInput = document.querySelector(".searchInput")
    let form = document.querySelector(".form")
    form.addEventListener("submit",function(e){
        e.preventDefault();
        console.log("submit")
    })
    searchInput.addEventListener("change",function(){
        let inputValue = document.querySelector(".searchInput").value;
        let countryThatWeLookingFor;

        for(let i=0; i< result.length;i++){
            if(result[i].name === inputValue){
                countryThatWeLookingFor = [result[i]];
            }
        }

        let a = document.querySelectorAll(".cartes > *")
        a.forEach(aa =>{
            aa.remove();
        })
        displayApiData(countryThatWeLookingFor,false)
    })

// End display the country searched by the user 