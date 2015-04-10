# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)



Photo.create(:photo_name => "photo1", :photo_addr => "./photo1.jpg", :photo_desc => "test photo1")
Photo.create(:photo_name => "photo2", :photo_addr => "./photo2.jpg", :photo_desc => "test photo2")
Photo.create(:photo_name => "photo3", :photo_addr => "./photo3.jpg", :photo_desc => "test photo3")

Comment.create(:comment_content => "beautiful",:photo_id => Photo.first.id)
Comment.create(:comment_content => "not bad",:photo_id => Photo.find(2).id )