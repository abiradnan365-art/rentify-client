import { requireRole } from '@/lib/core/server';
import React from 'react';

const AdminDashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    await requireRole("admin"); // Ensure the user has the "admin" role before rendering the layout

    return children;
};
export default AdminDashboardLayout;