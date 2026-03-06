  
  const allTreesBtn = document.getElementById('allTreesBtn');
  function clickAllBtn(id){
    showCategoryTrees(id,allTreesBtn);
    loadTrees();
  }
  const categoriesContainer = document.getElementById('categories-container');
  const treeContainer = document.getElementById('trees-container');
  const loadingCategories = document.getElementById('loadingCategories');
  const detailsModal = document.getElementById('details-modal');
  const detailsImage = document.getElementById('details-image') ;
  const detailsTitle = document.getElementById('details-title') ;
  const detailsBadge = document.getElementById('details-badge') ;
  const detailsDescription = document.getElementById('details-description') ;
  const detailsPrice= document.getElementById('details-price') ;
  async function loadCategoriesBtn() {
    const res= await fetch('https://openapi.programming-hero.com/api/categories');
    const data = await res.json();
    data.categories.forEach(element => {
       const categoriesBtn = document.createElement('button');
       categoriesBtn.className="btn btn-outline w-full";
       categoriesBtn.innerText=element.category_name;
       categoriesBtn.onclick=()=>showCategoryTrees(element.id,categoriesBtn);
       categoriesContainer.appendChild(categoriesBtn);
    });
  }

 async function showLoading() {
   loadingCategories.classList.remove('hidden');
   loadingCategories.classList.add('flex');
   treeContainer.innerHTML='';
 }

 async function hideLoading() {
   loadingCategories.classList.remove('flex');
    loadingCategories.classList.add('hidden');
 }

 async function showCategoryTrees(categoryId,button){

     const allBtns = document.querySelectorAll('#categories-container button,#allTreesBtn');
     allBtns.forEach(btn=>{
       btn.classList.remove('btn-success');
       btn.classList.add('btn-outline');
     })
      button.classList.add('btn-success');
     button.classList.remove('btn-outline');
     showLoading();
     const res = await fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`);
     const data = await res.json();
      hideLoading();
     displayTrees(data);
    
  }

  async function loadTrees() {
    showLoading();
    const res=await fetch('https://openapi.programming-hero.com/api/plants');
    const data = await res.json();
    hideLoading();
     displayTrees(data);
  }
 
  const displayTrees=(data)=>{
    data.plants.forEach(tree=>{
        const div = document.createElement('div');
        div.innerHTML=`
        <div class="card bg-base-100  shadow-sm">
                            <figure >
                                <img onclick="loadDetails(${tree.id})"src="${tree.image}"
                                    alt="${tree.name}" title="${tree.name}" class="h-[30vh] object-cover w-full" />
                            </figure>
                            <div class="card-body">
                                <h2 class="card-title">${tree.name}</h2>
                                <p class="line-clamp-2">${tree.description}</p>
                                <div class="badge badge-outline badge-success">${tree.category}</div>
                                <div class="flex gap-4 justify-between items-center">
                                    <h2 class=" text-xl text-[#416d51] font-bold">$${tree.price}</h2>
                                    <button class="btn  btn-success text-white ">Cart</button>
                                </div>
                            </div>
         </div>
        `
        treeContainer.appendChild(div);
    })
  }


  async function loadDetails(id) {
    const res = await fetch(`https://openapi.programming-hero.com/api/plant/${id}`);
    const data = await res.json();
    const tree = data.plants;
    detailsTitle.innerText=`${tree.name}`
    detailsImage.src=`${tree.image}`;
    detailsBadge.innerText=`${tree.category}`;
    detailsDescription.innerText=`${tree.description}`;
    detailsPrice.innerText=`$${tree.price}`;
    detailsModal.showModal();
    
  }

  function close(){
   detailsModal.classList.add('hidden');
  }

  loadCategoriesBtn();
  loadTrees();