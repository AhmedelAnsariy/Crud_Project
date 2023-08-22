
var prodName = document.getElementById("prodName");
var prodPrice = document.getElementById("prodPrice");
var prodDescription = document.getElementById("prodDescription");
var select_input = document.getElementById("select-input");
var productQuantity = document.getElementById("productQuantity");

var productsArr = [];

/*  used with update */
var addBtn = document.getElementById('addBtn');
var  updataBtn = document.getElementById('updataBtn');
var indexUpdate = 0;
/*  used with update */


if(localStorage.getItem("items") !=null){
    productsArr = JSON.parse(localStorage.getItem("items"));
    displayData();
}



function addProducts() {
  var productObject = {
    name: prodName.value,
    price: prodPrice.value,
    descrip: prodDescription.value,
    type: select_input.value,
    quanti: productQuantity.value,
  };

if(prodName.value=="" || prodPrice.value=="" || prodDescription.value=="" || productQuantity.value==""  ){
  swal("ERROR !", "Please fill all data !", "warning");
  return 0 ;
}else{
  swal("Added", "the product added to our strore !", "success");
  productsArr.push(productObject);
  localStorage.setItem("items",JSON.stringify(productsArr));
  displayData();
  delete_inputs_data();
}
}

function displayData() {
  var cartona = "";
for (var i=0 ; i<productsArr.length ; i++){
    cartona += `
      <tr>
        <td class="p-3">${i+1}</td>
        <td class="p-3">${productsArr[i].name}</td>
        <td class="p-3">${productsArr[i].price}</td>
        <td class="p-3">${productsArr[i].descrip}</td>
        <td class="p-3">${productsArr[i].type}</td>
        <td class="p-3">${productsArr[i].quanti}</td>
        <td class="p-3">
        <button onclick="setData(${i})" class="btn btn-warning">Update <i class="fa-solid fa-pen ms-2"></i> </button>
        </td>


        <td class="p-3">
        <button onclick="delete_one_item()" class="btn btn-danger">Delete <i class="fa-solid fa-trash ms-2"></i></button>
        </td>
      </tr>
    `;
  }
  document.getElementById("demo").innerHTML = cartona;
}

function delete_inputs_data(){
    prodName.value ="";
    prodPrice.value="";
    prodDescription.value="";
    select_input.value="";
    productQuantity.value="";
}

function clearTable(){

  if(localStorage.getItem("items") ==null){
    swal("ERROR !", "The table is empty is empty !", "warning");
  }
else{
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this imaginary file!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })

  .then((willDelete) => {
    if (willDelete) {
      swal("Poof! Your imaginary file has been deleted!", {
        icon: "success",
      });
      

      localStorage.clear();
      productsArr = [];
      displayData();
    } 
    
    else {
      swal("Your imaginary file is safe!");
    }
  });


} 
}

function delete_one_item(index){
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this imaginary file!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      swal("Poof! Your imaginary file has been deleted!", {
        icon: "success",
      });
      productsArr.splice(index,1);
      localStorage.setItem("items",JSON.stringify(productsArr));
      displayData();
} 
    else {
      swal("Your imaginary file is safe!");
    }
  })
}


function search(search){
    var cartona = "";
    for (var i= 0 ; i<productsArr.length ; i++){

        if(productsArr[i].name.toLowerCase().includes(search.toLowerCase())){
            cartona +=`
            <tr>
            <td>${i}</td>
            <td>${productsArr[i].name.replace(search, '<span>'+search+'</span>')}</td>
            <td>${productsArr[i].price}</td>
            <td>${productsArr[i].descrip}</td>
            <td>${productsArr[i].type}</td>
            <td>${productsArr[i].quanti}</td>
            <td>
              <button class="btn btn-warning">Update</button>
            </td>
            <td>
            <button onclick="delete_one_item()" class="btn btn-danger">Delete</button>
            </td>
          </tr>
            `
        }
    }
    document.getElementById("demo").innerHTML = cartona ;
}

function setData(index){
var currentProduct = productsArr[index];
  indexUpdate= index ;
  prodName.value        =  currentProduct.name;
  prodPrice.value       =  currentProduct.price;
  prodDescription.value =  currentProduct.descrip;
  select_input.value    = currentProduct.type;
  productQuantity.value = currentProduct.quanti;
  updataBtn.classList.remove("d-none");
  addBtn.classList.add("d-none");
}

function updateProduct(){
    var productObject = {
      name: prodName.value,
      price: prodPrice.value,
      descrip: prodDescription.value,
      type: select_input.value,
      quanti: productQuantity.value,
};




if(prodName.value=="" || prodPrice.value=="" || prodDescription.value=="" || productQuantity.value==""  ){
   swal("ERROR !", "Please fill all data !", "warning");
   return 0 ;
}


else{
  swal("Updated", "the product updater in   our strore !", "success");
productsArr.splice(indexUpdate,1,productObject);



localStorage.setItem("items",JSON.stringify(productsArr));
displayData();
delete_inputs_data();

updataBtn.classList.add("d-none");
addBtn.classList.remove("d-none");
}
}
