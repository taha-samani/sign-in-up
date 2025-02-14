// document variables
let formSginin = document.querySelector(".formSignIn");
let formSginUp = document.querySelector(".formSginUp");
let btnSignUp = document.querySelector(".btnSginUp");
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

// flag variables
let isAgree = false;
let db = null;
let allmembers = null;
let allowRegester = false;
let validUsername = true;
let validPassword = true;
let validEmail = true;

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
        console.log(db);
        if (!db.objectStoreNames.contains("users")) {
            db.createObjectStore("users",{keyPath : "userId"});
        };
    };
});

closeModal.addEventListener("click",()=>{
    console.log("modal clicked");
    modalStatus.style.top = "-50px"
    
})
// check for rigister
let checkRequer = () => {
    if ((validPassword==true && validUsername==true && isAgree==true, validEmail==true) && ( Username.value != "" && emailUserUp.value != "" && Password.value != "" && ConfirmPassword.value != "")) {
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
formSginUp.addEventListener("submit",(e)=> {
    e.preventDefault();
    if (allowRegester) {
        console.log(e);
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
        backTo(formSginUp, formSginin);
        showModel("Account created successfully", "ok")
    };
});

// submit for sign in 
formSginin.addEventListener("submit",(e)=> {
    e.preventDefault();
    if (emailUser.value != "" && passwordUser != "") {
        console.log(allmembers.result);
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
    backTo(formSginin, formSginUp);
});

backSignIn.addEventListener("click", (e) => {
    e.preventDefault();
    backTo(formSginUp, formSginin);
});

