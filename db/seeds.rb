User.delete_all
Post.delete_all
Tag.delete_all
PostTag.delete_all

usernames = ['test'] + Array.new(3) { Faker::Internet.user_name }
imagenames = Dir[File.join(APP_ROOT, 'public', 'img', '*.jpg')]
# tags = Array.new(4) { Faker::Lorem.word }
tags = ["silly", "funny", "serious", "work"]
usernames.each do |username|
  user = User.create!(username: username, password: "password")
  5.times do
    post = user.posts.new(
      title: Faker::Company.catch_phrase,
      body: Faker::Lorem.paragraphs.join("\n"),
    )
    post.image = File.open(imagenames.sample)
    post.save!
    4.times do
      post.tags.create(text: tags.sample)
    end
  end
end
