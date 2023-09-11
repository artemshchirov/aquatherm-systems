'use client';

import { usePathname } from 'next/navigation';
import { toast } from 'react-toastify';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useStore } from 'effector-react';
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck';
import { IQueryParams } from '@/types/catalog';
import { $product, setProduct } from '@/context/product';
import { getProductFx } from '@/app/api/products';
import ProductPage from '@/components/templates/ProductPage/ProductPage';
import Custom404 from '@/app/404';
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs';

function CatalogProductPage({ params }: { params: IQueryParams }) {
  const { shouldLoadContent } = useRedirectByUserCheck();
  const product = useStore($product);
  const [error, setError] = useState(false);

  const getDefaultTextGenerator = useCallback(
    (subpath: string) => subpath.replace('catalog', 'Catalog'),
    [],
  );
  const getTextGenerator = useCallback(() => () => product.name, [product]);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productData = await getProductFx(`/products/find/${params.productId}`);

        if (!productData) {
          setError(true);
          return;
        }

        setProduct(productData);
      } catch (error) {
        toast.error((error as Error).message);
      }
    };

    loadProduct();
  }, [params.productId]);

  return (
    <>
      {error ? (
        <Custom404 />
      ) : (
        shouldLoadContent && (
          <>
            <Breadcrumbs
              getDefaultTextGenerator={getDefaultTextGenerator}
              getTextGenerator={getTextGenerator}
            />
            <ProductPage />
            <div className="overlay" />
          </>
        )
      )}
    </>
  );
}

export default CatalogProductPage;
