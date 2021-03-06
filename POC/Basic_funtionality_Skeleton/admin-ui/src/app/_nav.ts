import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-globe',
  },
  {
    title: true,
    name: 'Features'
  },
  {
    name: 'Products',
    url: '/product',
    icon: 'icon-bag',
    children: [
      {
        name: 'Category',
        url: '/product/category',
        icon: 'icon-list'
      },
      {
        name: 'Products list',
        url: '/product/product-list',
        icon: 'icon-basket'
      },
      {
        name: 'Manage Category',
        url: '/product/manage-category',
        icon: 'icon-pencil'
      },
      {
        name: 'Manage Product',
        url: '/product/manage-product',
        icon: 'icon-pencil'
      }
    ]
  },
  {
    name: 'Sales',
    url: '/sales',
    icon: 'icon-wallet',
    children: [
      {
        name: 'Orders',
        url: '/sales/orders',
        icon: 'icon-basket'
      },
      {
        name: 'Approval',
        url: '/sales/approval',
        icon: 'icon-note'
      }
    ]
  },
  {
    name: 'Coupons',
    url: '/coupon',
    icon: 'icon-magic-wand',
    children: [
      {
        name: 'Manage',
        url: '/coupon/coupon',
        icon: 'icon-list'
      },
      {
        name: 'Create',
        url: '/coupon/createCoupon',
        icon: 'icon-plus'
      }
    ]
  },
  {
    name: 'Employee Actions',
    url: '/employee',
    icon: 'icon-people',
    children: [
      {
        name: 'Manage Employee',
        url: '/employee/employee',
        icon: 'icon-user-follow'
      },
      {
        name: 'Onboard Employee',
        url: '/employee/OnboardEmployee',
        icon: 'icon-user-follow'
      },
      {
        name: 'Employee Permissions',
        url: '/employee/EmployeePermissions',
        icon: 'icon-user-following'
      },
    ]
  },
  {
    name: 'Report',
    url: '/report',
    icon: 'icon-chart',
    badge: {
        variant: 'info',
        text: 'V2'
    }
  },
  {
    name: 'Invoice Template',
    url: '/invoice-template',
    icon: 'icon-doc'
  },
  {
    name: 'Media',
    url: '/media',
    icon: 'icon-film'
  }
];
