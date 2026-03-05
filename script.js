  
  const categoriesContainer = document.getElementById('categories-container');
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

  loadCategoriesBtn();