//Target an element
let ul=document.querySelector(".ul");
let dropDown=document.getElementById("dropDown");

//important brands list in array
let Product=['Select Here','Stunna Lip Paint ','Poutsicle','Gloss Bomb','Cosmic Gloss','Mattemoiselle','Banana Blazer','Hollapeno','Killawatt Foil','Starli','What s Your Numb a','So Chilli','No Chill'];

//using forEach method to createElement and append in the dropdown list.
Product.forEach((Product,index)=>{
    let option=document.createElement("option");
    option.setAttribute("value",index);
    option.innerText=Product;
    dropDown.append(option)
});

//initial brand name
let ProductName="Poutsicle ";
//dynamic url
let url=(`https://fenty-api.herokuapp.com/products.json?ProductName=${ProductName}`);
//starting page.
let startpage=0;
//eventlistener to listen the drop down selection
dropDown.addEventListener("click",async()=>{
    let index=dropDown.selectedIndex;
     if(index>0){
        ProductName="";
        ProductName+=Product[index];
        url=(`https://fenty-api.herokuapp.com/products.json?ProductName=${ProductName}`)
        console.log(url);
     }
     try {
        let res = await fetch(url);
        res=await res.json();
        let filteredArray=res.slice(startpage,startpage+9)
            ul.innerHTML=ThreeCard(filteredArray);
        } catch (error) {
            console.log(error);        
    }

})

//create function to fetch data from api
let getUsers = async ()=>{
  try {
      let res = await fetch(url);
      res=await res.json();
      return res
  } catch (error) {
      console.log(error);
  }
}

//this will load the data when page get load.
addEventListener("DOMContentLoaded",async ()=>{
    try {
        let res = await fetch(url);
        res=await res.json();
        let filteredArray=res.slice(startpage,startpage+9)
            ul.innerHTML=ThreeCard(filteredArray);
            // inserting(res);       
        } catch (error) {
            console.log(error);        
    }
})

//clicking next Button
let nextBtn=document.querySelector(".nextBtn");
nextBtn.addEventListener("click",()=>{
    
    startpage+=9;
    getUsers().then(function(value){
        console.log(startpage);
        if(startpage<value.length){
            let array=value.slice(startpage,startpage+9);
            ul.innerHTML=ThreeCard(array);
        }else{
            startpage+=-9;
            alert("you are already in last page")
        }
    }) 
})

//clicking prev Button
let prevBtn=document.querySelector(".prevBtn");
prevBtn.addEventListener("click",()=>{
    
    startpage-=9;
    getUsers().then(function(value){
        console.log(startpage);
        if(startpage>0){
            let array=value.slice(startpage,startpage+9);
            ul.innerHTML=ThreeCard(array);
        }else{
            startpage+=+9;
            alert("you are already in first page")
        }
    }) 
})

// this template funciton will give syntax of html with value
let template=(product)=>{
    let temp=`
    <!-- CARD -->
    <div class="col-sm-6 col-md-4 col-lg-4 col-xl-4">
            <div class="card h-100" >
                <div class="product-card__badges"></div>
                <div class="card-body">
                <img class="flag1"f src="https://th.bing.com/th/id/OIP.bxJl3gp6I3Jg5O1U3UBVcgHaE7?w=249&h=180&c=7&r=0&o=5&pid=1.7", alt="">
                    <div class=align>
                        <p class="product-name"><b>Product:</b> src='https://fenty-api.herokuapp.com/name/$ProductName'</p>
                        <p class="product-card__details__pricing-info f"><b>Price :</b>herf="https://fenty-api.herokuapp.com/price/$Price"</p>
                        <p class="product-card__details"><b>Description :</b>""</p>
                        <a class="card-text" href="https://fentybeauty.com/collections/makeup-all"><b>Click here to buy </b></a>
                    </div>
                </div>
            </div>
    </div>
                    `;        
                     
        return temp
}

//let 3card in a row
let ThreeCard=(data)=>{

    let mainAdd="";
    let tempAdd="";
    for(let i=0;i<data.length;i=i+3){
        let c="";
        for(let j=i;j<i+3;j++){
            c+=template(data[j])
        }
        tempAdd=`<li style="list-style:none;"><div class="row">${c}</div></li>`;
        mainAdd+=tempAdd;
    }
    return mainAdd
}
