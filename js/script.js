// document variables
let formSignin = document.querySelector(".formSignIn");
let formSignUp = document.querySelector(".formSignUp");
let btnSignUp = document.querySelector(".btnSignUp");
let backSignIn = document.querySelector(".btnBackSignIn");
let btnregister = document.querySelector(".btnRegister");
let checkUserName = document.querySelector(".usernameCheck");
let emailUser = document.querySelector("#emailUser");
let passwordUser = document.querySelector("#passwordUser");
let Username = document.querySelector("#Username");
let emailUserUp = document.querySelector("#emailUserUp");
let Password = document.querySelector("#Password");
let ConfirmPassword = document.querySelector("#ConfirmPassword");
let agree = document.querySelector("#agree");
let checkPassword = document.querySelector(".checkConfirmPassword");
let closeModal = document.querySelector(".modalStatusImg");
let modalStatus = document.querySelector(".containerModalStatus");
let statusText = document.querySelector(".status");
let checkEmail = document.querySelector(".emailCheck");
let itemTheme = document.querySelectorAll(".theme");
let changeTheme = document.querySelector(".btnChangeTheme")
let listTheme = document.querySelector(".listTheme")
// flag variables
let allmembers = null;
let isAgree = false;
let db = null;
let allowRegester = false;
let validUsername = true;
let validPassword = true;
let validEmail = true;
let openThemes = false


let themes = [["#2E2D29", "../img/1.webp", "1","#555555", "white", "Kinght 1"],
["#DC5D5D", "../img/2.webp", "2","#2F4858", "white", "Kinght 2"],
["#2F4858", "../img/3.webp", "3","#2F4858", "white", "fantasi"],
["#E4D54B", "../img/4.webp", "4","#575757", "white", "car"],
["#4286EC", "../img/5.webp", "5","#000000", "white", "truck"],
["#000000", "../img/6.webp", "6","#000000", "white", "worker"],
["#DC5D5D", "../img/7.webp", "7","#575757", "rgba(0, 0, 0, 0.1)", "sweets"],
["#000000", "../img/8.webp", "8","#000000", "white", "Clothing Store"],
["#428731", "../img/9.webp", "9","#428731", "white", "vegetables"],
["#49997C", "../img/10.webp", "10","#ffffff", "rgba(0, 0, 0, 0.4)", "travel"],
["#000000", "../img/11.webp", "11","#000000", "white", "travel the travel"],
["#000000", "../img/14.webp", "14","#000000", "white", "smart city"],
["#5FBAD7", "../img/17.webp", "17","#5FBAD7", "white", "fruit"],
["#316887", "../img/12.webp", "12","#316887", "white", "air plane"],
["#B11919", "../img/13.webp", "13","#ffffff", "rgba(0, 0, 0, 0.4)", "art of color"],
["#318484", "../img/15.webp", "15","#318484", "white", "metal art"],
["#D11417", "../img/16.webp", "16","#ffffff", "rgba(0, 0, 0, 0.4)", "tomato"],
["#000000", "../img/18.webp", "18","#000000", "white", "meat and fast food"],
]
            

let changePosisionBtnTheme = (openThemes) => {
    if (openThemes) {
        changeTheme.style.top = "-325px"
        changeTheme.style.left = "540px"
        listTheme.classList.remove("hidden")
        setTimeout(() => {
            listTheme.style.height = "650px"
        }, 2000);
    }else{
        listTheme.classList.add("hidden")
        changeTheme.style.left = "444px"
        if (formSignUp.classList.contains("hidden")) {
            changeTheme.style.top = "-215px"
            
        } else {
            changeTheme.style.top = "-286px"
        }
    }
}

changeTheme.addEventListener("click", () => {
    openThemes = !openThemes
    changePosisionBtnTheme(openThemes)
})


let findTheme = (themeId) =>{
    let theme = themes.find((theme) => {
        return theme[2] === themeId
    })
    return theme
}

let clickTheme = (target) => {
    let idTheme = target.getAttribute("data-id");
    let selectedTheme = findTheme(idTheme)
    document.documentElement.style.setProperty("--back-color-btn", selectedTheme[0])
    document.documentElement.style.setProperty("--background-container", `url(${selectedTheme[1]})`)
    document.documentElement.style.setProperty("--color-labels", selectedTheme[3])
    document.documentElement.style.setProperty("--back-color-form", selectedTheme[4])
    openThemes = !openThemes
    changePosisionBtnTheme(openThemes)
}
let getId = (item) => {
    item.addEventListener("click", (e) => {
        let target = e.target
        if (!e.target.classList.contains("theme")) {
            target = e.target.parentElement
        }
        clickTheme(target)
    })
}

itemTheme.forEach(element => {
    getId(element)
    let idTheme = element.getAttribute("data-id")
    let themeVlues = findTheme(idTheme)
    element.insertAdjacentHTML("afterbegin", `<img class="imgTheme" src="${themeVlues[1].slice(3)}" alt="">${themeVlues[5]}`)
    element.style.backgroundColor = themeVlues[0]
});

