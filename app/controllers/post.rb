before '/posts/*' do
  redirect '/' if !User.find_by_id(session[:user_id])
end

get '/posts' do
  @user = User.find_by_id(session[:user_id])
  redirect '/' if !@user
  @posts = @user.posts
  erb :'posts/index'
end

get '/posts_polariod' do
  @user = User.find_by_id(session[:user_id])
  redirect '/' if !@user
  @posts = @user.posts
  # puts @posts.first.image.url
  # @posts = []
  # erb :'posts/posts_polariod'
  # content_type :json
  # {points: post.points}.to_json


  json_hash = {posts: [], state: @user.canvas_state.to_json}
  @posts.each do |post|
    puts post.image.url
    json_hash[:posts] << {
      title: post.title,
      id: post.id,
      url: post.image.url
    }
  end
  content_type :json
  json_hash.to_json
end

post '/posts_polariod_state' do
  @user = User.find_by_id(session[:user_id])
  @user.canvas_state = params[:state]
  @user.save!
  puts params[:state]
  content_type :json
  {message: "Success!"}.to_json
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
  @post = @user.posts.new(title: params[:title], body: params[:body])
  @post.image = params[:filename]
  @post.save
  redirect '/posts'
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
