const url = 'https://zh.wikipedia.org/w/api.php?action=opensearch&format=json&limit=5&origin=*';

const getSuggestList = (keyword) => fetch(url + '&search=' + keyword, { method: 'GET', mode: 'cors' })
                                    .then(res => res.json())
const render  = (suggestArr = []) => {
	suggestList.innerHTML = suggestArr.map( item => '<li>'+item+'</li>' ) 
									  .join('')
}

const searchInput = document.getElementById('search');
const suggestList = document.getElementById('suggest-list');

const keyword = Rx.Observable.fromEvent(searchInput, 'input');
const selectItem = Rx.Observable.fromEvent(suggestList, 'click');

keyword
    .switchMap(e => getSuggestList(e.target.value), (e, res) => res[1])	//取用第二個值
    .subscribe(list => render(list))

selectItem
	.filter(e => e.target.matches('li'))
	.map(e => e.target.innerText)
	.subscribe( text => {
		searchInput.value = text;
		render();
    })
