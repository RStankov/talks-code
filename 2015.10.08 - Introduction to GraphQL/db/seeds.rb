User.delete_all
Post.delete_all
PostMaker.delete_all

user_1 = User.create! name: 'First User', handle: 'first_user'
user_2 = User.create! name: 'Second User', handle: 'second_user'
user_3 = User.create! name: 'Third User', handle: 'third_user'
user_4 = User.create! name: 'Fourth', handle: 'fourth_user'

post_1 = Post.create! title: 'Post 1', tagline: 'Tagline #1', user: user_1
post_2 = Post.create! title: 'Post 2', tagline: 'Tagline #2', user: user_2
post_3 = Post.create! title: 'Post 3', tagline: 'Tagline #3', user: user_3
post_4 = Post.create! title: 'Post 4', tagline: 'Tagline #4', user: user_1
post_5 = Post.create! title: 'Post 5', tagline: 'Tagline #5', user: user_2
post_6 = Post.create! title: 'Post 6', tagline: 'Tagline #6', user: user_3

PostMaker.create! post: post_1, user: user_4
PostMaker.create! post: post_1, user: user_3
PostMaker.create! post: post_2, user: user_4
PostMaker.create! post: post_2, user: user_1
PostMaker.create! post: post_3, user: user_2
PostMaker.create! post: post_3, user: user_3
PostMaker.create! post: post_3, user: user_4
