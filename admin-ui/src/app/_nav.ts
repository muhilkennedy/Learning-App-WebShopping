import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    // badge: {
    //   variant: 'info',
    //   text: 'NEW'
    // }
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
        icon: 'icon-puzzle'
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
    icon: 'icon-globe',
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
    icon: 'icon-magic-wand'
  },
  {
    name: 'Onboard Employee',
    url: '/add-employee',
    icon: 'icon-user-follow'
  },
  {
    name: 'User Permissions',
    url: '/user-permissions',
    icon: 'icon-user-following'
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
