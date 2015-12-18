class CreateHolidays < ActiveRecord::Migration
  def change
    create_table :holidays do |t|
      t.integer :country_id
      t.date :holiday_date
      t.string :description

      t.timestamps null: false
    end
  end
end
