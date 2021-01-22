
// IIFE - Immediately Invoked Function Expression
(() => {

  const BT_REINICIAR = 'btReiniciar'
  const ID_CONTADOR = 'contador'
  const VALOR_INICIAL = 100
  const PERIODO_INTERVALO = 10

  class Contador {
    constructor() {
      this.inicializar()
    }

    prepareContadorProxy() {
      const handler = {
        set: (currentContext, propertyKey, newValue) => {
          console.log({ currentContext, propertyKey, newValue })
          if (!currentContext.valor) {
            currentContext.efetuarParada()
          }
          currentContext[propertyKey] = newValue
          return true
        }
      }

      const contadorProxy = new Proxy({
        valor: VALOR_INICIAL,
        efetuarParada: () => {

        }
      }, handler)

      return contadorProxy
    }

    updateText = ({ elementoContador, contador }) => () => {
      const idText = '$$contador'
      const defaultText = `Começando em <strong>${idText}</strong> segundos...`

      elementoContador.innerHTML = defaultText.replace(idText, contador.valor--)
    }
    agendarParadaContador({ elementoContador, idInterval }) {
      return () => {
        clearInterval(idInterval)
        elementoContador.innerHTML = ''
        this.desabilitarBotao(false)
      }
    }
    prepararBotao(elementoBotao, iniciarFn) {
      elementoBotao.addEventListener('click', iniciarFn.bind(this))
      return (valor = true) => {
        const atributo = 'disabled'
        elementoBotao.removeEventListener('click', iniciarFn.bind(this))

        if (valor) {
          elementoBotao.setAttribute(atributo, valor)
          return
        }

        elementoBotao.removeAttribute(atributo)
      }
    }
    inicializar() {
      console.log('inicializoooouu....')

      const elementoContador = document.getElementById(ID_CONTADOR)

      const contador = this.prepareContadorProxy()
      const argumentos = {
        elementoContador,
        contador
      }

      const fn = this.updateText(argumentos)
      const idInterval = setInterval(fn, PERIODO_INTERVALO)

      {
        const elementoBotao = document.getElementById(BT_REINICIAR)
        const desabilitarBotao = this.prepararBotao(elementoBotao, this.inicializar)
        desabilitarBotao()

        const argumentos = { elementoContador, idInterval }
        const pararContadorFn = this.agendarParadaContador.apply({ desabilitarBotao }, [argumentos])
        contador.efetuarParada = pararContadorFn

      }
    }
  }

  window.Contador = Contador
})()
