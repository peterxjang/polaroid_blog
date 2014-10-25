class CreateTables < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_hash
      t.text :canvas_state
    end
    create_table :posts do |t|
      t.string :title
      t.text :body
      t.string :image
      t.belongs_to :user
    end
    create_table :tags do |t|
      t.string :text
    end
    create_table :post_tags do |t|
      t.belongs_to :post
      t.belongs_to :tag
    end
  end
end
