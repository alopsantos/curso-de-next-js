import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";

//import Iconloading from '../../../assets/img/loading.svg';

interface IProduct {
  id: string;
  title: string;
}

interface CategoryProps {
  products: IProduct[];
}

export default function Category({ products }: CategoryProps) {
  const router = useRouter();
  
  if(router.isFallback){
    return (<h1>Carregando ...</h1>)
  }

  return (
    <div>
      <h1>{router.query.slug}</h1>
      <ul>
        {products.map((product) => {
          return <li key={product.id}>{product.title}</li>;
        })}
      </ul>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`${process.env.API_URL}/categories`);
  const categories = await response.json();

  const paths = categories.map((category) => {
    return {
      params: { slug: category.id },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<CategoryProps> = async (
  context
) => {
  const { slug } = context.params;

  const response = await fetch(
    `${process.env.API_URL}/products?category_id=${slug}`
  );
  const products = await response.json();
  return {
    props: {
      products,
    },
    revalidate: 60,
  };
};
