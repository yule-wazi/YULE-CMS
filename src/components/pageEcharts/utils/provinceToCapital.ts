// 定义省份类型
interface Province {
  province: string
  capital: string
}

// 中国省份及省会数组
const provinces: Province[] = [
  // 直辖市
  { province: '北京市', capital: '北京' },
  { province: '天津市', capital: '天津' },
  { province: '上海市', capital: '上海' },
  { province: '重庆市', capital: '重庆' },

  // 省
  { province: '河北省', capital: '石家庄' },
  { province: '山西省', capital: '太原' },
  { province: '辽宁省', capital: '沈阳' },
  { province: '吉林省', capital: '长春' },
  { province: '黑龙江省', capital: '哈尔滨' },
  { province: '江苏省', capital: '南京' },
  { province: '江苏省', capital: '苏州' },
  { province: '浙江省', capital: '杭州' },
  { province: '浙江省', capital: '宁波' },
  { province: '安徽省', capital: '合肥' },
  { province: '福建省', capital: '福州' },
  { province: '江西省', capital: '南昌' },
  { province: '山东省', capital: '济南' },
  { province: '河南省', capital: '郑州' },
  { province: '湖北省', capital: '武汉' },
  { province: '湖南省', capital: '长沙' },
  { province: '广东省', capital: '广州' },
  { province: '海南省', capital: '海口' },
  { province: '四川省', capital: '成都' },
  { province: '贵州省', capital: '贵阳' },
  { province: '云南省', capital: '昆明' },
  { province: '陕西省', capital: '西安' },
  { province: '甘肃省', capital: '兰州' },
  { province: '青海省', capital: '西宁' },
  { province: '台湾省', capital: '台北' },

  // 自治区
  { province: '内蒙古自治区', capital: '呼和浩特' },
  { province: '广西壮族自治区', capital: '南宁' },
  { province: '西藏自治区', capital: '拉萨' },
  { province: '宁夏回族自治区', capital: '银川' },
  { province: '新疆维吾尔自治区', capital: '乌鲁木齐' },

  // 特别行政区
  { province: '香港特别行政区', capital: '香港' },
  { province: '澳门特别行政区', capital: '澳门' }
]

export default function provinceToCapital(addressList: any) {
  addressList.forEach((item: any) => {
    for (const i of provinces) {
      if (i.capital === item.name) {
        item.name = i.province
        return
      }
    }
  })
  return addressList
}
