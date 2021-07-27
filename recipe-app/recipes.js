const search = document.getElementById('search'),
container = document.querySelector('.container'),
favList = document.querySelector('.fav-list'),
getRandomRe = document.querySelector('.generate-recipe'),
itemsW = document.querySelector('.items-wrapper');
let randomRecipe = 'https://www.themealdb.com/api/json/v1/1/random.php';
let recipesArr = [];
search.addEventListener('click',()=>{
    
})
favList.addEventListener('click', e=>{
    console.log(recipesArr)
    showMyList(recipesArr)
    
})
getRandomRe.addEventListener('click', e=>{

    ranRecipe()
})
let ranRecipe = async()=>{
    try {
        let rawData = await axios.get(randomRecipe), 
        data = await rawData.data,
        brData = await data.meals[0];
        console.log(data.meals[0])
        addMeal(brData) 
        let heartBtn = itemsW.querySelectorAll('.heart-btn');
        heartBtn.forEach(miniBtn=>{
            miniBtn.addEventListener('click',(e)=>{
                console.log(e)
                if(!miniBtn.classList.contains('heart-btn-active')){
                    miniBtn.classList.add('heart-btn-active')
                    recipesArr.forEach(el=>{
                        if(el.idMeal === brData.idMeal) removeRecipeFromArr(brData.idMeal)
                    })
                    addRecipeToArr(brData)
                }else{
                    miniBtn.classList.remove('heart-btn-active')
                    removeRecipeFromArr(brData.idMeal)
                 }
                //heartBtn.classList.toggle('heart-btn-active')
            }) 
            
        } )
   /*      addMealSec(brData).then(res=>{
            console.log(res);
            let heartBtn = res.querySelector('.heart-btn')
    heartBtn.addEventListener('click',(e)=>{
        console.log(e)
        heartBtn.classList.toggle('heart-btn-active')
    })        
    itemsW.appendChild(res);
        }).catch(err=>console.log(err))
*/
    } catch (error) {
        console.log(error)
    }
}
let byIdrecipe = async(id)=>{
    try {
        let rawData = await axios.get(`http://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`), 
        data = await rawData.data;
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}
let bySearchrecipe = async(name)=>{
    try {
       let rawData = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`), 
        data = await rawData.data;
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

document.addEventListener('DOMContentLoaded',ranRecipe)
let addMeal = (recipeObj)=>{
    let liBlock = document.createElement('div');
    liBlock.classList.add('recipe-item')
    itemsW.innerHTML = ''
    liBlock.innerHTML = card(recipeObj);
    itemsW.appendChild(liBlock);
}   
let card = (recipeObj)=>{
    return `
                        <div class="recipe-item__top">
                            <img src=${recipeObj.strMealThumb} alt=${recipeObj.strMeal}>
                        </div>
                        <div class="recipe-item__body">
                            <h3>${recipeObj.strMeal}</h3>
                            <button class="heart-btn"><i class="far fa-heart"></i></button>
                        </div>
    `
}
let addRecipeToArr = (obj)=>{
    //console.log(obj)
    /* recipesArr.forEach(ele=>{
        if(obj.idMeal === ele.idMeal) return console.log('there the same');
    }) */
    
    recipesArr =[...recipesArr, obj]
    console.log(recipesArr)
}
let removeRecipeFromArr = (id)=>{
    console.log(id)
    recipesArr = recipesArr.filter(obj=>obj.idMeal!==id)
    console.log(recipesArr)
}
let showMyList = (list)=>{
    itemsW.innerHTML = '';
    list.forEach(obj=>{
        let liBlock = document.createElement('div');
    liBlock.classList.add('recipe-item')
    liBlock.innerHTML = listItemTemplate(obj);
        itemsW.appendChild(liBlock)
    })
    let removeBtn = itemsW.querySelectorAll('.remove-btn');
    console.log(removeBtn)
    removeBtn.forEach(e=>{
        console.log(e.id)
        e.addEventListener('click',el=>{
            console.log(e.id)
            removeRecipeFromArr(e.id)
            showMyList(recipesArr)
            /* recipesArr = recipesArr.filter(ele=>ele.idMeal!==el.idMeal)
            console.log(recipesArr) */
    })
        /* 
        el.addEventListener('click', (objMeta)=>{
            console.log(objMeta)
            recipesArr = recipesArr.filter(element=>element!==objMeta)
            showMyList(recipesArr)
        }) */
    })
    //console.log(removeBtn)
}
let listItemTemplate = (item)=>{
    return `
    <div class="recipe-item__top">
    <img src=${item.strMealThumb} alt=${item.strMeal}>
</div>
<div class="recipe-item__body">
    <h3>${item.strMeal}</h3>
    <button class="remove-btn" id="${item.idMeal}">Remove</button>
</div>
    `
} 
/* let addMealSec = (recipeObj)=>{
    return new Promise((resolve,reject)=>{
        if(!recipeObj) reject('Theres not recipeObj');
        let liBlock = document.createElement('div');
    liBlock.classList.add('recipe-item')
    liBlock.innerHTML = card(recipeObj);
        resolve(liBlock);
    })
} */