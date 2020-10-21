import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { Title } from '../styles/pages/Home'
import SEO from '@/components/SEO'
import { client } from '@/lib/prismic'
import Prismic from 'prismic-javascript'
import { Document } from 'prismic-javascript/types/documents'
import PrismicDom from 'prismic-dom'

interface HomeProps {
  pagina: Document[]
  recomendedProducts: Document[]
}

export default function Home({ recomendedProducts, pagina }: HomeProps) {
  console.log(pagina[0].data);
  return (
    <div>
      <SEO
        title="Dev Commerce, your best e-commerce!"
        shouldExcludeTitleSuffix
        image="boost.png"
      />
      
      <section>
        <Title>Products</Title>
        <img src={pagina[0].data.thumbmail.url} width="100" alt=""/>
        <ul>
          {recomendedProducts.map((recomendedProduct) => {
            return (
              <li key={recomendedProduct.id}>
                <Link href={`/catalog/products/${recomendedProduct.uid}`}>
                  <a>
                    {PrismicDom.RichText.asText(recomendedProduct.data.title)}
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const recomendedProducts = await client().query([
    Prismic.Predicates.at('document.type', 'product'),
  ])
  const pagina = await client().query([
    Prismic.Predicates.at('document.type', 'pages'),
    Prismic.Predicates.fulltext('my.pages.titulo', String("Outubro Rosa"))

  ])
  return {
    props: {
      recomendedProducts: recomendedProducts.results,
      pagina: pagina.results
    },
  }
}
