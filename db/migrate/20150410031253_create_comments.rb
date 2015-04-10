class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text :comment_content
      t.integer :photo_id

      t.timestamps
    end
  end
end
