get '/' do
  # erb :'sessions/new'
  erb :'posts/posts_polariod'
end

post '/sessions' do
  user = User.authenticate(params[:username], params[:password])
  if user
    session[:user_id] = user.id
    redirect '/posts'
  else
    @message = "Incorrect email or password!"
    erb :'sessions/new'
  end
end

get '/signout' do
  session.delete(:user_id)
  redirect '/'
end
