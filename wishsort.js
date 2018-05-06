var WishSort = {
  ajaxPages: 0,
  priceToInteger: function(text){
    text = text.replace('BRL','').replace('Gratuito','0').replace('R$','');
    text = text.replace('USD','').replace('Free','0').replace('$','');
    return parseInt(text, 10);
  },

  allProductsListed: function(){
    var noMoreItens = document.getElementById('feed-more-not-found')
    if (noMoreItens === null){
      return true
    } else {
      return (noMoreItens.className === 'hide');        
    }
  },

  sortProducts: function (){
    var items = document.getElementsByClassName('feed-product-item')
    var sorted = Array.prototype.slice.call(items).sort(function(prodA, prodB){
      var priceA = WishSort.priceToInteger(prodA.getElementsByClassName('feed-actual-price')[0].innerText);
      var priceB = WishSort.priceToInteger(prodB.getElementsByClassName('feed-actual-price')[0].innerText);
      return ((priceA < priceB) ? -1 : ((priceA > priceB) ? 1 : 0));
    });

    var grid = document.getElementById("feed-grid")
    if (grid === null){
      grid = document.getElementById("feed-grid-modal")
    }

    for (var item in sorted) {
      grid.append(sorted[item])
    }

    window.scrollTo(0,0);

  },

  getPages: function(limit){
    WishSort.ajaxPages += 1;
    window.scrollTo(0,99999);
    if (limit > WishSort.ajaxPages){
      setTimeout(function(){
        if (WishSort.allProductsListed()){
          setTimeout(WishSort.sortProducts, 1000);
        } else{
          WishSort.getPages(limit);
        }
      }, 1000);
    } else {
      setTimeout(WishSort.sortProducts, 1000);
    }
    return true;
  },

  sort: function(limit){
    WishSort.ajaxPages = 0;
    if (this.allProductsListed()){
      this.sortProducts();
    } else {
      this.getPages(limit);
    }
  }
}
