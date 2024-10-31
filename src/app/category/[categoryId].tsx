import React from 'react';
import { useRouter } from 'next/router';

const CategoryPage = () => {
    const router = useRouter();
    const { categoryId } = router.query;

    // Fetch and display food items based on categoryId
    return (
        <div>
            <h1>Category {categoryId}</h1>
            {/* Display food items here */}
        </div>
    );
};

export default CategoryPage; 