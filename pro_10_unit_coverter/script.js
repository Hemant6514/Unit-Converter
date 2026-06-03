const unitCards = document.querySelectorAll(".unit-card");
const unitName = document.querySelector("#unit-name");

const units = {

    lengthUnits: {

        Meter: 1,
        Kilometer: 1000,
        Centimeter: 0.01,
        Millimeter: 0.001,
        Foot: 0.3048,
        Inch: 0.0254

    },

    timeUnits: {

        Second: 1,
        Minute: 60,
        Hour: 3600,
        Day: 86400

    },

    weightUnits: {

        Milligram: 0.001,
        Gram: 1,
        Kilogram: 1000,
        Ton: 1000000

    },

    dataUnits: {

        Bit: 0.125,
        Byte: 1,
        Kilobyte: 1024,
        Megabyte: 1048576,
        Gigabyte: 1073741824

    },

    tempUnits: {
    Celsius: "C",
    Fahrenheit: "F",
    Kelvin: "K"
}

};

let currentUnit = ''

const fromMenu = document.querySelector('.from-menu')
const toMenu = document.querySelector('.to-menu')

unitCards.forEach( (card) => {
    
    card.addEventListener('click',  () => {
         unitCards.forEach((c) => {
            c.classList.remove('active');
        });

        card.classList.add('active');
        const btn = card.querySelector(".icon-btn");

        unitName.textContent =
        btn.value + " Conversion";

        currentUnit = card.dataset.unit
    
       
        const unitLists = Object.keys(units[currentUnit])

         fromMenu.innerHTML = "";
         toMenu.innerHTML = " ";

        unitLists.forEach( (unit)  => {

            fromMenu.innerHTML += `
                <li class="dropdown-item from-li"
                 data-value= "${unit}">
                           ${unit}
                </li>`

                
            toMenu.innerHTML += `
                <li class="dropdown-item to-li"
                 data-value= "${unit}">
                           ${unit}
                </li>`
           
        })
    })
})

let fromValue = "";
let toValue = "";

const dropButton = document.querySelectorAll('.dropdown-btn')

dropButton.forEach( (btn) => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('active')

        const menu =
        btn.nextElementSibling;

        menu.classList.toggle("active");
        
        menu.addEventListener('click', (e) => {
                if(e.target.classList.contains(
                    "from-li"
                )){
                    btn.textContent = e.target.dataset.value
                    fromValue = e.target.dataset.value
                   
                    menu.classList.remove("active");
                }

                if(e.target.classList.contains(
                    "to-li"
                )){
                    btn.textContent = e.target.dataset.value
                    toValue = e.target.dataset.value
                    
                    menu.classList.remove("active");
                }
            })
      
    })
})

const convertBtn = document.getElementById("convert-btn")

convertBtn.addEventListener('click',() => {

   
    const inputVal = document.getElementById("input-field").value

    
    const resultShow = document.getElementById("result")
     let result;

    
     if(currentUnit === "tempUnits"){
       
        result = convertTemperature(inputVal, fromValue,toValue)
     }
     else{
        result  = inputVal   * units[currentUnit][fromValue] / units[currentUnit][toValue]
     }

    resultShow.textContent = `${inputVal} ${fromValue} to ${result} ${toValue}`

})


function convertTemperature(value,from,to){
   if(from === to){
        return value;
    }

    // Celsius → Fahrenheit
    if(
        from === "Celsius" &&
        to === "Fahrenheit"
    ){
        return (value * 9/5) + 32;
    }

    // Fahrenheit → Celsius
    if(
        from === "Fahrenheit" &&
        to === "Celsius"
    ){
        return (value - 32) * 5/9;
    }

    // Celsius → Kelvin
    if(
        from === "Celsius" &&
        to === "Kelvin"
    ){
        return value + 273.15;
    }

    // Kelvin → Celsius
    if(
        from === "Kelvin" &&
        to === "Celsius"
    ){
        return value - 273.15;
    }

    // Fahrenheit → Kelvin
    if(
        from === "Fahrenheit" &&
        to === "Kelvin"
    ){
        return (value - 32) * 5/9 + 273.15;
    }

    // Kelvin → Fahrenheit
    if(
        from === "Kelvin" &&
        to === "Fahrenheit"
    ){
        return (value - 273.15) * 9/5 + 32;
    }

}