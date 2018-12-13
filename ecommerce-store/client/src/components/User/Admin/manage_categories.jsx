import React from 'react';
import UserLayout from '../../../hoc/user';
import ManageBrands from './manage_brands';
import ManageDetail from './manage_detail';

const ManageCategories = () => {
    return (
        <UserLayout>
            <ManageBrands />
            <ManageDetail />
        </UserLayout>
    );
};

export default ManageCategories;