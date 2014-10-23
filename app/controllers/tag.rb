before '/tags/*' do
  redirect '/' if !User.find_by_id(session[:user_id])
end

get '/tags/:tag_id' do
  @user = User.find_by_id(session[:user_id])
  @tag = Tag.find_by_id(params[:tag_id])
  @posts = []
  @user.posts.each do |post|
    post.tags.each do |tag|
      @posts << post if tag.text == @tag.text
    end
  end
  @posts.uniq!
  erb :'tags/index'
end
