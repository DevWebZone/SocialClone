

class PostComments{

    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);

        let self = this;
        // call for all the existing comments
        this.postContainer.find(".comment").each(function(){
            self.deleteComment($(this).find($('.delete-comment-button')));
        });
    }

    createComment(postId){
        let pSelf = this;
        this.newCommentForm.submit(function(event){
            event.preventDefault();
            console.log('test');
            $.ajax({
                type: 'post',
                url: '/posts/add-comment',
                data: $(this).serialize(),
                success: function(data){
                    
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    console.log(newComment);
                    $(`#post-comment-${postId}`).prepend(newComment);
                   
                   let deleteLink = $(`#comment-${data.data.comment._id}`).find('.delete-comment-button')[0];
                   console.log(deleteLink);
                    pSelf.deleteComment(deleteLink);
                    $('#comment-content').val("");
                    new like(data.data.comment._id, "Post");
                },
                error: function(err){
                    console.log(err.responseText);
                }
            });
        }); 
    }

    newCommentDom(comment){
        return(`<li id="comment-${comment._id}" class="comment" style="list-style: none;">
                ${comment.content}
                <div class="delete-comment">
                <a href="/posts/delete-comment/?id=${comment._id}" type="submit" class="delete-comment-button">x</a>
                </div>
                </li>`);
    }
    deleteComment(deleteLink){
        $(deleteLink).on('click', function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }



}