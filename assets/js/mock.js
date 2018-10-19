(function(data){
    data.menu_list = [
        {
            name: '数据魔方',
            index: '1',
            icon: 'el-icon-location',
            id: 1,
            children:[
                {
                    name:'数据统计',
                    index:'1-1',
                    icon:'el-icon-location',
                    id:8,
                    parent_id:1,
                    href:'statistic.html',
                }
            ]
        },
        {
            name: '新闻',
            index: '2',
            icon: 'el-icon-location',
            id: 2,
            children: [
                {
                    name: '轮播图管理',
                    index: '2-1',
                    id: 9,
                    parent_id: 2,
                    href: 'banner.html'
                },
                {
                    name: '文章管理',
                    index: '2-2',
                    id: 10,
                    parent_id: 2,
                    href: 'news.html'
                }
            ],
        },
        {
            name: '党建',
            index: '3',
            icon: 'el-icon-location',
            id: 3,
            children: [
                {
                    name: '组织矩阵',
                    index: '3-1',
                    id: 11,
                    parent_id: 3,
                    href: 'matrix.html'
                },
                {
                    name: '党员管理',
                    index: '3-2',
                    id: 12,
                    parent_id: 3,
                    href: 'manage.html'
                },
                {
                    name: '党员审核',
                    index: '3-3',
                    id: 13,
                    parent_id: 3,
                    href: 'audit.html'
                },
                {
                    name: '调查问卷',
                    index: '3-4',
                    id: 14,
                    parent_id: 3,
                    href: 'research.html'
                },
                {
                    name: '党费缴纳',
                    index: '3-5',
                    id: 15,
                    parent_id: 3,
                    href: 'due.html'
                },
                {
                    name: '通知公告',
                    index: '3-6',
                    id: 16,
                    parent_id: 3,
                    href: 'inform.html'
                },
                {
                    name: '党史人物',
                    index: '3-7',
                    id: 17,
                    parent_id: 3,
                    href: 'personage.html'
                }
            ]
        },
        {
            name: '党课学习',
            index: '4',
            icon: 'el-icon-location',
            id: 4,
            children: [
                {
                    name: '在线考试',
                    index: '4-1',
                    id: 18,
                    parent_id: 4,
                    href: 'test.html'
                },
                {
                    name: '三会一课',
                    index: '4-2',
                    id: 19,
                    parent_id: 4,
                    href: 'lesson.html'
                },
                {
                    name: '线上党课',
                    index: '4-3',
                    id: 20,
                    parent_id: 4,
                    href: 'online.html'
                }
            ],
        },
        {
            name: '政务',
            index: '5',
            icon: 'el-icon-location',
            id: 5,
            children: [
                {
                    name: '城市概况',
                    index: '5-1',
                    id: 21,
                    parent_id: 5,
                    href: 'city.html'
                },
                {
                    name: '服务大厅',
                    index: '5-2',
                    id: 22,
                    parent_id: 5,
                    href: 'hall.html'
                },
                {
                    name: '有问必答',
                    index: '5-3',
                    id: 23,
                    parent_id: 5,
                    href: 'qa.html'
                },
                {
                    name: '缴费订单',
                    index: '5-4',
                    id: 24,
                    parent_id: 5,
                    href: 'order.html'
                }
            ],
        },
        {
            name: '民生',
            index: '6',
            icon: 'el-icon-location',
            id: 6,
            children: [
                {
                    name: '居民管理',
                    index: '6-1',
                    id: 25,
                    parent_id: 6,
                    href: 'resident.html'
                },
                {
                    name: '志愿者活动',
                    index: '6-2',
                    id: 26,
                    parent_id: 6,
                    href: 'volunteer.html'
                },
                {
                    name: '社区活动',
                    index: '6-3',
                    id: 27,
                    parent_id: 6,
                    href: 'community.html'
                },
                {
                    name: '律师&心里咨询',
                    index: '6-4',
                    id: 28,
                    parent_id: 6,
                    href: 'lawyer.html'
                },
            ],
        },
        {
            name: '意见反馈',
            index: '7',
            icon: 'el-icon-location',
            id: 7,
            children:[
                {
                    name: '每日签到',
                    index: '7-1',
                    id: 29,
                    parent_id: 7,
                    href: 'signin.html'
                },
                {
                    name: '意见反馈',
                    index: '7-2',
                    id: 30,
                    parent_id: 7,
                    href: 'idea.html'
                },
                {
                    name: '系统图片',
                    index: '7-3',
                    id: 31,
                    parent_id: 7,
                    href: 'os.html'
                }
            ]
        }
    ];
}(window.data = {}));