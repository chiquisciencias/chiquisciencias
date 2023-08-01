window.onload = init
const HOST = "https://chiquisciencias.ecosolucionesweb.com"
let content, contentIndex;

function init() {
    const elementsViews = document.querySelectorAll("#changeView")
    content =  document.getElementById("content");
    contentIndex = content.innerHTML;
    elementsViews.forEach(el => {
        el.addEventListener('click', ()=>{
            const view = el.getAttribute("view");
            load(view);
        })
    })
    const formProfe = document.getElementById("formProfe");
    const formInfo = document.getElementById("formInfo");
    const formAcademia = document.getElementById("formAcademia");
    formProfe.addEventListener('submit', (e)=> submitFormProfe(e))
    formInfo.addEventListener('submit', (e)=> submitFormInfo(e))
    formAcademia.addEventListener('submit', (e)=> submitFormAcademia(e))
}

function load(name){
    if(name == "home") {
        content.innerHTML = contentIndex;
        const antLink = document.getElementById(location.hash.slice(1))
        if(antLink) document.head.removeChild(antLink)
        return;
    }
    
    fetch(`/${name}.html`)
    .then(res => res.text())
    .then(data => {
        content.innerHTML = data; 
    })
}

function getDataForm(form){
    const data = new FormData(form);
    const body = {};
    for(const [key, value] of data){
        body[key] = value;
    }
    return body;
}

function validarData(data){
    for(const val of Object.values(data)){
        if(!val || !val.trim()) return false;
    }
    return true;
}

function submitFormProfe(e){
    e.preventDefault();
    const form = e.target;
    const body = getDataForm(new FormData(form));

    if(!validarData(body))
        Swal.fire({icon:'error', text:'Todos los campos son obligatorios'})
    
    fetch(`${HOST}/chiquis/ayuda-profe`, { 
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        Swal.fire({icon:'success', text: "Se te contactará en unos minutos"})
    })
    .catch(err => Swal.fire({icon:'error', text: err.message}) )
    form.reset();
}

function submitFormInfo(e){
    e.preventDefault()
    const form = e.target;
    const body = getDataForm(new FormData(form));

    if(!validarData(body))
        Swal.fire({icon:'error', text:'Todos los campos son obligatorios'})
    
    fetch(`${HOST}/chiquis/info`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => { 
        Swal.fire({icon:'success', text: "Te enviaremos más información pronto"})
    })
    .catch(err => Swal.fire({icon:'error', text: err.message}) )
    form.reset();
}

function submitFormAcademia(e){
    e.preventDefault()
    const form = e.target;
    const body = getDataForm(new FormData(form));

    if(!validarData(body))
        Swal.fire({icon:'error', text:'Todos los campos son obligatorios'})

    fetch(`${HOST}/chiquis/academia`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        Swal.fire({icon:'success', text: "Se te contactará en unos minutos"})
    })
    .catch(err => Swal.fire({icon:'error', text: err.message}) )
    form.reset();
}
