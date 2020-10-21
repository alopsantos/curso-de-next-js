//import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import SEO from "@/components/SEO";
import { client } from "@/lib/prismic";
import Prismic from "prismic-javascript";
import { Document } from "prismic-javascript/types/documents";
import Link from "next/link";
import PrismicDom from "prismic-dom";
import { Title } from "../styles/pages/Home";

interface HomeProps {
  recomendedProducts: Document[];
}

export default function Home({ recomendedProducts }: HomeProps) {
  // const [recomendedProducts, setRecomendedProducts] = useState<IProduct[]>([]);

  // useEffect(() => {
  //   fetch(`${process.env.API_URL}/recomended`).then((response) => {
  //     response.json().then((data) => {
  //       setRecomendedProducts(data);
  //     });
  //   });
  // }, []);

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
          {recomendedProducts.map(recomendedProduct => {
            return (
              <li key={recomendedProduct.id}>
                <Link href={`/catalog/products/${recomendedProduct.uid}`}>
                  <a>
                    {PrismicDom.RichText.asText(recomendedProduct.data.title)}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  // const response = await fetch(`${process.env.API_URL}/recomended`);
  // const recomendedProducts = await response.json();

  // return {
  //   props:{
  //     recomendedProducts
  //   }
  // }

  const recomendedProducts = await client().query([
    Prismic.Predicates.at("document.type", "product"),
  ]);

  return {
    props: {
      recomendedProducts: recomendedProducts.results,
    },
  };
};
