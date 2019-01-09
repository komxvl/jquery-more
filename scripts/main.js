$(document).ready(function() {
   
    var cardWrapper = $('.card-wrap');

    var _renderItem = function(data) {       
        var card =  "<div class='card'> <h2>"+data.title+"'></h2><hr>";                          
        card += "<p>Comments -"+data.id +"<br />"+data.body;                                 
        return card;
    }       

    
    var pageNumber  = 1;
    var limit = 10;
    isLoading = false;

    getUsersList(pageNumber, limit)

    $('.more').on('click',function(e) {
        e.preventDefault();
        if (isLoading) {           
            pageNumber++;            
            getUsersList(pageNumber, limit);
        }
    })


    function getUsersList(pageNumber, limit){
        $('.bouncing-loader').show();
        $.ajax({
            url:"https://jsonplaceholder.typicode.com/posts?_page="+pageNumber+"&_limit="+limit,  
            success:function(data) { 
                if(data.length !== 0){
                    isLoading = true;
                    $('.bouncing-loader').hide();
                    for(var i = 0; i < data.length; i++){
                        $('.list-wrapper').append(_renderItem(data[i]));                
                    }
                }
                else{
                    isLoading = false; 
                    $('.more').hide();
                    $('.bouncing-loader').hide();                   
                }
            }
        });        
    }

});