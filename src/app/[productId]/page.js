// Query parameters: { productId: '1' }
import React from 'react';
import ProductPage from '@/components/ProductDetails';

function ProductDetails({params}) {
    return (
        <div>
            <ProductPage id={params.productId}/>
        </div>
    );
}

export default ProductDetails;