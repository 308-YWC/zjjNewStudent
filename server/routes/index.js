const express = require('express');
const router = express.Router();

// 学校信息数据
const schoolInfo = {
  name: '张家界航空工业职业技术学院',
  englishName: 'Zhangjiajie Aviation Industry Vocational and Technical College',
  established: '2001年',
  location: '湖南省张家界市',
  address: '中国湖南张家界市武陵山大道学院路1号',
  phone: '0744-8255163',
  website: 'https://www.zjjhy.edu.cn/',
  description: '张家界航空工业职业技术学院是经湖南省人民政府批准，国家教育部备案的全日制普通高等职业院校。学院坐落在世界著名的旅游胜地张家界市，环境优美，交通便利。',
  features: [
    '国家级示范性高职院校建设单位',
    '湖南省示范性高职院校',
    '全国职业教育先进单位',
    '湖南省文明高校'
  ]
};

// 专业信息 - 根据学校官网最新招生专业更新
const majors = [
  // 航空制造学院
  {
    id: 1,
    category: '航空制造类',
    name: '飞行器数字化制造技术',
    description: '培养掌握飞行器制造工艺、数字化制造技术，从事飞行器零部件制造、装配、检测等工作的高素质技术技能人才',
    duration: '3年',
    employment: '航空制造企业、飞机装配企业、航空零部件制造企业',
    college: '航空制造学院',
    code: '460601'
  },
  {
    id: 2,
    category: '航空制造类',
    name: '数控技术',
    description: '培养掌握数控编程、数控设备操作与维护、产品质量检测等技能的高素质技术技能人才',
    duration: '3年',
    employment: '制造业、机械加工企业、数控设备制造企业',
    college: '航空制造学院',
    code: '460103'
  },
  {
    id: 3,
    category: '航空制造类',
    name: '机械制造及自动化',
    description: '培养从事机械产品制造、设备维护、生产管理等工作的高素质技术技能人才',
    duration: '3年',
    employment: '机械制造企业、自动化设备企业、生产管理部门',
    college: '航空制造学院',
    code: '460104'
  },
  {
    id: 4,
    category: '航空制造类',
    name: '模具设计与制造',
    description: '培养从事模具设计、制造、维修和管理等工作的高素质技术技能人才',
    duration: '3年',
    employment: '模具制造企业、汽车制造企业、家电制造企业',
    college: '航空制造学院',
    code: '460113'
  },
  
  // 航空维修学院
  {
    id: 5,
    category: '航空维修类',
    name: '飞机机电设备维修',
    description: '培养从事飞机机电设备维修、检测、管理等工作的高素质技术技能人才',
    duration: '3年',
    employment: '航空公司、机场、航空维修企业、飞机制造企业',
    college: '航空维修学院',
    code: '500409'
  },
  {
    id: 6,
    category: '航空维修类',
    name: '飞机电子设备维修',
    description: '培养从事飞机电子设备维修、检测、管理等工作的高素质技术技能人才',
    duration: '3年',
    employment: '航空公司、航空维修企业、飞机电子设备制造企业',
    college: '航空维修学院',
    code: '500410'
  },
  {
    id: 7,
    category: '航空维修类',
    name: '无人机应用技术',
    description: '培养从事无人机装配、调试、维护、操控及应用等工作的高素质技术技能人才',
    duration: '3年',
    employment: '无人机制造企业、航拍公司、农业植保企业、测绘公司',
    college: '航空维修学院',
    code: '460609'
  },
  
  // 航空电气学院
  {
    id: 8,
    category: '航空电气类',
    name: '航空电子电气技术',
    description: '培养从事航空电子电气设备安装、调试、维修等工作的高素质技术技能人才',
    duration: '3年',
    employment: '航空制造企业、航空维修企业、电子设备制造企业',
    college: '航空电气学院',
    code: '500411'
  },
  {
    id: 9,
    category: '航空电气类',
    name: '电气自动化技术',
    description: '培养从事电气设备安装、调试、维护、管理等工作的高素质技术技能人才',
    duration: '3年',
    employment: '制造业、电力行业、自动化设备企业',
    college: '航空电气学院',
    code: '460306'
  },
  {
    id: 10,
    category: '航空电气类',
    name: '工业机器人技术',
    description: '培养从事工业机器人设备安装、编程、调试、维护等工作的高素质技术技能人才',
    duration: '3年',
    employment: '智能制造企业、机器人制造企业、自动化集成企业',
    college: '航空电气学院',
    code: '460305'
  },
  {
    id: 11,
    category: '航空电气类',
    name: '机电一体化技术',
    description: '培养从事机电设备安装、调试、维护、管理等工作的高素质技术技能人才',
    duration: '3年',
    employment: '制造业、机电设备企业、自动化企业',
    college: '航空电气学院',
    code: '460301'
  },
  
  // 航空管理学院
  {
    id: 12,
    category: '航空管理类',
    name: '空中乘务',
    description: '培养具有良好职业道德、较强服务意识和英语应用能力的空中乘务人员',
    duration: '3年',
    employment: '航空公司、机场、高铁、邮轮等交通运输企业',
    college: '航空管理学院',
    code: '500405'
  },
  {
    id: 13,
    category: '航空管理类',
    name: '民航安全技术管理',
    description: '培养从事民航安全检查、安全管理等工作的高素质技术技能人才',
    duration: '3年',
    employment: '机场安检、航空公司、民航局、海关等',
    college: '航空管理学院',
    code: '500406'
  },
  {
    id: 14,
    category: '航空管理类',
    name: '民航运输服务',
    description: '培养从事民航运输服务、客票销售、货运代理等工作的高素质技术技能人才',
    duration: '3年',
    employment: '航空公司、机场、民航运输企业、货运代理企业',
    college: '航空管理学院',
    code: '500401'
  },
  {
    id: 15,
    category: '航空管理类',
    name: '航空物流管理',
    description: '培养从事航空物流管理、货运代理、供应链管理等工作的高素质技术技能人才',
    duration: '3年',
    employment: '航空物流企业、货运代理企业、供应链管理企业',
    college: '航空管理学院',
    code: '530802'
  },
  
  // 信息技术学院
  {
    id: 16,
    category: '信息技术类',
    name: '计算机应用技术',
    description: '培养从事计算机系统维护、软件开发、网络管理等工作的高素质技术技能人才',
    duration: '3年',
    employment: 'IT企业、政府机关、事业单位、互联网企业',
    college: '信息技术学院',
    code: '510201'
  },
  {
    id: 17,
    category: '信息技术类',
    name: '软件技术',
    description: '培养从事软件开发、测试、维护、技术支持等工作的高素质技术技能人才',
    duration: '3年',
    employment: '软件企业、IT公司、互联网企业、金融机构',
    college: '信息技术学院',
    code: '510203'
  },
  {
    id: 18,
    category: '信息技术类',
    name: '大数据技术',
    description: '培养从事大数据采集、处理、分析、应用等工作的高素质技术技能人才',
    duration: '3年',
    employment: '大数据企业、互联网企业、金融机构、电信运营商',
    college: '信息技术学院',
    code: '510205'
  },
  {
    id: 19,
    category: '信息技术类',
    name: '电子商务',
    description: '培养从事网络营销、电商运营、跨境电商等工作的高素质技术技能人才',
    duration: '3年',
    employment: '电商企业、互联网企业、传统企业电商部门',
    college: '信息技术学院',
    code: '530701'
  },
  {
    id: 20,
    category: '信息技术类',
    name: '人工智能技术应用',
    description: '培养从事人工智能算法应用、系统集成、产品营销等工作的高素质技术技能人才',
    duration: '3年',
    employment: '人工智能企业、科技公司、智能制造企业',
    college: '信息技术学院',
    code: '510209'
  },
  
  // 旅游管理学院
  {
    id: 21,
    category: '旅游管理类',
    name: '旅游管理',
    description: '培养从事旅游服务、旅游管理、旅游策划等工作的高素质技术技能人才',
    duration: '3年',
    employment: '旅行社、景区、旅游局、文旅企业',
    college: '旅游管理学院',
    code: '540101'
  },
  {
    id: 22,
    category: '旅游管理类',
    name: '酒店管理与数字化运营',
    description: '培养从事酒店管理、数字化运营、客户服务等工作的高素质技术技能人才',
    duration: '3年',
    employment: '星级酒店、度假村、民宿、餐饮企业',
    college: '旅游管理学院',
    code: '540106'
  },
  {
    id: 23,
    category: '旅游管理类',
    name: '导游',
    description: '培养从事导游服务、旅游咨询、旅游产品策划等工作的高素质技术技能人才',
    duration: '3年',
    employment: '旅行社、景区、文化旅游企业、在线旅游平台',
    college: '旅游管理学院',
    code: '540102'
  },
  {
    id: 24,
    category: '旅游管理类',
    name: '会展策划与管理',
    description: '培养从事会展策划、组织、管理等工作的高素质技术技能人才',
    duration: '3年',
    employment: '会展公司、广告公司、酒店、政府机关',
    college: '旅游管理学院',
    code: '540112'
  },
  
  // 军士学院（定向培养军士专业）
  {
    id: 25,
    category: '军士教育类',
    name: '定向培养军士（通信技术）',
    description: '为陆军、海军、空军、火箭军、战略支援部队培养通信技术军士人才，毕业后直接分配到部队工作',
    duration: '3年',
    employment: '中国人民解放军各军种通信部门',
    college: '军士学院',
    code: '510301',
    features: ['定向培养', '免学费', '包分配', '军籍管理']
  },
  {
    id: 26,
    category: '军士教育类',
    name: '定向培养军士（电子信息工程技术）',
    description: '为各军种培养电子信息工程技术军士人才，专业从事军用电子设备维护和技术保障',
    duration: '3年',
    employment: '中国人民解放军各军种电子信息部门',
    college: '军士学院',
    code: '510101',
    features: ['定向培养', '免学费', '包分配', '军籍管理']
  },
  {
    id: 27,
    category: '军士教育类',
    name: '定向培养军士（机电一体化技术）',
    description: '为各军种培养机电一体化技术军士人才，负责军用机电设备的操作、维护和管理',
    duration: '3年',
    employment: '中国人民解放军各军种装备保障部门',
    college: '军士学院',
    code: '460301',
    features: ['定向培养', '免学费', '包分配', '军籍管理']
  },
  {
    id: 28,
    category: '军士教育类',
    name: '定向培养军士（飞机电子设备维修）',
    description: '为空军和海军航空兵培养飞机电子设备维修军士人才',
    duration: '3年',
    employment: '中国人民解放军空军、海军航空兵部队',
    college: '军士学院',
    code: '500410',
    features: ['定向培养', '免学费', '包分配', '军籍管理']
  },
  {
    id: 29,
    category: '军士教育类',
    name: '定向培养军士（飞机机电设备维修）',
    description: '为空军和海军航空兵培养飞机机电设备维修军士人才',
    duration: '3年',
    employment: '中国人民解放军空军、海军航空兵部队',
    college: '军士学院',
    code: '500409',
    features: ['定向培养', '免学费', '包分配', '军籍管理']
  }
];

