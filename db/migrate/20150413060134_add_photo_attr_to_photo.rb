class AddPhotoAttrToPhoto < ActiveRecord::Migration
  def change
    add_column :photos, :photo_attr, :string
    add_index :photos, :photo_attr
  end
end
