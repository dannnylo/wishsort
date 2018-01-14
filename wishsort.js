var WishSort = {
  ajaxPages: 0,
  priceToInteger: function(text){
    text = text.replace('BRL','').replace('Gratuito','0').replace('R$','');
    text = text.replace('USD','').replace('Free','0').replace('$','');
    return parseInt(text, 10);
  },

  allProductsListed: function(){
    return $('#feed-more-end').is(':visible');
  },

  sortProducts: function (){
    var sorted = $('.feed-product-item').sort(function(prodA, prodB){
      var priceA = WishSort.priceToInteger($(prodA).find('.feed-actual-price').text());
      var priceB = WishSort.priceToInteger($(prodB).find('.feed-actual-price').text());
      return ((priceA < priceB) ? -1 : ((priceA > priceB) ? 1 : 0));
    });

    $.each(sorted, function(){
      $(this).appendTo($('#feed-grid'));
    })
  },

  getPages: function(limit){
    if (limit > WishSort.ajaxPages){
      setTimeout(function(){
        if (WishSort.allProductsListed()){
          WishSort.sortProducts();
        } else{
          WishSort.getPages(limit);
        }
      }, 1000);
    } else {
      WishSort.sortProducts();
    }
    WishSort.ajaxPages += 1;
    window.scrollTo(0,99999);
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

// Limit wait 20 pages
WishSort.sort(20);
