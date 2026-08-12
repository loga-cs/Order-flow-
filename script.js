let orders=JSON.parse(localStorage.getItem("orderFlowOrders"))||[
{id:"ORD-001",customer:"Arun",product:"Laptop",status:"Delivered"},
{id:"ORD-002",customer:"Kumar",product:"Keyboard",status:"Processing"},
{id:"ORD-003",customer:"Ravi",product:"Mouse",status:"Pending"}];

function save(){localStorage.setItem("orderFlowOrders",JSON.stringify(orders))}
function addOrder(){
let customer=document.getElementById("customer").value.trim(),product=document.getElementById("product").value.trim(),status=document.getElementById("status").value;
if(!customer||!product){alert("Please enter customer and product details.");return}
orders.push({id:"ORD-"+String(orders.length+1).padStart(3,"0"),customer,product,status});
save();document.getElementById("customer").value="";document.getElementById("product").value="";renderOrders();alert("Order added successfully!");
}
function deleteOrder(id){if(confirm("Delete this order?")){orders=orders.filter(o=>o.id!==id);save();renderOrders()}}
function changeStatus(id){let o=orders.find(x=>x.id===id);if(o){o.status=o.status==="Pending"?"Processing":o.status==="Processing"?"Delivered":"Pending";save();renderOrders()}}
function renderOrders(){
let q=document.getElementById("searchBox").value.toLowerCase(),t=document.getElementById("orderTable");t.innerHTML="";
orders.filter(o=>(o.id+o.customer+o.product+o.status).toLowerCase().includes(q)).forEach(o=>{
let r=document.createElement("tr");r.innerHTML=`<td>${o.id}</td><td>${o.customer}</td><td>${o.product}</td><td><span class="badge ${o.status.toLowerCase()}">${o.status}</span></td><td><button onclick="changeStatus('${o.id}')">Change</button> <button class="delete" onclick="deleteOrder('${o.id}')">Delete</button></td>`;t.appendChild(r)});
document.getElementById("totalOrders").textContent=orders.length;
document.getElementById("pendingOrders").textContent=orders.filter(o=>o.status==="Pending").length;
document.getElementById("processingOrders").textContent=orders.filter(o=>o.status==="Processing").length;
document.getElementById("completedOrders").textContent=orders.filter(o=>o.status==="Delivered").length;
let names=[...new Set(orders.map(o=>o.customer))],list=document.getElementById("customerList");list.innerHTML="";names.forEach(n=>{let d=document.createElement("div");d.className="customer";d.textContent=n;list.appendChild(d)})
}
renderOrders();