before '/posts/*' do
  redirect '/' if !User.find_by_id(session[:user_id])
end

get '/posts' do
  @user = User.find_by_id(session[:user_id])
  redirect '/' if !@user
  @posts = @user.posts
  erb :'posts/index'
end

get '/posts/new' do
  # @user = User.find_by_id(session[:user_id])
  # @post = @user.posts.find_by_id(params[:post_id])
  # @tags = @post.tags
  @post = Post.new
  @tags = @post.tags
  erb :'posts/new'
end

get '/posts/:post_id/edit' do
  @user = User.find_by_id(session[:user_id])
  @post = @user.posts.find_by_id(params[:post_id])
  @tags = @post.tags
  erb :'posts/edit'
end

get '/posts/:post_id' do
  @user = User.find_by_id(session[:user_id])
  @post = @user.posts.find_by_id(params[:post_id])
  @tags = @post.tags
  erb :'posts/show'
end

post '/posts' do
  @user = User.find_by_id(session[:user_id])
  @post = @user.posts.create(title: params[:title], body: params[:body])
end

put '/posts/:post_id' do
  @user = User.find_by_id(session[:user_id])
  @post = @user.posts.find_by_id(params[:post_id])
  @tags = @post.tags
  @post.update_attributes(params[:post])
  if @post.valid?
    redirect "/posts/#{@post.id}"
  else
    @message = @post.errors.full_messages.join('\n') #"Invalid entries!"
    erb :'posts/edit'
  end
end
