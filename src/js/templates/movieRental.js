/* 
          Vanilla JS Templating
          template string with markup that is pre styled
          setup the template.js file.
          <div class="body">
*/

function movieRental({key, image, movie, price, genre, sku }){
    const template = `
    <div class="body">
        <div class="container">
            <div class="card">
                <div class="product-image">
                    <img src="${image}" alt="movie image">
                </div>
                <div class="product-info">
                    <h4>Movie: ${movie}</h4>
                    <h4>Price:<span>$</span> ${price}</h4>
                    <h4>Genre: ${genre}</h4>
                    <h4>SKU: ${sku}</h4>
                </div>
                <div class="btn">
                    <button type="button">Buy</button>
                    <button id="edit" data-key="${key}">Edit</button>
                    <button id="delete" data-key="${key}">Delete</button>
                 </div>
            </div>
        </div>
    </div>
`
    const element = document.createRange().createContextualFragment(template).children[0]
    addButtonControls(element)
    return element
}


function addButtonControls(rental){
    rental.querySelector('#edit').addEventListener('click', onEditMovie)
    rental.querySelector('#delete').addEventListener('click', onRemoveMovie)
}

function onEditMovie(e){
    const key = e.target.dataset.key;
    sessionStorage.setItem('key', key)
    window.location.assign('update.html')
}

function onRemoveMovie(e){
    const key = e.target.dataset.key;
    sessionStorage.setItem('key', key)
    window.location.assign('delete.html')
}

export {movieRental}