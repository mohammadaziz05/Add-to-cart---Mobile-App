// javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL : "https://realtime-database-c908b-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")


const inputEl = document.getElementById("input-field")
const addBtn = document.getElementById("add-btn")
const shoppinglistEl = document.getElementById("shoppinglist-el")


onValue(shoppingListInDB , function (snapshot) {
    if(snapshot.exists()) {
            let itemsArray = Object.entries(snapshot.val())
            clearShoppingListEl()
            for (let i = 0; i < itemsArray.length; i++){
                let currentItem = itemsArray[i]               
                
                addToShoppinglistEl(currentItem)
            }
    }
    else {
        shoppinglistEl.innerHTML = "No items here... yet"
    }
    
})

function addToShoppinglistEl(item) {
    let itemID = item[0]
    let itemValue = item[1] 
    
    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    
    newEl.addEventListener("dblclick", function () {
        let exactLocationInDB = ref(database , `shoppingList/${itemID}`)
        remove(exactLocationInDB)
    })
    shoppinglistEl.append(newEl)
}

addBtn.addEventListener("click", () => {
    let inputValue = inputEl.value
    if (inputValue != ""){
        push(shoppingListInDB, inputValue)
        clearInputFieldEl()
    } 
    
     
})

function clearShoppingListEl () {
    shoppinglistEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputEl.value = ''
} 


