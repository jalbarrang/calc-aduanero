import { useMemo, useState } from 'react'
import './App.css'

function formatNumberUSD(value: number) {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

const TAX_THRESHOLD = 41 as const;

function App() {
  const [productValue, setProductValue] = useState(0)

  const adValorem = useMemo(() => {
    if (productValue <= TAX_THRESHOLD) return 0
    return productValue * 0.06
  }, [productValue])

  const productIva = useMemo(() => {
    if (productValue <= TAX_THRESHOLD) return 0
    return (productValue + adValorem) * 0.19
  }, [productValue, adValorem]);

  const totalTax = useMemo(() => {
    return adValorem + productIva
  }, [adValorem, productIva]);

  return (
    <>
      <header>
        <h2>Calculadora Impuesto Aduanero</h2>
      </header>

      <main>
        <div className='wrapper'>
          <div className='form-group'>
            <label htmlFor="product-price">Valor producto (USD)</label>
            <div>
              <input name="product-price" value={productValue} type='number' onChange={(e) => {
                setProductValue(parseInt(e.target.value))
              }} />
            </div>
          </div>

          <div className='form-group'>
            <label>Derecho AD Valorem (6% de {formatNumberUSD(productValue)})</label>
            <div>{formatNumberUSD(adValorem)}</div>
          </div>

          <div className='form-group'>
            <label>IVA (19% sobre {formatNumberUSD(productValue + adValorem)})</label>
            <div>{formatNumberUSD(productIva)}</div>
          </div>

          <hr />

          <div className='form-group'>
            <label>Total impuestos a pagar</label>
            <div className='total'>{formatNumberUSD(totalTax)}</div>
          </div>

          <div className='form-group'>
            <label>Valor total del producto</label>
            <div className='total'>{formatNumberUSD(productValue + totalTax)}</div>
          </div>
        </div>
      </main>

      <footer>
        <small>Fuentes: </small>
        <ul>
          <li><a href="https://www.aduana.cl/tips-compradoronlineexperto/aduana/2018-12-13/171734.html" target='_blank'>TIPS #CompradorOnlineExperto</a></li>
          <li><a href="https://www.aduana.cl/compras-por-internet-en-el-extranjero-lo-que-debo-saber/aduana/2018-12-12/133921.html" target='_blank'>Compras por internet en el extranjero: lo que debo saber</a></li>
          <li><a href="https://www.aduana.cl/aduana/site/artic/20181212/pags/20181212233227.html" target='_blank'>¿Cuándo debo pagar Impuestos?</a></li>
        </ul>

        <span>
          by <a href="https://github.com/jalbarrang" target='_blank'>jalbarrang</a> 2023
        </span>
      </footer>
    </>
  )
}

export default App
