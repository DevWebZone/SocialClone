

class Like{

    constructor(id, type){
        this.type = type;
        if(type == "Post"){
            this.likeButton = $(`#like-post-${id}`);
            
        }
        else{
            this.likeButton = $(`#like-comment-${id}`);
        }
        this.ToggleLike(id);
    }
    ToggleLike(id){
        this.likeButton.click(function(event){
            event.preventDefault();
            $.ajax({
                type: 'get',
                url: $(this).attr('href'),
                success: function(data){
                    console.log(data.data.deleted);
                    if(!data.data.deleted)
                    {
                        console.log(event.target);
                        $(event.target).css("font-variation-settings", "'FILL' 100");
                        $(event.target).css("color", "rgb(230, 29, 29)");
                    }
                    else{
                        $(event.target).css("font-variation-settings", "'FILL' 0");
                        $(event.target).css("color", "rgb(156, 155, 155)");
                    }
                },
                error: function(err){
                    console.log(err.responseText);
                }
            })
        })
    }

}