let showModel = (text, status) => {
    statusText.innerHTML = text
    modalStatus.style.top = "50px"
    modalStatus.style.color =  status === "erorr" ? "rgb(241, 5, 60)" : "rgb(88, 254, 11)"
    setTimeout(() => {
        modalStatus.style.top = "-50px"
    },4000)
}
// open db & create store
window.addEventListener("load", () => {
    let dbOpen = indexedDB.open("dbUsers", 20);
    dbOpen.onsuccess = (e) => {
        console.log("succses open db");
        db = e.target.result;
        setInterval(() => {
            allmembers = getAllUsers();
        }, 1000);
    };
    dbOpen.onerror = (e) => {
        console.log("erorr in open db\n",e);
    };
    dbOpen.onupgradeneeded = (e) => {
        console.log("upgraded db");
        db = e.target.result;
        setInterval(() => {
            allmembers = getAllUsers();
        }, 1000);
        if (!db.objectStoreNames.contains("users")) {
            db.createObjectStore("users",{keyPath : "userId"});
        };
    };
});

closeModal.addEventListener("click",()=>{
    modalStatus.style.top = "-50px"
    
})
// check for rigister
let checkRequer = () => {
    if ((validPassword==true && validUsername==true && isAgree==true && validEmail==true) && ( Username.value != "" && emailUserUp.value != "" && Password.value != "" && ConfirmPassword.value != "")) {
        btnregister.classList.remove("opacity");
        allowRegester = true;
    }else{
        btnregister.classList.add("opacity"); 
        allowRegester = false;
    };
};

// connect to db for trans action
let transDb = (store, mod) => {
    let transaction = db.transaction(store, mod);
    return transaction.objectStore(store);
};

// check input username
Username.addEventListener("keyup", () => {
    let allUserName = allmembers.result.map(item => item.username);
    if (allUserName.includes(Username.value)) {
        checkUserName.innerHTML= `username ${Username.value} Not available`;
        checkUserName.classList.remove("hidden");
        validUsername = false;
    }else{
        checkUserName.classList.add("hidden");
        validUsername = true;
    };
    checkRequer();
});

emailUserUp.addEventListener("keyup", () => {
    let allEmail = allmembers.result.map(item => item.emailUser);
    if (allEmail.includes(emailUserUp.value)) {
        checkEmail.innerHTML= `email ${emailUserUp.value} Already used`;
        checkEmail.classList.remove("hidden");
        validEmail = false;
    }else{
        checkEmail.classList.add("hidden");
        validEmail = true;
    }
});
// check box action
agree.addEventListener("change", ()=>{
    isAgree = !isAgree ;   
    checkRequer();
});

// check for is password equai to confirm passwod  
let checkPasswordup = () => {
    if (ConfirmPassword.value != Password.value) {
        checkPassword.classList.remove("hidden");
        validPassword = false;
    }else{
        checkPassword.classList.add('hidden');
        validPassword = true;
    };
    checkRequer();
};

ConfirmPassword.addEventListener("keyup", checkPasswordup);
Password.addEventListener("keyup", checkPasswordup);

// submit in sign up
formSignUp.addEventListener("submit",(e)=> {
    e.preventDefault();
    if (allowRegester) {
        let newUser = {
            username : Username.value,
            emailUser : emailUserUp.value,
            Password : Password.value,
            ConfirmPassword : ConfirmPassword.value,
            userId : Math.floor(Math.random() * 999999)
        };
        let transactiondb = transDb("users", "readwrite");
        transactiondb.add(newUser);
        setInterval(() => {
            allmembers = getAllUsers();
        }, 1000);
        Username.value = "";
        Password.value = "";
        ConfirmPassword.value = "";
        emailUserUp.value = "";
        agree.checked = false;
        isAgree = false;
        checkRequer();
        changeTheme.classList.add("hidden")
        backTo(formSignUp, formSignin);
        changeTheme.style.top = "-215px"
        setTimeout(() => {
            changeTheme.classList.remove("hidden")
        }, 2500);
        showModel("Account created successfully", "ok")
    };
});

// submit for sign in 
formSignin.addEventListener("submit",(e)=> {
    e.preventDefault();
    if (emailUser.value != "" && passwordUser != "") {
        let allEmailUsers = allmembers.result.map(item => [item.emailUser, item.Password]);
        let findItem = allEmailUsers.find((item) => {
            return item[0] == emailUser.value;
        });
        if (findItem && findItem[1] == passwordUser.value) {
            showModel("Login successfully", "ok")
        }else{
            showModel("Login failed", "erorr")
        };   
    };
});


let getAllUsers = () => {
    let allUsers = transDb("users", "readwrite");
    allUsers = allUsers.getAll();
    return allUsers;
};

let backTo = (input, output) => {
    output.style.transform = "rotate3D(0,1,0,-90deg)";
    input.style.transform = "rotate3D(0,1,0,90deg)";
    setTimeout(() => {
        input.classList.add("hidden");
        output.classList.remove("hidden");
        setTimeout(() => {
            output.style.transform = "rotate3D(0,1,0, 0deg)";
        },100);
    }, 1500);
};

btnSignUp.addEventListener("click", (e) => {
    e.preventDefault();
    changeTheme.classList.add("hidden")
    changeTheme.style.top = "-286px"
    backTo(formSignin, formSignUp);
    setTimeout(() => {
        changeTheme.classList.remove("hidden")
    }, 2500);
});

backSignIn.addEventListener("click", (e) => {
    e.preventDefault();
    changeTheme.classList.add("hidden")
    backTo(formSignUp, formSignin);
    changeTheme.style.top = "-215px"
    setTimeout(() => {
        changeTheme.classList.remove("hidden")
    }, 2500);
});

