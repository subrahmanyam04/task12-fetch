let addBtn = document.getElementById('button');

let updateBtn = document.getElementById('upbutton');

let delBtn = document.getElementById('delbutton');

let canBtn = document.getElementById('canbutton');

let username = document.getElementById('fname');

let useremail = document.getElementById('email');

let tbody = document.getElementById('tbody');

let url = "http://localhost:3000/information";

let infor = [];

function getinformation(){
    fetch(url)
    .then( response => 
        response.json())        
        .then(data=>{
            console.log(data);
            infor = data;
            updatetable();
        })
   
}

getinformation();

function updatetable(){    
    if(infor.length>0){
            let tablebody = infor.map(info=>
                `<tr >
                      <td class="border border-dark">${info.name}</td>
                      <td class="border border-dark">${info.mail}</td>
                      <td class="border border-dark"><button class="btn btn-primary ebutton" onclick="editinformation(${info.id})"  >Edit</button></td>
                      <td class="border border-dark"><button class="btn btn-danger" onclick="deleteinformation(${info.id})" >Delete</button></td> 
                    </tr>`
            ).join('')

            tbody.innerHTML=tablebody;
    }            
   }

//    post operation

addBtn.addEventListener('click', function(event) {
    event.preventDefault();
    
    const newName = username.value;
    const newEmail = useremail.value;
    

    if (newName && newEmail) {
        let informationdata = { name: newName, mail: newEmail };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(informationdata)
        })
        .then(response => response.json())
        .then(data => {
            infor.push(data);
            updatetable();
            getinformation();
            username.value = '';
            useremail.value = '';
            
        })
        .catch(error => {
            console.error('Error adding information:', error);
        });
    } else {
        console.log('Please enter both name and email.');
        document.getElementById('error').innerHTML="Please enter both name and email.";
    }
    
});

// put operation

function editinformation(id) {
    
    const infoToEdit = infor.find(item => item.id === id );
  
    addBtn.style.display = 'none'; // Hide the "Submit" button
    updateBtn.style.display = 'block';  

    if (infoToEdit) {
        id = infoToEdit.id;
        console.log(id)
        username.value = infoToEdit.name;
        useremail.value = infoToEdit.mail;
    }

updateBtn.addEventListener('click', function(event) {
    event.preventDefault();
    id = infoToEdit.id;
    const updatedName = username.value;
    const updatedEmail = useremail.value;
    
    if (updatedName && updatedEmail) {
        const editedData = { name: updatedName, mail: updatedEmail };

        fetch(`${url}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedData)
        })
        .then(response => response.json())
        .then(data => {
            infor.push(data);
            updatetable();
            getinformation();
            // location.reload();
            
            username.value = '';
            useremail.value = '';
            addBtn.style.display = 'block';
            updateBtn.style.display = 'none';
          
          
        })
        .catch(error => {
            console.error('Error updating information:', error);
        });
    } else {
        console.log('Please enter both name and email.');
        document.getElementById('error').innerHTML = "Please enter both name and email.";
    }
});
      
};

// delete operation

function deleteinformation(id) {
    const infoToDelete = infor.find(item => item.id === id);
    
    // Display a confirmation alert
    const confirmation = confirm("Are you sure you want to delete this information?");
     
    if (confirmation) {
        if (infoToDelete) {
            id = infoToDelete.id;
            fetch(`${url}/${id}`, { method: 'DELETE' })
                .then(function() {
                    // Successful deletion, update the information list
                        getinformation();
                       
                })
                .catch(function(error) {
                    console.error('Error deleting information:', error);
                });
        }
        
    }   
}


canBtn.addEventListener('click', function() {
 location.reload();

});



    
