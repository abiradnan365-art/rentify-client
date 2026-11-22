import { requireRole } from '@/lib/core/server';
import React from 'react';

const OwnerDashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    await requireRole("owner"); // Ensure the user has the "owner" role before rendering the layout
    return children;

};

export default OwnerDashboardLayout;