// 校园生活信息
const campusLife = {
  dormitory: {
    types: ['4人间', '6人间'],
    facilities: ['空调', '热水器', '独立卫生间', '阳台', '网络'],
    cost: '800-1200元/年'
  },
  dining: {
    canteens: ['第一食堂', '第二食堂', '清真食堂'],
    features: ['菜品丰富', '价格实惠', '营养均衡'],
    avgCost: '15-25元/天'
  },
  facilities: [
    '图书馆',
    '体育馆',
    '实训中心',
    '学生活动中心',
    '医务室',
    '超市',
    '快递服务点'
  ],
  clubs: [
    '学生会',
    '社团联合会',
    '航模协会',
    '计算机协会',
    '文学社',
    '舞蹈团',
    '篮球队',
    '足球队'
  ]
};

// 入学须知
const admissionGuide = {
  documents: [
    '录取通知书',
    '身份证原件及复印件',
    '高中毕业证书',
    '户口本复印件',
    '一寸免冠照片8张',
    '团员证（如有）'
  ],
  items: [
    '个人生活用品',
    '换洗衣物',
    '学习用品',
    '常用药品',
    '银行卡'
  ],
  fees: {
    tuition: '3500-4600元/年（根据专业不同）',
    accommodation: '800-1200元/年',
    textbooks: '约500元/年',
    insurance: '100元/年'
  },
  schedule: [
    {
      date: '9月1日-2日',
      event: '新生报到',
      location: '各学院报到点'
    },
    {
      date: '9月3日-7日',
      event: '入学教育',
      location: '各班级教室'
    },
    {
      date: '9月8日-21日',
      event: '军训',
      location: '学校操场'
    },
    {
      date: '9月22日',
      event: '正式上课',
      location: '各教学楼'
    }
  ]
};

// API路由
router.get('/school-info', (req, res) => {
  res.json({ success: true, data: schoolInfo });
});

router.get('/majors', (req, res) => {
  res.json({ success: true, data: majors });
});

router.get('/majors/:category', (req, res) => {
  const category = req.params.category;
  const filteredMajors = majors.filter(major => major.category === category);
  res.json({ success: true, data: filteredMajors });
});

router.get('/campus-life', (req, res) => {
  res.json({ success: true, data: campusLife });
});

router.get('/admission-guide', (req, res) => {
  res.json({ success: true, data: admissionGuide });
});

// 获取所有专业分类
router.get('/major-categories', (req, res) => {
  const categories = [...new Set(majors.map(major => major.category))];
  res.json({ success: true, data: categories });
});

module.exports = router;