get '/' do
  if User.find_by_id(session[:user_id])
    redirect '/posts'
  else
    erb :'sessions/new'
  end
  # erb :'posts/posts_polariod'
end

post '/sessions' do
  user = User.authenticate(params[:username], params[:password])
  if user
    session[:user_id] = user.id
    redirect '/posts'
  else
    @message_signin = "Incorrect email or password!"
    erb :'sessions/new'
  end
end

post '/users' do
  user = User.new(username: params[:username], password: params[:password])
  if user.valid?
    session[:user_id] = user.id
    redirect '/posts'
  else
    @message_signup = "Invalid email or password!"
    erb :'sessions/new'
  end
end


get '/signout' do
  session.delete(:user_id)
  redirect '/'
end
