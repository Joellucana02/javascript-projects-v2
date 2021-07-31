const api = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1',
apiKey = '04c35731a5ee918f014970082a0088b1',
apiImgPath = 'https://image.tmdb.org/t/p/w1280',
apiQ = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`,
input = document.querySelector('.search-input'),
formBtn = document.getElementById('search'),
moviesContainer = document.querySelector('.items-wrapper'),
container = document.querySelector('.items-container');

let getMovies = async ()=>{
    try {
        let raw = await axios.get(api),
        data = await raw.data,
        resultsData = await data.results;
        console.log(resultsData)
        displayMovies(resultsData)
    } catch (error) {
        console.warn(error)
    }
}
let getMoviesByName = async (name)=>{
    try {
        let raw = await axios.get(`${apiQ}${name}`),
        data = await raw.data,
        resultsData = await data.results;
        console.log(resultsData)
        displayMovies(resultsData)
    } catch (error) {
        console.warn(error)
    }
} 
getMovies()
formBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!input.value) return;
    console.log(input.value);
    getMoviesByName(input.value);
    input.value = "";
  });
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // code for enter
      if (!input.value) return;
      console.log(input.value);
      getMoviesByName(input.value);
      input.value = "";
    }
  });

let displayMovies = (movies)=>{
    moviesContainer.innerHTML = '';
    movies.forEach(element => {
        movieWrapper(element)
    });
    let infoBtn = document.querySelectorAll('.more-info');
    infoBtn.forEach(btn=>{
        btn.addEventListener('click',(e)=>{
            let match = movies.filter(el=> el.id == btn.id)
            console.log(match)
            movieInfoModal(match)
        })
    })
}
let movieWrapper = (da)=>{
    let div = document.createElement('div');
    div.classList.add('movie-item');
    div.innerHTML = movieTemplate(da);
    moviesContainer.appendChild(div);
}
let movieTemplate = (d)=>{
    return`
    <img src='${apiImgPath}${d.poster_path}' alt="${d.title}">
    <h3>${d.title}</h3>
    <h4>${d.vote_average}</h4>
    <button class="more-info" id="${d.id}">more...</button>
    `;
}
let movieInfoModal = (da)=>{
    let div = document.createElement('div');
    div.classList.add('movie-modal-active');
    div.innerHTML = movieInfo(da);
    container.appendChild(div);
    let close = document.querySelector('.close-modal');
    close.addEventListener('click',(e)=>{
        //div.classList.toggle('movie-modal-active')
         if(div.classList.contains('movie-modal-active')){
            div.style.display = 'none'
            close.parentNode.remove(div)
            div.classList.remove('movie-modal-active')
            div.innerHTML = '';
        }else{
            div.style.display = 'block';
            //div.classList.remove('movie-modal-active') 
            div.classList.add('movie-modal-active') 
        } 
    })
} 
let movieInfo = (d)=>{
    return`
    <button class="close-modal">Close</button>
    <img src='${apiImgPath}${d[0].poster_path}' alt="${d[0].title}">
    <div>
    <h3>${d[0].title}</h3>
    <h4>Rate: ${d[0].vote_average}</h4>
    <h4>Description: ${d[0].overview}</h4>
    <h4>Release date: ${d[0].release_date}</h4>
    </div>

    `;
}