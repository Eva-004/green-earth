  
  const allTreesBtn = document.getElementById('allTreesBtn');
  function clickAllBtn(id){
    showCategoryTrees(id,allTreesBtn);
  }
  const categoriesContainer = document.getElementById('categories-container');
  const treeContainer = document.getElementById('trees-container');
  const loadingCategories = document.getElementById('loadingCategories');
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
     displayTrees(data.plants);
    
  }

  async function loadTrees() {
    showLoading();
    const res=await fetch('https://openapi.programming-hero.com/api/plants');
    const data = await res.json();
    hideLoading();
     displayTrees(data.plants);
  }
 
  const displayTrees=(data)=>{
    data.forEach(tree=>{
        const div = document.createElement('div');
        div.innerHTML=`
        <div class="card bg-base-100  shadow-sm">
                            <figure>
                                <img src="${tree.image}"
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

  loadCategoriesBtn();
  loadTrees();