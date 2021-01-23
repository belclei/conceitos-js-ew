const { describe, it, before, afterEach } = require('mocha')
const assert = require('assert')
const { createSandbox, stub } = require('sinon')
const Request = require('../src/request')
const Events = require('events')

describe('Request helpers', () => {
  const timeout = 15
  let sandbox
  let request

  before(() => {
    sandbox = createSandbox()
    request = new Request()
  })
  afterEach(() => sandbox.restore())

  it(`should throw a timeout when a function has spent more then ${timeout} ms`, async () => {
    const exceededTimeout = timeout + 10
    sandbox.stub(request, request.get.name)
      .callsFake(() => new Promise(r => setTimeout(r, exceededTimeout)))

    const call = request.makeRequest({ url: 'https://testing.com', method: 'get', timeout })
    await assert.rejects(call, { message: 'timeout at [https://testing.com] :(' })
  })

  it('should return ok when promise time is ok', async () => {
    const expected = { ok: 'OK' }

    sandbox.stub(request, request.get.name)
      .callsFake(async () => {
        await new Promise(r => setTimeout(r))
        return expected
      })

    const call = () => request.makeRequest({ url: 'https://testing.com', method: 'get', timeout })
    await assert.doesNotReject(call())
    assert.deepStrictEqual(await call(), expected)
  })
  it('should return a JSON object after a request', async () => {
    const data = [
      Buffer.from('{"ok": '),
      Buffer.from('"OK'),
      Buffer.from('"}'),
    ]
    const responseEvent = new Events()
    const httpEvent = new Events()

    const https = require('https')
    sandbox
      .stub(https, https.get.name)
      .yields(responseEvent)
      .returns(httpEvent)

    const expected = { ok: 'OK' }
    const pendingPrimise = request.get('https://testing.com')

    responseEvent.emit('data', data[0])
    responseEvent.emit('data', data[1])
    responseEvent.emit('data', data[2])
    responseEvent.emit('end')

    const result = await pendingPrimise
    assert.deepStrictEqual(result, expected)
  })
})