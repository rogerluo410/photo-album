class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.string :photo_name
      t.text   :photo_desc
      t.string :photo_addr
      t.string :photo_code

      t.timestamps
    end
  end
end
