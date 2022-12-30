// Start switch between light mode and dark mode 
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
// End switch between light mode and dark mode 
// Start fetching data from the API 

// End fetching data from the API 
