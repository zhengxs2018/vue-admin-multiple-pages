/* eslint-disable @typescript-eslint/no-var-requires */
const { treeToRowData } = require('../utils/table')

module.exports = treeToRowData([
  {
    text: '博客',
    children: [
      {
        text: '文章',
        path: '/blog/posts'
      },
      {
        text: '栏目',
        path: '/blog/columns'
      },
      {
        text: '专题',
        path: '/blog/topics'
      },
      {
        text: '评论',
        path: '/blog/comments'
      }
    ]
  },
  {
    text: '用户',
    children: [
      {
        text: '所有用户',
        path: '/users'
      },
      {
        text: '黑名单',
        path: '/users/blacklist'
      }
    ]
  },
  {
    text: '应用',
    children: [
      {
        text: '应用市场',
        path: '/apps/index'
      },
      {
        text: '投票活动',
        path: '/apps/polls'
      }
    ]
  },
  {
    text: '设置',
    path: '/options/general',
    children: [
      {
        text: '常规设置',
        path: '/options/general'
      },
      {
        text: '菜单设置',
        path: '/options/menus'
      },
      {
        text: '撰写设置',
        path: '/options/writing'
      },
      {
        text: '阅读设置',
        path: '/options/reading'
      },
      {
        text: '讨论设置',
        path: '/options/discussion'
      },
      {
        text: '媒体设置',
        path: '/options/media'
      },
      {
        text: '分享设置',
        path: '/options/sharing'
      },
      {
        text: '通知设置',
        path: '/options/notice'
      },
      {
        text: 'webhooks',
        path: '/options/webhooks'
      }
    ]
  }
])
