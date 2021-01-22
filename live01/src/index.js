/*
const EntityBase = require('./entityBase')

console.log(new EntityBase({ name: 'Belclei Fasolo', gender: 'male' }).name)
console.log(new EntityBase({ name: 'Xuxa da Silva', gender: 'female' }).name)
*/
const assert = require('assert')
const Employee = require('./employee')
const Manager = require('./manager')
const Util = require('./util')

const GENDER = {
  male: 'male',
  female: 'female'
}

{
  const employee = new Employee({
    name: 'Terezinha de Jesus',
    gender: GENDER.female
  })
  assert.throws(() => employee.birthYear, {
    message: 'you must define age first!'
  })
}

const CURRENT_YEAR = 2021
Date.prototype.getFullYear = () => CURRENT_YEAR

{
  const employee = new Employee({
    name: 'Terezinha de Jesus',
    gender: GENDER.female,
    age: 45
  })
  assert.deepStrictEqual(employee.name, "Ms. Terezinha de Jesus")
  assert.deepStrictEqual(employee.age, undefined)
  assert.deepStrictEqual(employee.gender, undefined)
  assert.deepStrictEqual(employee.grossPay, Util.formatCurrency(5000.40))
  assert.deepStrictEqual(employee.netPay, Util.formatCurrency(4000.32))

  const expectBithYear = 1976
  assert.deepStrictEqual(employee.birthYear, expectBithYear)

  // não tem set, não vai mudar o valor. Mas `ninguém` reclama
  employee.birthYear = new Date().getFullYear() - 80
  assert.deepStrictEqual(employee.birthYear, expectBithYear)

  employee.age = 80
  assert.deepStrictEqual(employee.birthYear, 1941)
  console.log('****************************')
  console.log('employee')
  console.log('employee.name', employee.name);
  console.log('employee.age', employee.age);
  console.log('employee.gender', employee.gender);
  console.log('employee.grossPay', employee.grossPay);
  console.log('employee.netPay', employee.netPay);
}

{
  const manager = new Manager({
    name: 'Chefe da Silva',
    gender: GENDER.male,
    age: 66
  })
  assert.deepStrictEqual(manager.name, "Mr. Chefe da Silva")
  assert.deepStrictEqual(manager.age, undefined)
  assert.deepStrictEqual(manager.gender, undefined)
  assert.deepStrictEqual(manager.birthYear, 1955)
  assert.deepStrictEqual(manager.grossPay, Util.formatCurrency(5000.40))
  assert.deepStrictEqual(manager.bonuses, Util.formatCurrency(2000))
  assert.deepStrictEqual(manager.netPay, Util.formatCurrency(6000.32))

  console.log('****************************')
  console.log('manager')
  console.log('manager.name', manager.name);
  console.log('manager.age', manager.age);
  console.log('manager.gender', manager.gender);
  console.log('manager.grossPay', manager.grossPay);
  console.log('manager.bonuses', manager.bonuses);
  console.log('manager.netPay', manager.netPay);
}