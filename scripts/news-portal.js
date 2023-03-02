let fetchData =[];
const loadData = async () =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res =await fetch(url)
    const data =await res.json()
    
    showData(data.data);
}
const showData = (objData) =>{
    // console.log(objData.news_category);
    const containerCategroy = document.getElementById('categoryContainer')
    objData.news_category.forEach(element => {
        // console.log(element);
        containerCategroy.innerHTML += `<button class="btn btn-ghost" onclick="fetchCategoryNews('${element.category_id}', '${element.category_name}')">${element.category_name}</button>`

    });
}


const fetchCategoryNews = (category_id , category_name) =>{
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    
        fetch(url)
        .then(res => res.json())
        .then(data => {
            fetchData = data.data
            showCarterogyData(data.data, category_name)
            
        });
        
}
const showCarterogyData = (data,category_name) =>{
// console.log(data,category_name);
    document.getElementById('countOfCateryPost').innerText = data.length;
    document.getElementById('categoryName').innerText = category_name;
    document.getElementById('all-news-Body').innerHTML = '';
    
    data.forEach((singleNews) => {
        const {_id,author,details,rating,title,total_view,thumbnail_url,others_info} =singleNews;
        // console.log(singleNews._id);
        
    document.getElementById('all-news-Body').innerHTML += `
    <div class="card card-side bg-base-100 shadow-xl my-5">
      <img src="${thumbnail_url}" class="" alt="Movie"/>
      <div class="card-body">
        <h2 class="card-title">${title} <span id="trending" class=" bg-yellow-400 text-sm rounded p-1">${others_info.is_trending ? 'Trending' : others_info.is_todays_pick ? 'Todays Pick' : 'Not Available'}</span> 
         </h2>
        <p>${details.slice(0,300)}</p>

        <div id="cardFooter" class="mt-4">
          <p class="mb-3">${details.slice(300,400) ? details.slice(300,400) : 'Not Available'}...</p>
          <div class="card-actions flex justify-between">    
            <div class="flex">
                <img src="${author.img}" class="h-10 w-10 rounded-full" alt="" srcset="" >
                <div class="ml-2">
                    <p>${author.name ? author.name :  'Not Available'}<p/>
                    <p>${author.published_date ? author.published_date  : 'Not Available'}<p/>
                </div>
            </div>
            <div class="flex"> 
                <img class="h-6 w-6 mx-3" src="assets/eye_icon_open.png" alt="" srcset="">${total_view ? total_view : 'No View'}
            </div>
            <div id="star" class="flex">
            <p class="flex">${generateStars(rating.number)}<p/>   
            <p class="">${rating.number}<p/>   
            </div>

            <div class="">

                <label  for="my-modal-5" class="btn bg-slate-100 hover:bg-blue-700" onclick="singleDataFetch('${_id}')">
                 <img class="h-6 w-6 mx-3" src="assets/arrow_right_icon.png" alt="" srcset="">
                </label> 

            </div>
          </div>
        </div>
      </div>
    </div>
  `;
     })
}
// star generat
 generateStars = rating =>{
    let retiningHtml = ``
    for (let i = 0; i < Math.floor(rating); i++) {
        
        retiningHtml +=`<img class="h-4 w-4 mx-1" src="assets/star_icon.png" alt="" srcset=""></img>`
        // console.log('4');
    }
    if (rating - Math.floor(rating) > 0) {
        retiningHtml +=`<img class="h-4 w-4 mx-1" src="assets/star_half_icon.png" alt="" srcset=""></img>`
        // console.log('0.5');
    }
    return retiningHtml
}
// deatiles data load
const singleDataFetch = news_id => {
    const url =`https://openapi.programming-hero.com/api/news/${news_id}`
    fetch(url)
    .then(res => res.json())
    .then(data => showSingleData(data.data))
    // console.log(url);
}
const showSingleData = singleData => {
    singleData.forEach((modalNews) => {
    const {author,details,rating,title,total_view,others_info} =modalNews;
    // console.log(singleNews._id);
    console.log(author);
    document.getElementById('modal-body').innerHTML =`
       
    <div class=" card card-side bg-base-100 shadow-xl my-5">
    <div class="card-body">
      <h2 class="card-title uppercase">${title}
      <h2 class="card-title">${title} <span class="bg-yellow-400 text-sm rounded p-1">${others_info.is_trending ? 'Trending' : "Not Available"}</span></h2>
      <p>${details}</p>
      <div id="cardFooter" class="mt-4">
        <div class="card-actions flex justify-between">    
          <div class="flex">
              <img src="${author.img}" class="h-10 w-10 rounded-full" alt="" srcset="" >
              <div class="ml-2">
                  <p>${author.name ? author.name :  "Not Available"}<p/>
                  <p>${author.published_date}<p/> 
              </div>
          </div>
          <div class="flex"> 
              <img class="h-6 w-6 mx-3" src="assets/eye_icon_open.png" alt="" srcset="">${total_view ? total_view : 'No View'}
          </div>
          <div id="star" class="flex">
          <p class="flex">${generateStars(rating.number)}<p/>   
          <p class="">${rating.number}<p/>   
          </div>
        </div>
      </div>
    </div>
  </div>

    `;
    })

}
// tranding button function
const trending = () =>{
    const trendingData = fetchData.filter(fetchData => fetchData.others_info.is_trending === true)
    // console.log(trendingData);
    const categoryName = document.getElementById('categoryName').innerText;    
    showCarterogyData(trendingData,categoryName);
    // for (let trendingData = 0; trendingData < trendingData.length; trendingData++) {
    //     const trendingClass = document.getElementById('trending');
    //     trendingClass.classList.remove('hidden');
    //     console.log(trendingData); 
    // }
    
}
// today's Pick button workable using onclick function
const todayPick = () =>{
    const todayPickData = fetchData.filter(todayPickData => todayPickData.others_info.is_todays_pick === true)
    const categoryName = document.getElementById('categoryName').innerText;    
    showCarterogyData(todayPickData,categoryName);
}
// showCarterogyData (3,'02')
// loadData()



