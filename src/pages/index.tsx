import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { Title } from '../styles/pages/Home'
import SEO from '@/components/SEO'
import { client } from '@/lib/prismic'
import Prismic from 'prismic-javascript'
import { Document } from 'prismic-javascript/types/documents'
import PrismicDom from 'prismic-dom'

interface HomeProps {
  recomendedProducts: Document[]
}

export default function Home({ recomendedProducts }: HomeProps) {
  return (
    <div>
      <SEO
        title="Dev Commerce, your best e-commerce!"
        shouldExcludeTitleSuffix
        image="boost.png"
      />

      <section>
        <Title>Products</Title>

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
  return {
    props: {
      recomendedProducts: recomendedProducts.results,
    },
  }
}
