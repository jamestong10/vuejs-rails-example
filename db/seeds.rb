# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Employee.create(name: 'test1', email: 'ab1@a.b', manager: false)
Employee.create(name: 'test2', email: 'ab2@a.b', manager: false)
Employee.create(name: 'test3', email: 'ab3@a.b', manager: true)
