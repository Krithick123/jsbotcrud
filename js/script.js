function addData() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const image = document.getElementById("image").value;

    if(!name && !email && !image){
        alert("please enter all fileds");
        return;
    } 
    let data = JSON.parse(localStorage.getItem("crudData")) || [];
    let newData = { name, email, image };
    data.push(newData);

    localStorage.setItem("crudData", JSON.stringify(data));
    displayData();
    console.log(data);
    reset();
}

function displayData() {
    const container = document.getElementById("dataContainer");
    container.innerHTML = '';
    let data = JSON.parse(localStorage.getItem("crudData")) || [];
    data.forEach((value, index) => {
        const card = document.createElement('div');
        card.classList.add('col-md-4', 'mb-3');
        card.innerHTML = `
        <div class="card" style="width: 18rem;">
        <img src="${value.image}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${value.name}</h5>
        <h5 class="card-title">${value.email}</h5>
        <button type="button" class="btn btn-success" onclick="editData(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
        <button type="button" class="btn btn-danger" onclick="deleteData(${index})"><i class="fa-solid fa-trash"></i></button>
        </div>
    </div>
        `
        container.appendChild(card);
    });
}
function editData(index) {
    let data = JSON.parse(localStorage.getItem("crudData")) || [];
    let item = data[index];

    document.getElementById("name").value = item.name;
    document.getElementById("email").value = item.email;
    document.getElementById("image").value = item.image;
    
    const submitButton = document.querySelector("#frm button");
    submitButton.textContent = "Update";
    submitButton.onclick = function () {
        updateData(index);
    };
}
function updateData(index){
    let data = JSON.parse(localStorage.getItem("crudData")) || [];
    let item = data[index];

    // Update the fields in the item with the new values from the form
    item.name = document.getElementById("name").value;
    item.email = document.getElementById("email").value;
    item.image = document.getElementById("image").value;

    // Update the array in localStorage
    localStorage.setItem('crudData', JSON.stringify(data));
    reset();
    displayData();
}
function reset(){
    document.getElementById("name").value = '';
    document.getElementById("email").value = '';
    document.getElementById("image").value = '';
    const submitButton = document.querySelector("#frm button");
    submitButton.textContent = "Submit";
    submitButton.onclick = addData;
}
function deleteData(index) {
    alert("Are you  sure want to Delete this ")
    let data = JSON.parse(localStorage.getItem("crudData")) || [];
    data.splice(index, 1);

    localStorage.setItem('crudData', JSON.stringify(data));
    displayData();
}
displayData();