def show_signinout
  if session[:user_id]
    "<a class='signout' href='/signout'>Sign out</a>"
  else
    "<a class='signin' href='/'>Sign in</a>"
  end
end
