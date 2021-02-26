window.onload = function () {
    views();
}

function LinkView(n) {
    let edit = n.parentNode.querySelector('.action');
    let id = edit.id;
    viewMessage(id);
    // console.log(id);
}

function LinkRemove(n) {
    let remove= n.parentNode.querySelector('.action');
    let id = remove.id;
    removeMessage(id);
    // console.log(id);
}

//function
//viewsMessages
function views() {
    // fetch realiza promesa
    fetch('http://localhost:3005',{method: 'GET'})
    .then(res => res.json())
    .then(data => {
        const messages = document.querySelector('#messages');
        let html = '';
        data.messages.forEach(message => {
            html += `
            <div class="card container my-3" >
                <div class="card-body-message">
                    <div class="perfil-message">
                        <h4 class="text-center my-3">${message.name}</h4>
                    </div>

                    <div class="card-body" >
                        <h5>${message.email}</h5>
                        <p>${message.description}</p>
                    </div>
                </div>
                <div class="mb-2">
                    <button type="submit" class="btn btn-info action" id="${message._id}" onclick="LinkView(this)">Edit</button>
                    <button type="submit" class="btn btn-danger action" id="${message._id}" onclick="LinkRemove(this)">Delete</button>
                </div>
            </div>
                    
                    `
        });
        messages.innerHTML = html;
        // console.log(data);
    })
}

//create
const create = document.querySelector('#btn-message');
const createMessage = function () {
    let id = document.querySelector('#idMessage');
    if(id.value) {
        updateMessage(id.value);
    }else {
        //quitar event submit
        event.preventDefault();
        //validar campos
        let name = document.querySelector('#name');
        let email = document.querySelector('#email');
        let description = document.querySelector('#description');
        //mandar solicitud POST
        fetch('http://localhost:3005/message/create',{
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                                    name: name.value,
                                    email: email.value,
                                    description: description.value
                                })
                })
        .then(res => res.json())
        .then(data => {
            const Msgs = document.querySelector('#viewMsgs');
            let html = '';
            //mostrar mensaje de error/exito
            if(name.value === '' || email.value === '' || description.value === '') {
                data.Msg.forEach( respon => {
                    html += `
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <p>${respon.text}</p>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    `
                    Msgs.innerHTML = html;
                    // console.log(respon.text);
                });
            }else {
                //limpiar Inputs
                name.value = '',email.value = '',description.value = '';
            }
            //actualizar lista
            views();
        })
        .catch(err=> console.log(err));
    }
}
create.addEventListener('click',createMessage);

//view
const viewMessage = function (id) {
    fetch('http://localhost:3005/message/' + id,{
        method: 'GET'
    })
    .then(res => res.json())
    .then(data => {
        const {name,email,description,_id} = data.message;
        document.querySelector('#name').value = name;
        document.querySelector('#email').value = email;
        document.querySelector('#description').value = description;
        // console.log(name);
        document.querySelector('#idMessage').value = _id;
    })
}

// editar
const updateMessage = function (id) {
    //quitar submit
    event.preventDefault();
    //VALIDAR CAMPOS
    let name = document.querySelector('#name');
    let description = document.querySelector('#description');
    //campos solo para limpliar los inputs
    let email = document.querySelector('#email');
    let idMessage = document.querySelector('#idMessage');
    //Mandar solicitud PUT
    fetch('http://localhost:3005/message/update/' + id,{
        method: 'PUT',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
                            name: name.value,
                            description: description.value
                        })
    })
    .then(res => res.json())
    .then(data => {
        const Msgs = document.querySelector('#viewMsgs');
        let html = '';
        //mostrar mensaje de error/exito
        if(name.value === '' || email.value === '' || description.value === '') {
            data.Msg.forEach( respon => {
                html += `
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <p>${respon.text}</p>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                `
                Msgs.innerHTML = html;
                // console.log(respon.text);
            });
        }else {
            //limpiar inputs
            name.value = '',email.value = '',description.value = '',idMessage.value = '';
        }
        //Actualizar vista
        views();
    })
}
const btnEdit = document.getElementsByClassName('update');

//eliminar
const removeMessage = function (id) {
    fetch('http://localhost:3005/message/remove/' + id,{
        method: 'DELETE',
    })
        // .then(res => res.json())
        .then(data => {
            views();
    })
}


