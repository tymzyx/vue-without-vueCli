# coding=utf-8

"""
Created on 2018-01-30 @author: Sl
功能: 爬取新浪微博用户的信息及微博评论，点赞，转发
"""

import urllib2
import json

import sys
default_encoding = 'utf-8'
if sys.getdefaultencoding() != default_encoding:
    reload(sys)
    sys.setdefaultencoding(default_encoding)

# 定义要爬取的微博大V的微博ID
id = '6013611098'

# 设置代理IP
proxy_addr = "122.241.72.191:808"


# 定义页面打开函数
def use_proxy(url, proxy_addr):
    req = urllib2.Request(url)
    req.add_header("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.221 Safari/537.36 SE 2.X MetaSr 1.0")
    proxy = urllib2.ProxyHandler({'http': proxy_addr})
    opener = urllib2.build_opener(proxy, urllib2.HTTPHandler)
    urllib2.install_opener(opener)
    data = urllib2.urlopen(req).read().decode('utf-8', 'ignore')
    return data


# 获取微博主页的containerid，爬取微博内容时需要此id
def get_containerid(url):
    data = use_proxy(url, proxy_addr)
    content = json.loads(data).get('data')
    for data in content.get('tabsInfo').get('tabs'):
        if (data.get('tab_type') == 'weibo'):
            containerid = data.get('containerid')
    return containerid


# 获取微博大V账号的用户基本信息，如：微博昵称、微博地址、微博头像、关注人数、粉丝数、性别、等级等
def get_userInfo(id):
    url = 'https://m.weibo.cn/api/container/getIndex?type=uid&value=' + id
    data = use_proxy(url, proxy_addr)
    content = json.loads(data).get('data')
    profile_image_url = content.get('userInfo').get('profile_image_url')
    description = content.get('userInfo').get('description')
    profile_url = content.get('userInfo').get('profile_url')
    verified = content.get('userInfo').get('verified')
    guanzhu = content.get('userInfo').get('follow_count')
    name = content.get('userInfo').get('screen_name')
    fensi = content.get('userInfo').get('followers_count')
    gender = content.get('userInfo').get('gender')
    urank = content.get('userInfo').get('urank')
    print "微博昵称：", name, "\n", "微博主页地址：", profile_url, "\n", "微博头像地址：", profile_image_url, "\n", "是否认证：", verified, "\n", "微博说明：", description, "\n", "关注人数：", str(guanzhu), "\n", "粉丝数：", str(fensi), "\n", "性别：", gender, "\n", "微博等级：", str(urank), "\n"


# 获取微博内容信息,并保存到文本中，内容包括：每条微博的内容、微博详情页面地址、点赞数、评论数、转发数等
def get_weibo(id):
    i = 1
    while i < 3:
        url = 'https://m.weibo.cn/api/container/getIndex?type=uid&value=' + id
        weibo_url = 'https://m.weibo.cn/api/container/getIndex?type=uid&value=' + id + '&containerid=' + get_containerid(url) + '&page=' + str(i)
        try:
            data = use_proxy(weibo_url, proxy_addr)
            content = json.loads(data).get('data')
            cards = content.get('cards')
            if len(cards) > 0:
                for j in range(len(cards)):
                    print("-----正在爬取第" + str(i) + "页，第" + str(j) + "条微博------")
                    card_type = cards[j].get('card_type')
                    if card_type == 9:
                        mblog = cards[j].get('mblog')
                        attitudes_count = mblog.get('attitudes_count')
                        comments_count = mblog.get('comments_count')
                        created_at = mblog.get('created_at')
                        reposts_count = mblog.get('reposts_count')
                        scheme = cards[j].get('scheme')
                        text = mblog.get('text')
                        print "----第", str(i), "页，第", str(j), "条微博----" + "\n"
                        print "微博地址：", str(scheme), "\n", "发布时间：", str(created_at) + "\n", "微博内容：", text, "\n", "点赞数：", str(attitudes_count), "\n", "评论数：", str(comments_count), "\n", "转发数：", str(reposts_count), "\n"
            else:
                break
        except Exception as e:
            print(e)
            pass
        finally:
            i += 1


if __name__ == "__main__":
    get_userInfo(id)
    get_weibo(id)
