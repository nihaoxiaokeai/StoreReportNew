// tab标题
const TABTITLE = [
  {
    title: '在线销售比',
    value: '',
    show: true
  },
  {
    title: '顾客连接',
    value: '',
    show: true
  }
]

// 在线销售比表头
const STITLE = {
  sumName: 'bHReportDetailSaleSum',
  listName: 'bHReportDetailSaleList',
  title: [{
    key: 'rateQq',
    name: '累计在线销售占比'
  }, {
    key: 'rankQq',
    name: '在线销售占比排名'
  }, {
    key: 'amtOnlineQq',
    name: '累计在线销售实收(万)'
  }, {
    key: 'amtAllQq',
    name: '累计全渠道销售实收(万)'
  }, {
    key: 'amtOnlineDate',
    name: '日在线销售实收(万)'
  }, {
    key: 'amtAllDate',
    name: '日全渠道销售实收(万)'
  }] 
}

// 顾客连接表头
const CTITLE = {
  sumName: 'bHReportDetailConnectSum',
  listName: 'bHReportDetailConnectList',
  title: [{
    key: 'rateQq',
    name: '累计顾客连接'
  }, {
    key: 'rankQq',
    name: '顾客连接排名'
  }, {
    key: 'isBuyYear',
    name: '累计本年新加会员'
  }, {
    key: 'historyBindYear',
    name: '累计往年新加会员'
  }, {
    key: 'membcntYear',
    name: '累计消费会员'
  }, {
    key: 'isDayYear',
    name: '日本年新加会员'
  }, {
    key: 'historyBindDay',
    name: '日往年新加会员'
  }, {
    key: 'membcntDay',
    name: '日消费会员'
  }] 
}

export { TABTITLE, STITLE, CTITLE };
