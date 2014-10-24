User.delete_all
Post.delete_all
Tag.delete_all
PostTag.delete_all

usernames = ['test'] + Array.new(3) { Faker::Internet.user_name }
# tags = Array.new(4) { Faker::Lorem.word }
tags = ["silly", "funny", "serious", "work"]
usernames.each do |username|
  user = User.create!(username: username, password: "password")
  5.times do
    post = user.posts.create!(
      title: Faker::Company.catch_phrase,
      body: Faker::Lorem.paragraphs.join("\n"),
      image: File.open(File.join(APP_ROOT, 'public', 'img', '4.jpg'))
    )
    4.times do
      post.tags.create(text: tags.sample)
    end
  end
end
