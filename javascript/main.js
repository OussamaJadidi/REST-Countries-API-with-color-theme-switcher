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
// Start showing counties data on page load
async function fetchingData(region){
    let result1;
    let regionArgument;
    if(region){
        result1 = await fetch("https://restcountries.com/v3.1/region/"+region);
        regionArgument=true;
    }else{
        result1 = await fetch("https://restcountries.com/v2/all");
        regionArgument=false;
    }
    let result = await result1.json();
    let resutlLength = result.length;
    for(let i=0; i<resutlLength;i++){
        let template = document.querySelector("#carte");
        let templateContent = template.content.cloneNode(true);
        templateContent.querySelector(".carte__image").style.backgroundImage="url('"+result[i].flags.png+"')";
        regionArgument===false ?
        templateContent.querySelector(".carte__infos__title").textContent = result[i].name :
        templateContent.querySelector(".carte__infos__title").textContent = result[i].name.common;
        templateContent.querySelector(".population").textContent = result[i].population;
        templateContent.querySelector(".region").textContent = result[i].region;
        templateContent.querySelector(".capital").textContent = result[i].capital;
        let cartes = document.querySelector(".cartes");
        
        templateContent.querySelector(".carte").addEventListener("click",function(){
            showFullCountryData();
        })
        console.log(result)
        cartes.append(templateContent);

    }
}
fetchingData()

function showFullCountryData(){
    let main = document.querySelector(".main");
    main.remove();

    // let template = document.querySelector("#FullcountryData")
    // let templateContent = template.content.cloneNode(true);

    // template.querySelector("country-info-image").style.backgroundImage="url('"+result[i].flags.png+"')";
    // template.querySelector("counrty-info-data__title").textContent= result[i].name;
    // template.querySelector("native-name1").textContent = result[i].nativeName;
    // template.querySelector("population1").textContent = result[i].population;
    // template.querySelector("region1").textContent = result[i].region;
    // template.querySelector("sub-region1").textContent = result[i].subregion;
    // template.querySelector("capital1").textContent = result[i].capital;
    // template.querySelector("top-level-domain1").textContent = Names("topLevelDomain")
    // template.querySelector("currencies1").textContent = names("currencies","name");
    // template.querySelector("languages1").textContent = Names("languages","name");
    function Names(search,name){
        let resultnames;
        for(let j=0; j< result[i].languages.length;j++){
            resultNames= names ? resultNames+","+result[i].search[j].name : resultNames+","+result[i].search[j]
        }
        return resultNames;
    }
    // template.querySelector("bordre-countries1").textContent = result[i].borders[i];
}
// End showing counties data on page load
// Start showing countries filtering by region 
let filterSelection = document.querySelector(".region-filter");
filterSelection.addEventListener("change",function(){
    let filterSelectionValue = filterSelection.value;
    let cartesChildes = [...document.querySelectorAll(".cartes > *")];
    cartesChildes.forEach(cartesChild => cartesChild.remove())
    fetchingData(filterSelectionValue)
})
// End showing countries fitlring by region 