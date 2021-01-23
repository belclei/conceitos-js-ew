const { describe, it, before, afterEach } = require('mocha')
const { expect } = require('chai')
const TodoRepository = require('../src/todoRepository')
const { createSandbox } = require('sinon')

describe('todoRepository', () => {
  let todoRepository
  let sandbox
  before(() => {
    todoRepository = new TodoRepository()
    sandbox = createSandbox()
  })
  afterEach(() => {
    return sandbox.restore()
  })
  describe('methods signature', () => {
    it('should call find from lokijs', () => {
      const mockDatabase = [{
        name: 'Terezinha de Jesus',
        age: 66,
        meta: { revision: 0, created: 1611185653507, version: 0 },
        '$loki': 1
      }]
      const functionName = 'find'
      sandbox.stub(
        todoRepository.schedule,
        functionName
      ).returns(mockDatabase)

      const result = todoRepository.list()
      expect(result).to.be.deep.equal(mockDatabase)
      expect(todoRepository.schedule[functionName].calledOnce).to.be.ok
    })
    it('should call insertOne from lokijs', () => {
      const functionName = 'insertOne'
      const expectedReturn = true

      sandbox.stub(
        todoRepository.schedule,
        functionName
      ).returns(expectedReturn)

      const data = { name: 'Belclei' }
      const result = todoRepository.create(data)

      expect(result).to.be.ok
      expect(todoRepository.schedule[functionName].calledOnceWithExactly(data)).to.be.ok
    })
  })
})