{
    let createPost = function(){
                    let newPostForm =  $("#feed-posts");

                    newPostForm.submit(function(event){
                        event.preventDefault();

                        $.ajax({
                            type: 'post',
                            url: '/posts/create-post',
                            data: newPostForm.serialize(),
                            success: function(data){
                                console.log(data);
                                let newPost = newPostDom(data.data.post);
                                $('#post-list-container>ul').prepend(newPost);
                               
                               let deleteLink = $(`#post-${data.data.post._id}`).find('.delete-post-button')[0];
                                deletePost(deleteLink);
                                $('#post-content').val("");
                                new PostComments(data.data.post._id);
                                new Like(data.data.post._id, "Post");
                            },
                            error: function(err){
                                console.log(err.responseText);
                            }
                        });
                    });
                };

    let newPostDom = function(post){
                        return (`<li id="post-${post._id}">
                        <div class="delete-button">
                        <a href="/posts/delete-post/?id=${post._id}" type="submit" class="delete-post-button">x</a>
                        </div>
                        <small>
                                ${post.user.name}
                        </small>
                        <p>
                            ${post.content}
                        </p>
                        <a href="/posts/toggle-like/?id=${post._id}&type=Post" id="like-post-${post._id}" type="submit" class="like-button">
                            <span class="material-symbols-outlined">
                            favorite
                            </span>
                        </a>
                        <ul id= 'post-comment-${post._id}'>
                            
                        </ul>
                        <div>
                        <form id="post-${ post._id }-comments-form" action="/posts/add-comment" method="post">
                                <input type="text" name="content" id="comment-content" placeholder="write a comment..." required>
                                <input class="create-button" type="submit" value="+">
                                <input type="hidden" name="post" value="${post._id}">
                        </form> 
                        </div>
                    </li>`);
                        };


    let deletePost = function(deleteLink){
        console.log(deleteLink);
        $(deleteLink).on('click', function(e){
            e.preventDefault();
            console.log(deleteLink);
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }
    $('#post-list-container>ul>li').each(function(){

        deletePost($(this).find('.delete-post-button'));

        let postId = $(this).prop('id').split("-")[1];
        new PostComments(postId);
        new Like(postId, "Post");
    })
    createPost();
}