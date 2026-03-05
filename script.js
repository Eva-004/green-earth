  
  const categoriesContainer = document.getElementById('categories-container');
  const treeContainer = document.getElementById('trees-container');
  async function loadCategoriesBtn() {
    const res= await fetch('https://openapi.programming-hero.com/api/categories');
    const data = await res.json();
    data.categories.forEach(element => {
       const categoriesBtn = document.createElement('button');
       categoriesBtn.className="btn btn-outline btn-success w-full";
       categoriesBtn.innerText=element.category_name;
       categoriesContainer.appendChild(categoriesBtn);
    });
  }

  async function loadTrees() {
    const res=await fetch('https://openapi.programming-hero.com/api/plants');
    const data = await res.json();
     displayTrees(data);
  }
 
  const displayTrees=(data)=>{
    data.plants.forEach(tree=>{
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
                                    <h2 class=" text-xl text-[#416d51] font-bold">$5000</h2>
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