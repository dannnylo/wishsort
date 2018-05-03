var my_awesome_script = document.createElement('script');
my_awesome_script.setAttribute('src','https://code.jquery.com/jquery-1.12.4.min.js');
document.head.appendChild(my_awesome_script);

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

    var grid = $($('#feed-grid, #feed-grid-modal').first())

    $.each(sorted, function(){
      $(this).appendTo(grid);
    })

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
