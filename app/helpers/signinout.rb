def show_signinout
  if session[:user_id]
    username = User.find_by_id(session[:user_id]).username
    "<div class='signout' >Welcome #{username} <a href='/signout'>Sign out</a></div>"
  # else
  #   "<a class='signin' href='/'>Sign in</a>"
  end
end
